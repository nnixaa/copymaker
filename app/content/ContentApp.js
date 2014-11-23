define('ContentApp', ['Page', 'MessageProcessor','Log'], function (Page, MessageProcessor, Log) {

  var ContentApp = {
    VERSION: '0.1',

    enabled: false,
    page: false,

    messageProcessor: false,

    run: function () {
      Log.debug('version = ', this.VERSION);

      this.messageProcessor = new MessageProcessor(this);
    },

    startOnTab: function(msg) {
      var page = this.getPageOrCreate(msg.tab);
      page.enable();
    },

    stopOnTab: function(msg) {
      var page = this.getPageOrCreate(msg.tab);
      page.disable();
    },

    askForExport: function(msg) {
      var page = this.getPageOrCreate(msg.tab);
      page.askForExport();
    },

    getPageOrCreate: function(tab) {
      if (this.page) return this.page;

      return this.page = new Page(tab.id, tab.url, document.title);
    }
  };

  return ContentApp;
});
