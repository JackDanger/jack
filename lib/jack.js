

var Jack = {
  run : function(app){
    return ('function' == typeof(app)) ? app(Jack.env) : app.call(Jack.env)
  },

  up: function(js_app_files, options) {
    var app = Ruby.Proc.new(function(env) {
      Jack.env = env;
      var js_app_code = js_app_files.map(function(file) {
        return Ruby.File.read(Ruby.File.join(Jack.BASE, file));
      }).join(";\n");
      var x = eval(js_app_code);

      // Hack.  Splat doesn't work on JS arrays
      var rb_ary = Ruby.Array.new();
      for(var i = 0; i < x.length; i++) {
        rb_ary[i] = x[i];
      }
      return rb_ary;
    });
    Ruby.puts("Running " + js_app_files.join(", "));
    Ruby.Rack.Handler.Mongrel.run(app, options);
  }
}
