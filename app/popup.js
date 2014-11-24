;(function() {

    requirejs.config({
        baseUrl: chrome.extension.getURL("/"),

        paths: {
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

require(['jquery'], function($) {

    $(function() {

        $('#start-stop').click(function() {

            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.extension.getBackgroundPage().BackgroundApp.enableDisableTab(tabs[0]);
                window.close();
            });
        });

        $('#export').click(function() {
            if (!$(this).hasClass('disabled')) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.extension.getBackgroundPage().BackgroundApp.askForExport(tabs[0]);
                    window.close();
                });
            }
        });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            if (chrome.extension.getBackgroundPage().BackgroundApp.isTabEnabled(tabs[0].id)) {
                $('#start-stop').text('Stop Editing');
                $('#start-stop').addClass('active');
            }

            var tab = chrome.extension.getBackgroundPage().BackgroundApp.getTab(tabs[0].id);
            if (tab && tab.count > 0) {
                $('#export').removeClass('disabled');
                $('#export').text('Export to CSV (' + tab.count + ')');
            } else {
                $('#export').addClass('disabled');
            }
        });
    });
});