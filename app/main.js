;(function() {

    requirejs.config({
        baseUrl: chrome.extension.getURL("/"),

        paths: {
            App: 'app/App',
            MessageProcessor: 'app/MessageProcessor',
            Log: 'app/util/Log',
            Element: 'app/Element',
            Page: 'app/Page',
            jquery: 'lib/vendor/jquery/jquery',
            underscore: 'lib/vendor/lodash/dist/lodash'
        },
        shim: {
            underscore: {
                exports: '_'
            }
        }
    });
})();

require(['App', 'Log', 'MessageProcessor', 'jquery'], function(App, Log, MessageProcessor, $) {

    Log.on();
    Log.debug('Page loaded');

    App.run();

    MessageProcessor.create(App);

});