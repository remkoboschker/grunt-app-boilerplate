mocha.setup("bdd");
var should = chai.should();

var tests = Object.keys(window.__testacular__.files).filter(function (file) {
  return /\.test\./.test(file);
});

require.config({
  baseUrl: '/base',

  paths: {
    'HelloModule': "app/modules/hello/scripts/hello"
  },

  deps: tests,
  callback: window.__testacular__.start
});
