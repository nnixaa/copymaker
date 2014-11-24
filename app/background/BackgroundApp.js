define('BackgroundApp', ['MessageProcessor', 'Log'], function (MessageProcessor, Log) {

  var BackgroundApp = {
    VERSION: '0.1',

    enabled: false,
    page: false,

    messageProcessor: false,

    tabs: {},

    run: function() {
      Log.debug('BackgroundApp version = ', this.VERSION);

      this.messageProcessor = new MessageProcessor(this);

      this.addOnTabChange();
      this.addOnTabUpdated();
    },

    addOnTabChange: function() {
      var self = this;
      // TODO: duplicate!!
      chrome.tabs.onActivated.addListener(function (activeInfo) {
        self.changeIconToReal(activeInfo.tabId);

        var tab = self.getTab(activeInfo.tabId);
        if (tab) {
          self.changeTabBadgeNumber(tab.count);
        } else {
          self.changeTabBadgeNumber("");
        }
      });

      chrome.windows.onFocusChanged.addListener(function () {

        chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
          Log.d('onFocusChanged called');

          self.changeIconToReal(tab.id);

          var tab = self.getTab(tab.tabId);
          if (tab) {
            self.changeTabBadgeNumber(tab.count);
          } else {
            self.changeTabBadgeNumber("");
          }
        });
      });
    },

    addOnTabUpdated: function() {
      var self = this;

      chrome.tabs.onUpdated.addListener(function (tabId, activeInfo, tab) {

        if (activeInfo.status == 'complete' &&  tab.active == true && typeof activeInfo.url == 'undefined' && typeof tab.openerTabId == 'undefined') {
          Log.d('onUpdated called', activeInfo, tab);

          self.disableTab(tab);
          self.changeIconToReal(tab.id);
          self.getTab(tab.id).count = 0;
          self.changeTabBadgeNumber("");
        }
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
      if (this.tabs[tabId]) {
        return this.tabs[tabId].enable;
      }

      return false;
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
      this.getTabOrAdd(tab, true);
      this.messageProcessor.sendToActiveTab('CM_TURN_ON', {tab: tab, method: 'startOnTab'});
    },

    disableTab: function(tab) {
      this.getTabOrAdd(tab, false);

      this.messageProcessor.sendToActiveTab('CM_TURN_OFF', {tab: tab, method: 'stopOnTab'});
    },

    askForExport: function(tab) {
      this.messageProcessor.sendToActiveTab('CM_EXPORT', {tab: tab, method: 'askForExport'});
    },

    getTabOrAdd: function(tab, enable) {

      if (!this.getTab(tab.id)) {
        this.tabs[tab.id] = {
          count: 0,
          tab: tab
        };
      }
      this.tabs[tab.id].enable = enable;

      return this.getTab(tab.id);
    },

    getTab: function(id) {
      return this.tabs[id];
    },

    updateTabBadge: function(msg) {
      this.getTab(msg.tabId).count = msg.count;
      this.changeTabBadgeNumber(msg.count);
    },

    changeTabBadgeNumber: function(count) {
      count = count == 0 ? "" : count;
      chrome.browserAction.setBadgeText({text: count + ""});
    }

  };

  return BackgroundApp;
});
