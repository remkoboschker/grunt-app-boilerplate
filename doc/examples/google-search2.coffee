fs = require("fs")
webdriver = require("selenium-webdriver")
remote = require("selenium-webdriver/remote")

driver = new webdriver.Builder()
    .usingServer("http://127.0.0.1:4444/wd/hub")
    .withCapabilities(browserName: "chrome")
    .build()

driver.get "http://www.google.com"
driver.findElement(webdriver.By.name("q")).sendKeys "webdriver"
driver.findElement(webdriver.By.name("btnG")).click()

driver.wait (->
  driver.getTitle().then (title) ->
    "webdriver - Szukaj w Google" is title
), 10000

driver.quit().addBoth ->  
  # Don't shutdown the server until all actions are complete.
  #server.stop();
  console.log "DONE"
