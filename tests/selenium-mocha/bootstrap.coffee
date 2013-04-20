webdriver = require "selenium-webdriver"

browsers = process.env.BROWSERS || 'phantomjs'

exports.test_runner = (describe_tests) -> 

    for browser_name in browsers.split(',') then do (browser_name) ->

        driver = new webdriver.Builder()
            .usingServer("http://127.0.0.1:8910/wd/hub")
            #.withCapabilities(browserName: browser_name)
            .build()

        describe "in browser #{browser_name}", ->
            describe_tests(driver)

        after ->
            driver.close()
            driver.quit()