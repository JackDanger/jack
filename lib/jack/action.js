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
