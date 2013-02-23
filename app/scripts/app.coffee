render = (template_name, data) ->
    if (typeof window["app"] isnt "undefined") and (typeof window["app"]["templates"] isnt "undefined") and (typeof window["app"]["templates"][template_name] is "function")
        window["app"]["templates"][template_name] data
    else
        throw new Error "Template not found: " + template_name

module_hello = new window['Module_Hello']()
content = render 'modules/hello', {name: module_hello.getName()}

$ ->
	$('#main').append(render 'layout', {content: content})