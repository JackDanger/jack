

var Jack = {

  up: function(js_app_files, options) {

    // a Jack app is really just a ruby Proc/lambda
    var app = Ruby.Proc.new(function(env) {

      // set up a local Jack object because Jack.run() is used by app code
      // and we need the env both defined and called in the same closure
      var Jack = {run : function(app){ return ('function' == typeof(app)) ? app(env) : app.call(env) } }

      // build a string of app code
      var js_app_code = js_app_files.map(function(file) {
        return Ruby.File.read(Ruby.File.expand_path(file));
      }).join(";\n");
      // shoot the whole string through eval() to run the app
      return eval(js_app_code);
    });

    Ruby.puts("Running " + js_app_files.join(", "));
    Ruby.Rack.Handler.Mongrel.run(app, options);
  }
}
