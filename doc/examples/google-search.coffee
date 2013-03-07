webdriver = require("selenium-node-webdriver")

webdriver(
  capabilities:
    browserName: "firefox"
    version: ""
    platform: "ANY"
    javascriptEnabled: true
)
.then (driver) ->
  driver.manage().timeouts().setScriptTimeout 5000
  
  # wait for results to appear with exponential backoff
  # give up when next delay would be 2s
  driver.get("http://www.google.com")
  .then(->
    driver.findElement(driver.webdriver.By.name("q")).sendKeys "webdriver"
  )
  .then(->
    driver.findElement(driver.webdriver.By.name("btnG")).click()
  )
  .then(->
    driver.executeAsyncScript (callback) ->
      getResults = ->
        results = document.querySelectorAll("h3.r")

        if results.length > 0
          callback(
            Array::slice.call(results).map((result) ->
              result.textContent
            )
          )

        else if delay < 2000
          delay *= 2
          setTimeout getResults, delay

      delay = 10
      getResults()

  )
  .then (results) ->
    results.forEach (result) ->
      console.log result

    driver.quit()

