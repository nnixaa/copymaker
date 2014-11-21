define('Page', function (require, jquery) {

    function Page (id, url, title) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.enabled = false;

        this.editableTags = 'p,h1,h2,h3,h4,h5,strong,span,i,li,a,button,td,th';
        this.editableBorder = '1px dashed #8e0000';
        this.editableOutline = 'none';
        this.editableShadow = '1px 1px 3px #b50707';

        this.body = $('body').html();
    }
    Page.prototype = {

        getId: function() {
            return this.id;
        },

        enable: function() {
            var self = this;

            $('body').on('click', self.editableTags, function() {

                var that = this;
                setTimeout(function() {
                    $(that).focus();
                }, 0);

                var border = $(that).css('border');
                var shadow = $(that).css('box-shadow');
                var outline = $(that).css('outline');

                $(that).css('border', self.editableBorder);
                $(that).css('outline', self.editableOutline);
                $(that).css('box-shadow', self.editableShadow);
                $(that).prop('contenteditable', 'true');

                $(that).blur(function() {

                    $(that).css('border', border);
                    $(that).css('outline', outline);
                    $(that).css('box-shadow', shadow);
                    $(that).prop('contenteditable', 'false');

                    return false;
                });
                return false;
            });
        },

        disable: function() {
            $('body').off('click', this.editableTags);
        }
    };
    return Page;
});
