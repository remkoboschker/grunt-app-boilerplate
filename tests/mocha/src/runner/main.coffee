mocha.setup "bdd"

require.config
  paths: {
    'chai': 'app/vendor/chai/chai'
  }

  deps: ["chai", "build/spec/hello"]

  callback: (chai)->
    window.expect = chai.expect

    if window.mochaPhantomJS
      mochaPhantomJS.run()
    else
      mocha.run()