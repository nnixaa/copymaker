define('Page', ['Element', 'jquery'], function (Element, jquery) {

    function Page (id, url, title) {
        this.id = id;
        this.url = url;
        this.title = title;

        this.body = $('body').html();
        this.current = null;
    }

    Page.prototype = {

        getId: function() {
            return this.id;
        },

        enable: function() {
            var self = this;

            $('body').on('click', '*', function() {
                // if something is edit mode - turn it off
                if (self.current) {
                    self.current.stopEditing();
                }
                // create element around html one
                var el = new Element(this);
                self.current = el;

                // start editing
                el.startEditing();

                $(this).blur(function() {
                    el.stopEditing();
                    return false;
                });
                return false;
            });
        },

        disable: function() {
            $('body').off('click', '*');
        },

        setCurrent: function(element) {
            this.current = element;
        }
    };
    return Page;
});
