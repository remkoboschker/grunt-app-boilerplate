define (require) ->

  ###
  This is sample "Hello" moduke
  ###
  class HelloModule

    ###
    This is sample module constructor
    ###
    constructor: ->
        @name = 'Grunt app boilerplate'
        @email = 'bahdanovich[at]gmail[dot]com'
        @homepage = 'https://github.com/abahdanovich/grunt-app-boilerplate'

    ###
    This method returns all properties
    ###
    getAll: ->
        { name: @name, email: @email, homepage: @homepage }

    ###
    Set the name

    @param name [string] Name
    ###
    setName: (name) ->
      @name = name

    ###
    Set the email

    @param email [string] E-mail address
    ###
    setEmail: (email) ->
        @email = email

    ###
    Set the homepage

    @param homepage [string] Homepage
    ###
    setHomepage: (homepage) ->
        @homepage = homepage

    ###
    Get the name

    @return [string] Name
    ###
    getName: ->
        @name

    ###
    Get the email

    @return [string] E-mail address
    ###
    getEmail: ->
        @email

    ###
    Get the homepage

    @return [string] Homepage
    ###
    getHomepage: ->
        @homepage
