if typeof this["JST"]["app/templates/index.hbs"] is "function"
	$('#main').append this["JST"]["app/templates/index.hbs"]({name: 'World'})
else
	$.when($.get("/templates/index.hbs"))
		.then (tpl) -> 
			$('#main').append Handlebars.compile(tpl)({name: 'World'})