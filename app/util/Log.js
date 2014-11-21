define('Log', function (require, jquery, _) {

    return {
        status: false,
        history: [],

        on: function() {
            this.status = true;
        },

        off: function() {
            this.status = false;
        },

        debug: function(message) {
            if (this.status) {
                this.history.push(arguments);
                if(this.status){
                    var arguments = Array.prototype.slice.call(arguments);
                    arguments.unshift('--CM: ');
                    console.debug.apply(console, arguments);
                }
            }
        }
    }
});
