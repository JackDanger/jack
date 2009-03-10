Johnson.require("johnson/browser");
Johnson.require("johnson/browser/jquery");

var Jack = {
  version: Ruby.Jack.VERSION,
  default_headers: {'Content-Type': 'text/html'},
  
  up: function(){
    return function(env) {
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
    }
  },
  
  not_found: function () {
    return [404, Jack.default_headers, "<h1>Not Found</h1>"];
  },

  application_error: function (e) {
    Jack.log.error(e.inspect());
    var html = ["<h1>Application Error: " + e.class() + "</h1>",
      "<p>" + e.message() + "</p>"].join("\n");
    return [500, Jack.default_headers, html];
  }
};

Jack.Action = (function() {
    var routes = [];
    var actionFactory = function(route, callback) {
        routes.push({
            route: route,
            action: callback
        });
    };

    actionFactory.route = function(env, params) {
        var callback = Jack.Utils.detect(routes, function(i, action) {
            return action.route.test(env['PATH_INFO']);
        });
        var result = !callback ?
                        Jack.not_found() :
                        callback.action.call({}, env, params)
        return (Array == result.constructor && 3 == result.length) ? result : [
            200,  Jack.default_headers , result
        ];
    }
    return actionFactory;
})();
