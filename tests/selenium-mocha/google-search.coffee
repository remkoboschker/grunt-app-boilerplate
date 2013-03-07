assert = require("assert")
fs = require("fs")
webdriver = require("selenium-webdriver")
remote = require("selenium-webdriver/remote")

browser_name = process.env.BROWSER_NAME || 'chrome'
driver = new webdriver.Builder()
  .usingServer("http://127.0.0.1:4444/wd/hub")
  .withCapabilities(browserName: browser_name)
  .build()

describe "in browser #{browser_name}", ->

  describe "goole search", ->
    @timeout 60000

    it "should have results", (done) ->

      driver.get "http://www.google.com"
      driver.findElement(webdriver.By.name("q")).sendKeys "webdriver"
      driver.findElement(webdriver.By.name("btnG")).click()

      driver.wait (->
        driver.getTitle().then (title) ->
          "webdriver - Szukaj w Google" is title
      ), 10000

      driver.quit().addBoth ->
        done()