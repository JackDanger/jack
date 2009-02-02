Jack.Template( "index" , "./samples/framework/templates/index.html.haml" );

Jack.View( "indexView" , function( name ){
    window.document = Jack.Template("index");
    $("body").append( name );
    return document.innerHTML;
});

Jack.Action(/^\/$/,function() {
    return Jack.View("indexView")("cohitre!!!!");
});

Jack.Action(/user\/\d+/,function() {
    return baconl("%h1 User!");
});

Jack.up();