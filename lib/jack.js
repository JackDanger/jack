Johnson.require("johnson/browser");
Johnson.require("johnson/browser/jquery");

var Jack = {
  version: Ruby.Jack.VERSION,
  default_headers: {'Content-Type': 'text/html'},
  
  up: function(){
    Ruby.Rack.Handler.Mongrel.run(
      function(env) {
          Ruby.Dir.glob("controllers/*.js").each(function(file) {
              eval(Ruby.File.read(file));
          });
        
          try {
              return Jack.Action.route(
                  env,
                  Jack.Utils.parameterize(env['QUERY_STRING'])
              );
          }
          catch(e) {
              return Jack.application_error(e);
          }
      },
      Jack.options || {}
    )
  },
  
  not_found: function () {
    return [404, Jack.default_headers, "<h1>Not Found</h1>"];
  },

  application_error: function (e) {
    var info = e.inspect ? e.inspect() : e.name + ": " + e.message
    Jack.log.error(info);
    var html = ["<h1>Application Error: " + info + "</h1>",
      "<p>" + e.toString() + "</p>"].join("\n");
    return [500, Jack.default_headers, html];
  }
};
