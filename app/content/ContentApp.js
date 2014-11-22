define('ContentApp', ['Page', 'Log'], function (Page, Log) {

  var ContentApp = {
    VERSION: '0.1',

    enabled: false,
    page: false,

    run: function () {
      Log.debug('version = ', this.VERSION);
    },

    startOnTab: function(msg) {
      var page = this.getPageOrCreate(msg.tab);
      page.enable();
    },

    stopOnTab: function(msg) {
      var page = this.getPageOrCreate(msg.tab);
      page.disable();
    },

    getPageOrCreate: function(tab) {
      if (this.page) return this.page;

      return this.page = new Page(tab.id, tab.url, tab.title);
    }
  };

  return ContentApp;
});
