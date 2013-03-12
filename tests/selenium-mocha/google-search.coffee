chai = require 'chai'
webdriver = require "selenium-webdriver"
fs = require 'fs'

assert = chai.assert
expect = chai.expect
should = chai.should()

# shortcut
By = webdriver.By

browser_name = process.env.BROWSER_NAME || 'chrome'
driver = new webdriver.Builder()
  .usingServer("http://127.0.0.1:4444/wd/hub")
  .withCapabilities(browserName: browser_name)
  .build()

describe "in browser #{browser_name}", ->

  describe "goole search", ->
    # set mocha async test timeout to 20 sec
    @timeout 20000

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