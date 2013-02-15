(function() {

  if (typeof this["JST"]["app/templates/index.hbs"] === "function") {
    $('#main').append(this["JST"]["app/templates/index.hbs"]({
      name: 'World'
    }));
  } else {
    $.when($.get("/templates/index.hbs")).then(function(tpl) {
      return $('#main').append(Handlebars.compile(tpl)({
        name: 'World'
      }));
    });
  }

}).call(this);
