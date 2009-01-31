Jack.Action(/^\/$/,function() {
    window.document = new DOMDocument( baconl("%body\n  %h1 hello!\n  %div.message") );
    window.$(".message").text("This message inserted dynamically");
    window.$(".message").append( baconl("%p paragraph") );
    
    window.$(".message").load("http://www.google.com body");
    
    return window.document.innerHTML;
});

Jack.Action(/user\/\d+/,function() {
    return baconl("%h1 User!");
});

Jack.up();
