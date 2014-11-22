;(function() {

    requirejs.config({
        baseUrl: chrome.extension.getURL("/"),

        paths: {
            ContentApp: 'app/content/ContentApp',
            MessageProcessor: 'app/util/MessageProcessor',
            Log: 'app/util/Log',
            Element: 'app/content/Element',
            Page: 'app/content/Page',
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

require(['ContentApp', 'Log'], function(ContentApp, Log) {

    Log.on();
    Log.debug('ContentApp loaded');

    ContentApp.run();

});