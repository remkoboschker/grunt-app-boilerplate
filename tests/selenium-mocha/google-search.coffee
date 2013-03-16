chai = require 'chai'
webdriver = require "selenium-webdriver"

bootstrap = require './bootstrap'

# shortcuts
should = chai.should()
By = webdriver.By

bootstrap.test_runner (driver) ->

    describe "google search", ->
      # set mocha async test timeout to 30 sec
      @timeout 30000

      it "should have results", (done) ->

        driver.get "http://www.google.com"
        driver.findElement(By.name("q")).sendKeys "webdriver"
        driver.findElement(By.name("btnG")).click()

        # wait until results list appears
        driver.wait ->
          driver.isElementPresent(By.css("div#ires")).then (isPresent) ->
            isPresent is true

        # driver.takeScreenshot().then (png) -> 
        #   decoded = new Buffer png, 'base64'
        #   fs.writeFile '/tmp/screen.png', decoded

        # result stats are present
        driver.isElementPresent(By.id("resultStats")).then (isPresent) ->
          isPresent.should.equal true

        driver.quit().addBoth ->
          done()