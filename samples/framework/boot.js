Johnson.require('johnson/template');

Jack.Controller = function() {
  this.render = function(file) {
    file = Ruby.File.join(this.__baseDir__, file);
    return Johnson.templatize(Ruby.File.read(file)).call(this);
  };

  this.__baseDir__ = Ruby.File.join(Jack.BASE, 'test_apps', 'framework', 'views');
};

Jack.camelize = function(string) {
  var parts = string.split("_");
  return parts.map(function(part) {
    return part.substr(0,1).toUpperCase() + part.substr(1, part.length);
  }).join("");
};

Jack.parameterize = function(string) {
  var params = {};

  if(null == string) return params;
  var parameters = string.split("&");
  for(var i = 0; i < parameters.length; i++) {
    var bits = parameters[i].split("=");
    params[bits[0]] = bits[1];
  }
  return params;
};

Jack.run(function(env){
  var parts = env['PATH_INFO'].split("/");

  // Load our controller
  var controllerFile = Ruby.File.join(Jack.BASE, 'test_apps', 'framework', 'controllers', parts[1] + "_controller.js");
  eval(Ruby.File.read(controllerFile));

  // Instantiate the controller
  var controller = new (eval(Jack.camelize(parts[1]) + "Controller"))();

  var action = "index";
  if(parts[2] != null && parts[2].length > 0) action = parts[2];

  var html = controller[action](Jack.parameterize(env['QUERY_STRING']));

  return [200, {'Content-Type': 'text/html'}, html];
});
