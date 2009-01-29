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
            Ruby.Jack.log.info('Requested ' + env['PATH_INFO']);
            return [200, Jack.default_headers, Jack.routes[i][1].call(env)];
          }
        };

        return Jack.not_found();
      }
      catch(e) {
        return Jack.application_error(e);
      }
    };
  },

  not_found: function () {
    return [404, Jack.default_headers, "<h1>Not Found</h1>"];
  },

  application_error: function (e) {
    // TODO: why doesn't Jack.log work here?
    Ruby.Jack.log.error(e.name + ': ' + e.message);
    var html = ["<h1>Application Error: " + e.name.escapeHTML() + "</h1>",
      "<p>" + e.message.escapeHTML() + "</p>"].join("\n");
    return [500, Jack.default_headers, html];
  }
};
