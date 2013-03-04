define ['$', 'HelloModule', 'HelloTemplate', 'AppLayout'], ($, HelloModule, HelloTemplate, AppLayout) ->

  class App 
    constructor: ->
      hello = new HelloModule()
      content = HelloTemplate {greeting: hello.getAll()}
      $('#main').append(AppLayout {content: content})
