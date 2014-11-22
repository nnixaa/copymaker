define('Page', ['Element', 'MessageProcessor','Log', 'jquery', 'underscore'], function (Element, MessageProcessor, Log, $, _) {

    function Page (id, url, title) {
        this.id = id;
        this.url = url;
        this.title = title;

        this.body = $('body').html();
        this.current = null;
        this.elements = [];

        this.messageProcessor = new MessageProcessor();
    }

    Page.prototype = {

        getId: function() {
            return this.id;
        },

        collectElement: function(el) {
            this.elements[el.id] = el;

            this.messageProcessor.sendToRuntime('CM_UPDATE_BADGE', {
                count: this.countCollectedElements(),
                method: 'updateTabBadge',
                tabId: this.getId()
            });
        },

        countCollectedElements: function() {
            return Object.keys(this.elements).length;
        },

        hasElements: function() {
            return this.countCollectedElements()
        },

        enable: function() {
            var self = this;

            self.addOnClick();
            self.addKeyEvent();
            self.addBeforeUnload();
        },

        addBeforeUnload: function() {
            var self = this;

            $(window).bind('beforeunload', function() {
                if (self.hasElements()) {
                    return 'You are in Editing Mode currently, edited ' + self.countCollectedElements() + ' phrase(s)';
                }
            });
        },

        addKeyEvent: function() {
            var self = this;

            $(document).keydown(function(e) {
                if (self.getCurrent()) {
                    if (e.keyCode == 13) {
                        self.stopCurrent();
                        return false;
                    }
                    if (e.keyCode == 27) {
                        self.current.revertHtml();
                        self.stopCurrent();
                        return false;
                    }
                }
            });
        },

        addOnClick: function() {
            var self = this;

            $('body').on('click', '*', function() {

                var el = new Element(this);

                if(self.sameAsCurrent(el)) {
                    el.focus();
                    return false;
                }

                if (!self.getCurrent() && el.isEditable()) {

                    self.startCurrent(el);

                    $(this).blur(function() {

                        self.stopCurrent();
                        $(this).unbind('blur');
                    });
                }
                return false;
            });
        },

        disable: function() {
            $('body').off('click', '*');
            $(window).unbind('beforeunload');

            this.askForDownload();
        },

        setCurrent: function(element) {
            this.current = element;
        },

        getCurrent: function() {
            return this.current;
        },

        stopCurrent: function() {

            if (!this.getCurrent()) return false;

            this.getCurrent().stopEditing();

            if (this.getCurrent().hasChangedHtml()) {
                this.collectElement(this.getCurrent());
            }
            this.setCurrent(null);
        },

        startCurrent: function(el) {
            this.setCurrent(el);
            this.getCurrent().startEditing();
            this.getCurrent().focus();
        },

        sameAsCurrent: function(el) {
            return (this.getCurrent() && this.getCurrent().getId() == el.getId());
        },

        askForDownload: function() {
            if (this.countCollectedElements() > 0) {
                var encodedUri = encodeURI(this.collectedToCSV());
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "copymaker.csv");

                link.click();
            }
        },

        collectedToCSV: function() {

            var data = [];
            for (var i in this.elements) {
                var el = this.elements[i];
                var pair = [el.initialHTML, el.currentHTML];

                data.push(pair);
            }
            var csvContent = "data:text/csv;charset=utf-8,";
            data.forEach(function(infoArray, index){

                var dataString = infoArray.join(",");
                csvContent += index < infoArray.length ? dataString+ "\n" : dataString;

            });
            return csvContent;
        }
    };
    return Page;
});
