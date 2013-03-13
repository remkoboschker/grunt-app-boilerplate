require ["app/vendor/chai/chai"], (chai) ->
  
  # This will be overridden by mocha-helper if you run with grunt
  mocha.setup "bdd"
  
  # Setup chai
  window.assert = chai.assert
  window.expect = chai.expect
  #window.should = chai.should

  require ["build/spec/hello"], ->
    
    if window.mochaPhantomJS
      mochaPhantomJS.run()
    else
      mocha.run()


