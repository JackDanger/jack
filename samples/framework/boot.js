Jack.Template( "index" , "./samples/framework/templates/index.html.haml" );

Jack.View( "indexView" , function( name ){
    window.document = Jack.Template("index");
    return $("body")
            .find(".content")
                .html( 
                    baconl("%p This text was added dynamically by: ")
                )
                .append( name )
            .end()
            .append(
                baconl("%ul.links")
            )
            .find(".links")
                .append(
                    "<li><a href='/user/1'>User 1</a></li>" , 
                    "<li><a href='/user/2'>User 2</a></li>"
                )
             .end()
        .end()
        .html();

});

Jack.Action(/^\/$/,function() {
    return Jack.View("indexView")("cohitre!!!!");
});

Jack.Action(/user\/\d+/,function() {
    return baconl("%h1 User!");
});

Jack.up();