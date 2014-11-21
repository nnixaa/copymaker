;(function() {

    requirejs.config({
        baseUrl: chrome.extension.getURL("/"),

        paths: {
            App: 'app/App',
            Log: 'app/util/Log',
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

require(['App', 'Log', 'jquery'], function(App, Log, $) {

    Log.on();
    Log.debug('Page loaded');

    App.run();
});