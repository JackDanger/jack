var Jack = {
  version: Ruby.Jack.VERSION,
  log: Ruby.Jack.log,

  default_headers: {'Content-Type': 'text/html'},
  routes: [],

  up: function () {
    return function (env) {
      try {
        // This is a horrible for loop. Can has Enumerable#detect plz?
        for(var i = 0; i < Jack.routes.length; i++) {
          if(Jack.routes[i][0].exec(env['PATH_INFO'])) {
            return [200, Jack.default_headers, Jack.routes[i][1].call(env)];
          }
        };

        return [404, Jack.default_headers, Jack.not_found()];
      }
      catch(e) {
        Jack.log.error(e.name + ': ' + e.message);
        return [500, Jack.default_headers, Jack.application_error(e)];
      }
    };
  },

  not_found: function () {
    return "<h1>Not Found</h1>";
  },

  application_error: function (e) {
    return ["<h1>Application Error: " + e.name + "</h1>",
            "<p>" + e.message + "</p>"].join("\n");
  }
};
