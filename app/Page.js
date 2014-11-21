define('Page', function (require, jquery) {

    function Page (document, id, url, title) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.enabled = false;

        this.document = document;
        this.body = $(this.document).find('body').html();
    }
    //Page.prototype = {
    //
    //    getId: function() {
    //        return this.id;
    //    },
    //
    //    enable: function() {
    //        this.enabled = true;
    //        console.log('enable: ' + this.enabled);
    //        $(this.document).find('body').html('<h1>enabled</h1>');
    //    },
    //
    //    disable: function() {
    //        this.enabled = false;
    //        $(this.document).find('body').html(this.body);
    //    },
    //
    //    changeStatus: function() {
    //        console.log('changeStatus: ' + this.enabled);
    //
    //        if (this.enabled) {
    //            this.disable()
    //        } else{
    //            this.enable();
    //        }
    //    }
    //};
    return Page;
});
