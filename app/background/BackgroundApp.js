define('BackgroundApp', ['MessageProcessor', 'Log'], function (MessageProcessor, Log) {

  var BackgroundApp = {
    VERSION: '0.1',

    enabled: false,
    page: false,

    tabEnabled: {},

    run: function() {
      Log.debug('BackgroundApp version = ', this.VERSION);

      this.addOnClick();
      this.addOnTabChange();
      this.addOnTabUpdated();
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

    addOnTabUpdated: function() {
      var self = this;

      chrome.tabs.onUpdated.addListener(function (tabId, activeInfo, tab) {
        self.disableTab(tab);
        self.changeIconToReal(tab.id);
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

  return BackgroundApp;
});
