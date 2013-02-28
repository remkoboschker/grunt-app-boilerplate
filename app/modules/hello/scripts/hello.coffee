define (require) ->

  class HelloModule
    constructor: (@name) ->
      @name = 'world' unless name?

    setName: (name) ->
      @name = name

    getName: ->
      @name