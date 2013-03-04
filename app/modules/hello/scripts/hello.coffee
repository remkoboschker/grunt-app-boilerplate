define (require) ->

  class HelloModule

    constructor: ->
        @name = 'Grunt app boilerplate'
        @email = 'bahdanovich[at]gmail[dot]com'
        @homepage = 'https://github.com/abahdanovich/grunt-app-boilerplate'

    getAll: ->
        { name: @name, email: @email, homepage: @homepage }

    setName: (name) ->
      @name = name

    setEmail: (email) ->
        @email = email

    setHomepage: (homepage) ->
        @homepage = homepage

    getName: ->
        @name

    getEmail: ->
        @email

    getHomepage: ->
        @homepage
