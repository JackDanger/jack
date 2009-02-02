Jack.Template = (function() {
    var templates = {};
    return function(name,file) {
        if ( !file ) { return new DOMDocument(templates[name]); }
        templates[name] = baconl(Ruby.File.read("./samples/framework/templates/index.html.haml"));
        
        return Jack.Template;
    }
})();


Jack.View = (function() {
    var views = {};
    return function(name,callback) {
        if ( !callback ) { 
            return function() views[name].apply( window , arguments);
        }
        views[name] = callback;
        return Jack.View;
    }
})();