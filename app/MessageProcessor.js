define('MessageProcessor', ['Log'], function (Log) {

    var MessageProcessor = {

        app: null,

        create: function(app) {
            this.app = app;

            this.listen();
        },

        listen: function () {
            var self = this;
            chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
                Log.debug('Got a message: ', msg);
                self.process(msg, sender);
            });
        },

        sendToActiveTab: function(action, data, next) {
            data = data || {};
            data.action = action;

            next = next || function() {};

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, data, next);
            });
        },

        process: function(msg, sender) {
            var method = msg.method;
            if (typeof method == 'undefined' || method == null) {
                throw Error('MessageProcessor: msg should contain a "method" action of App object');
            }

            if (typeof this.app[method] == 'undefined' || this.app[method] == null) {
                throw Error('MessageProcessor: App object does not have a "' + method + '" method');
            }
            Log.debug('Calling a method: "', method, '"');
            this.app[method].call(this.app, msg);
        }
    };

    return MessageProcessor;
});