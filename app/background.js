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
        this.addOnTabChange();
    },

    addOnClick: function() {
        var self = this;

        chrome.browserAction.onClicked.addListener(function (tab) {
            self.enableDisableTab(tab);
        });
    },

    addOnTabChange: function() {
        var self = this;

        chrome.tabs.onActivated.addListener(function (activeInfo) {
            self.changeIconToReal(activeInfo.tabId);
        });
    },

    changeIconToReal: function(tabId) {
        if (this.isTabEnabled(tabId)) {
            chrome.browserAction.setIcon({path: 'img/icon_a.png'});
        } else {
            chrome.browserAction.setIcon({path: 'img/icon.png'});
        }
    },

    isTabEnabled: function(tabId) {
        return this.tabEnabled[tabId];
    },

    enableDisableTab: function(tab) {
        if (this.isTabEnabled(tab.id)) {
            this.disableTab(tab)
        } else {
            this.enableTab(tab)
        }
        this.changeIconToReal(tab.id);
    },

    enableTab: function(tab) {
        this.tabEnabled[tab.id] = true;
        MessageProcessor.sendToActiveTab('CM_TURN_ON', {tab: tab, method: 'startOnTab'});
    },

    disableTab: function(tab) {
        this.tabEnabled[tab.id] = false;
        MessageProcessor.sendToActiveTab('CM_TURN_OFF', {tab: tab, method: 'stopOnTab'});
    }
};

AppGlobal.start();