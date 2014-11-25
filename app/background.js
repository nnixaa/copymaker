;(function() {

    requirejs.config({
        baseUrl: chrome.extension.getURL("/"),

        paths: {
            BackgroundApp: 'app/background/BackgroundApp',
            MessageProcessor: 'app/util/MessageProcessor',
            Log: 'app/util/Log',
            jquery: 'lib/vendor/jquery/jquery',
            underscore: 'lib/vendor/lodash/dist/lodash'
        },
        shim: {
            underscore: {
                exports: '_'
            }
        }
    });

    require(['BackgroundApp', 'Log'], function(BackgroundApp, Log) {

        Log.on();
        Log.debug('BackgroundApp loaded');

        BackgroundApp.run();
        window.BackgroundApp = BackgroundApp;
    });
})();