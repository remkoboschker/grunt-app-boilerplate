define ['$', 'HelloModule', 'HelloTemplate', 'AppLayout'], ($, HelloModule, HelloTemplate, AppLayout) ->

  class App 
    constructor: ->
      hello = new HelloModule('Worrrld')
      content = HelloTemplate {name: hello.getName()}
      $('#main').append(AppLayout {content: content})
