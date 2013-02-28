
define(function(require) {
  var HelloModule;
  return HelloModule = (function() {

    function HelloModule(name) {
      this.name = name;
      if (name == null) {
        this.name = 'world';
      }
    }

    HelloModule.prototype.setName = function(name) {
      return this.name = name;
    };

    HelloModule.prototype.getName = function() {
      return this.name;
    };

    return HelloModule;

  })();
});
