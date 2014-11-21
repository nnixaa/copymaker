var MessageProcessor = {

    sendToActiveTab: function(action, data, next) {
        data = data || {};
        data.action = action;

        next = next || function() {};

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, data, next);
        });
    }
};

var AppGlobal = {

    start: function() {
        this.addOnClick();
    },

    addOnClick: function() {
        chrome.browserAction.onClicked.addListener(function (tab) {
            chrome.browserAction.setIcon({path: 'img/icon_a.png'});
            MessageProcessor.sendToActiveTab('CM_TURN_ON', {tab: tab, method: 'startOnTab'});
        });
    }
};

AppGlobal.start();