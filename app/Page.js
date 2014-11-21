define('Page', function (require, jquery) {

    function Page (id, url, title) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.enabled = false;

        this.body = $('body').html();
    }
    Page.prototype = {

        getId: function() {
            return this.id;
        },

        enable: function() {
            $('body').html('<h1>enabled</h1>');
        },

        disable: function() {
            $('body').html(this.body);
        }
    };
    return Page;
});
