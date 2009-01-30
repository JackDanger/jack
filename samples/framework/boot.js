Jack.Action( /^\/$/ , function(){    
    return baconl("%h1 hello!");
});

Jack.Action( /user\/\d+/ , function(){    
    return baconl("%h1 User!");
});

Jack.up();
