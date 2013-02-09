(function() {

  $.when($.get("/templates/index.hbs")).then(function(tpl) {
    return $('#main').append(Handlebars.compile(tpl)({
      name: 'World'
    }));
  });

}).call(this);
