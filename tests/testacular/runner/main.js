var tests = Object.keys(window.__testacular__.files).filter(function (file) {
  return /\.test\./.test(file);
});

require.config({
  // Testacular serves files under /base, which is the basePath from your config file
  baseUrl: '/',

  // dynamically load all test files
  deps: tests,

  // we have to kick of jasmine, as it is asynchronous
  callback: window.__testacular__.start
});
