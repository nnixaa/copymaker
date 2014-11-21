define('App', ['Page', 'Log'], function (Page, Log) {

  var App = {
    VERSION: '0.1',

    enabled: false,

    run: function () {
      Log.debug('version = ', this.VERSION);
    }
  };

  return App;
});
