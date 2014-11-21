define('App', ['Page', 'Log'], function (Page, Log) {

  var App = {
    VERSION: '0.1',

    enabled: false,

    run: function () {
      Log.debug('version = ', this.VERSION);
    },

    startOnTab: function() {
      Log.debug('start yeah!');
    },

    stopOnTab: function() {
      Log.debug('stop yeah!');
    }
  };

  return App;
});
