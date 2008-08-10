

var Jack = {
  run : function(app){
    return ('function' == typeof(app)) ? app(Jack.env) : app.call(Jack.env)
  },

  up: function(js_app_files, options) {
    var app = Ruby.Proc.new(function(env) {
      Jack.env = env;
      var js_app_code = js_app_files.map(function(file) {
        return Ruby.File.read(Ruby.File.expand_path(file));
      }).join(";\n");
      return eval(js_app_code);
    });
    Ruby.puts("Running " + js_app_files.join(", "));
    Ruby.Rack.Handler.Mongrel.run(app, options);
  }
}
