(function() {
  var Module_Hello;

  Module_Hello = (function() {

    function Module_Hello(name) {
      this.name = name;
      if (name == null) {
        this.name = 'World';
      }
    }

    Module_Hello.prototype.setName = function(name) {
      return this.name = name;
    };

    Module_Hello.prototype.getName = function() {
      return this.name;
    };

    return Module_Hello;

  })();

  window['Module_Hello'] = Module_Hello;

}).call(this);
