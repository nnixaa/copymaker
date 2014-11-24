define('Element', ['Log', 'jquery'], function (Log, $) {

    function Element (el) {
        this.el = el;
        this.id = null;

        // saves initial styles
        this.border = $(this.el).css('border');
        this.shadow = $(this.el).css('box-shadow');
        this.outline = $(this.el).css('outline');

        this.initialText = this.currentText = this.previousText = this.getText();

        this.editableBorder = '1px dashed #8e0000';
        this.editableOutline = 'none';
        this.editableShadow = '1px 1px 3px #b50707';

        $(this.el).data('cm-editable', false);

        if ($(this.el).data('cm-element-id')) {
            // existing element
            this.id = $(this.el).data('cm-element-id');
        } else {
            this.id = Math.random().toString(36).slice(2);
        }

        $(this.el).data('cm-element-id', this.id);
        Log.d($(this.el).data('cm-element-id'));
    }

    Element.prototype = {

        isTheSame: function(el) {
            return $(el).data('cm-element-id') == this.getId();
        },

        isEditable: function() {
            return $(this.el).text().length > 0;
        },

        startEditing: function() {
            this.previousText = this.getText();

            $(this.el).data('cm-editable', true);
            this.makeEditStyle();
            this.focus();
        },

        stopEditing: function() {
            this.currentText = this.getText();

            $(this.el).data('cm-editable', false);
            this.revertStyle();
        },

        isInEdit: function() {
            return $(this.el).data('cm-editable') == true;
        },

        makeEditStyle: function() {

            $(this.el).css('border', this.editableBorder);
            $(this.el).css('outline', this.editableOutline);
            $(this.el).css('box-shadow', this.editableShadow);
            $(this.el).prop('contenteditable', 'true');
        },

        revertStyle: function() {

            $(this.el).css('border', this.border);
            $(this.el).css('outline', this.outline);
            $(this.el).css('box-shadow', this.shadow);
            $(this.el).prop('contenteditable', 'false');
        },

        focus: function() {
            var self = this;
            setTimeout(function() {
                $(self.el).focus();
            }, 0);
        },

        getId: function() {
            return this.id;
        },

        revertHtml: function() {
            $(this.el).text(this.previousText);
        },

        hasChangedHtml: function() {
           return this.currentText != this.previousText;
        },

        getText: function() {
            return $(this.el)
                .clone()    //clone the element
                .children() //select all the children
                .remove()   //remove all the children
                .end()  //again go back to selected element
                .text();
        }
    };
    return Element;
});
