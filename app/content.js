;(function() {

    requirejs.config({
        baseUrl: chrome.extension.getURL("/"),

        paths: {
            jquery: 'lib/vendor/jquery/jquery',
            papaparse: 'lib/papaparse/papaparse',
            underscore: 'lib/vendor/lodash/dist/lodash',
            ContentApp: 'app/content/ContentApp',
            MessageProcessor: 'app/util/MessageProcessor',
            Log: 'app/util/Log',
            Element: 'app/content/Element',
            Page: 'app/content/Page'
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