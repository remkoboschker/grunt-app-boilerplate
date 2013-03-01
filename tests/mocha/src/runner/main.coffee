require ["../../app/vendor/chai/chai"], (chai) ->
  
  # This will be overridden by mocha-helper if you run with grunt
  mocha.setup "bdd"
  
  # Setup chai
  window.assert = chai.assert
  window.should = chai.should
  window.expect = chai.expect

  require ["../spec/hello"], ->
    
    if window.mochaPhantomJS
      mochaPhantomJS.run()
    else
      mocha.run()


