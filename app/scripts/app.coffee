$.when($.get("/templates/index.hbs"))
	.then (tpl) -> 
		$('#main').append Handlebars.compile(tpl)({name: 'World'})