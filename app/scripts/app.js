(function() {

  if ((typeof this["app"] !== "undefined") && (typeof this["app"]["templates"] !== "undefined") && (typeof this["app"]["templates"]["index"] === "function")) {
    $('#main').append(this["app"]["templates"]["index"]({
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
