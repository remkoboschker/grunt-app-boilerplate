define ['$', 'HelloModule', 'HelloTemplate', 'AppLayout'], ($, HelloModule, HelloTemplate, AppLayout) ->

  class App 
    constructor: ->
      hello = new HelloModule()
      content = HelloTemplate {name: hello.getName()}
      $('#main').append(AppLayout {content: content})
