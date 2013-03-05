define ['$', 'HelloModule', 'HelloTemplate', 'AppLayout'], ($, HelloModule, HelloTemplate, AppLayout) ->

  ###
  Application class
  ###
  class App 

    ###
    This is application constructor
    ###
    constructor: ->
      hello = new HelloModule()
      content = HelloTemplate {greeting: hello.getAll()}
      $('#main').append(AppLayout {content: content})
