casper_options = {
  logLevel: "info"  
}

casper = require('casper').create casper_options

casper.start "http://localhost:9002/", (response) ->
  page_title = @evaluate ->
    document.title

  @echo 'Page URL is: ' + response.url
  @echo 'Page title is: ' + page_title

casper.then ->  
  @test.assertExists 'h1'

  h1 = @evaluate ->
    document.querySelector 'h1'

  @echo h1.innerHTML

casper.run()