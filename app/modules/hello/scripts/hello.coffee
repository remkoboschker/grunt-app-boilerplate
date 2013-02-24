class Module_Hello
	constructor: (@name) ->
		@name = 'world' unless name?

	setName: (name) ->
		@name = name

	getName: ->
		@name

window['Module_Hello'] = Module_Hello