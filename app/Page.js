define('Page', ['Element', 'Log', 'jquery', 'underscore'], function (Element, Log, jquery, _) {

    function Page (id, url, title) {
        this.id = id;
        this.url = url;
        this.title = title;

        this.body = $('body').html();
        this.current = null;
        this.elements = [];
    }

    Page.prototype = {

        getId: function() {
            return this.id;
        },

        collectElement: function(el) {
            this.elements[el.id] = el;
        },

        hasElements: function() {
            return Object.keys(this.elements).length;
        },

        enable: function() {
            var self = this;

            $('body').on('click', '*', function() {
                // create element around html one
                var el = new Element(this);

                // double click in the same element
                if(self.current && el.getId() == self.current.getId()) {
                    el.focus();
                    return false;
                }

                // if something is edit mode - turn it off
                if (self.current) {
                    self.current.stopEditing();
                    self.current = null;
                } else {

                    if (el.isEditable()) {

                        self.current = el;
                        el.startEditing();
                        el.focus();
                        $(this).blur(function() {
                            Log.debug('case four');
                            el.stopEditing();
                            if (el.hasChangedHtml()) {
                                self.collectElement(el);
                            }
                            self.current = null;
                            return false;
                        });
                    }
                }
                return false;
            });
            $(document).keydown(function(e) {
                if (self.current) {
                    if (e.keyCode == 13) {
                        self.current.stopEditing();
                        self.current = null;
                        return false;
                    }
                    if (e.keyCode == 27) {
                        if (self.current) {
                            self.current.revertHtml();
                            self.current.stopEditing();
                            self.current = null;
                            return false;
                        }
                    }
                }
            });
            $(window).bind('beforeunload', function(){
                if (self.hasElements()) {
                    return 'You are in Editing Mode currently.';
                }
            });
        },

        disable: function() {
            $('body').off('click', '*');
            $(window).unbind('beforeunload');
        },

        setCurrent: function(element) {
            this.current = element;
        }
    };
    return Page;
});
