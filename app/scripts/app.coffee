if (typeof this["app"] isnt "undefined") and (typeof this["app"]["templates"] isnt "undefined") and (typeof this["app"]["templates"]["index"] is "function")
	$('#main').append this["app"]["templates"]["index"] {name: 'World'}
else
	$.when($.get("/templates/index.hbs"))
		.then (tpl) -> 
			$('#main').append Handlebars.compile(tpl) {name: 'World'}