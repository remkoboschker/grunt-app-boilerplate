casper_options = {
  logLevel: "info"  
}

casper = require('casper').create casper_options
utils = require('utils')
system = require('system')

connect_hostname = system.env.CONNECT_HOSTNAME or "localhost"
start_url = "http://"+connect_hostname+":9002/"

casper.start start_url, (response) ->

  unless response? 
    @warn "No response, check if server is running on " + start_url

  @test.assert response?, "Response is non-empty"

  page_title = @evaluate ->
    document.title

  @echo 'Page URL is: ' + @getCurrentUrl()
  @echo 'Page title is: ' + page_title

casper.then ->  
  @test.assertExists 'h1'

  h1 = @evaluate ->
    document.querySelector 'h1'

  if h1? and !!h1
    @echo h1.innerHTML

casper.run()