chai = require 'chai'
webdriver = require "selenium-webdriver"

bootstrap = require './bootstrap'

# shortcuts
should = chai.should()
By = webdriver.By

bootstrap.test_runner (driver) ->

    describe "demo page", ->
      # set mocha async test timeout to 60 sec
      @timeout 60000

      it "should contain header element", (done) ->

        driver.get "http://localhost:9002/"
        driver.findElement(By.tagName("h1")).then ->
          done()

        # driver.findElement(By.name("q")).sendKeys "webdriver"
        # driver.findElement(By.name("btnG")).click()

        # wait until results list appears
        # driver.wait ->
        #   driver.isElementPresent(By.css("div#ires")).then (isPresent) ->
        #     isPresent is true

        # driver.takeScreenshot().then (png) -> 
        #   decoded = new Buffer png, 'base64'
        #   fs.writeFile '/tmp/screen.png', decoded

        # result stats are present
        # driver.isElementPresent(By.id("resultStats")).then (isPresent) ->
        #   isPresent.should.equal true
        #   done()

      # it "in onet", (done) ->

      #   driver.get("http://www.onet.pl").then ->
      #     done()

      # it "in wp", (done) ->

      #   driver.get("http://www.wp.pl").then ->
      #     done()