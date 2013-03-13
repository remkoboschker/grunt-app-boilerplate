mocha.setup "bdd"
should = chai.should()

require.config

  paths: {
    'HelloModule': "app/modules/hello/scripts/hello"
    'HelloModuleTest': "build/spec/hello.test"
  }

  deps: ["HelloModuleTest"]

  callback: ->
    if window.mochaPhantomJS
      mochaPhantomJS.run()
    else
      mocha.run()