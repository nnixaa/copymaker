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

    tabEnabled: {},

    start: function() {
        this.addOnClick();
    },

    addOnClick: function() {
        var self = this;

        chrome.browserAction.onClicked.addListener(function (tab) {
            self.enableDisableTab(tab);
        });
    },

    enableDisableTab: function(tab) {
        if (this.tabEnabled[tab.id]) {
            this.disableTab(tab)
        } else {
            this.enableTab(tab)
        }
    },

    enableTab: function(tab) {
        this.tabEnabled[tab.id] = true;
        MessageProcessor.sendToActiveTab('CM_TURN_ON', {tab: tab, method: 'startOnTab'});

        chrome.browserAction.setIcon({path: 'img/icon_a.png'});
    },

    disableTab: function(tab) {
        this.tabEnabled[tab.id] = false;
        MessageProcessor.sendToActiveTab('CM_TURN_OFF', {tab: tab, method: 'stopOnTab'});

        chrome.browserAction.setIcon({path: 'img/icon.png'});
    }
};

AppGlobal.start();