render = (template_name, data) ->
    if (typeof window["app"] isnt "undefined") and (typeof window["app"]["templates"] isnt "undefined") and (typeof window["app"]["templates"][template_name] is "function")
        $('#main').append window["app"]["templates"][template_name] data
    else
        throw new Error "Template not found: " + template_name

$ ->
	render 'index', {name: 'World'}