#!/usr/bin/env jack

var hello = function() {
    return "<h1>O hai</h1>";
};

var error = function() {
    return "11".boom();
}

Jack.Action(/o-hai/, hello);
Jack.Action(/pow/, error);

Jack.Action(/source\/app\.js/, function(env){
  return [
    200,
    {"Content-Type": "text/plain"},
    Ruby.File.read(Ruby.File.dirname(__FILE__)+'/app.js')
  ]
})

Jack.Action(/jquery/,function() {
    try {
      window.document = new DOMDocument( baconl("%div.message") );
      window.$(".message").text("Hello from jquery");
      return window.document.innerHTML;
    }catch(e){
      return 'framework is fine but jQuery builder is broke'
    }
});

Jack.up()