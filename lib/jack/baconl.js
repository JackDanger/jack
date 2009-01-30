var baconl = (function() {    
    var self = function( template ) {
        var tree;
        if ( template.isNode !== true ) {
            tree = baconl.baconize( template );
        }
        else {
            tree = template;
        }
        return tree.html();
    }
    
    return self    
})();

baconl.map = function ( array , callb ) {
    var result = [];
    for (var i=0; i < array.length; i++) {
        result.push( callb( i , array[i] ) );
    };
    return result;
}

baconl.each = function( array , callb )  {
    for (var i=0; i < array.length; i++) {
        callb( i , array[i] );
    };
    return array;
}

baconl.grep = function( array , callb ) {
    var result = [];
    baconl.each( array , function(i,obj) {
        if ( callb( i , obj ) ) {
            result.push( obj );
        }
    } );
    return result;
}

baconl.parse = function( template ) {
    if ( template === undefined ) { return undefined; }
    var tokens = {
        id: undefined,
        classes:[],
        tag: undefined,
        innerHTML: "" 
    };

    var tagDefinition   = /^\s*%([A-Za-z][A-Za-z0-9]*)/;
    var idDefinition    = /^\#([A-Za-z][A-Za-z0-9:_\-]*)/;
    var classDefinition = /^\.([A-Za-z][A-Za-z0-9:_\-]*)/;

    // TODO: parse JSON and use it for the element attributes
    // var jsonDefinition = 

    var innerHTMLDefinition = /\s*\\?((.|[\n])+)/m;

    // Retrieve HTML tag
    var nextToken = template.match( tagDefinition );
    if ( !!nextToken ) {
        tokens.tag = nextToken[1];
    }


    template = template.replace( tagDefinition , "" );

    // Retrieve element ID
    nextToken = template.match( idDefinition );
    tokens.id = !!nextToken ? nextToken[1] : undefined;

    template = template.replace( idDefinition , "" );

    // Retrieve classes
    nextToken = template.match( classDefinition );

    while( !!nextToken ) {
        tokens.classes.push( nextToken[1] );
        template = template.replace( classDefinition , "" );
        nextToken = template.match( classDefinition );
    }

    if ( tokens.tag === undefined && ( tokens.id !== undefined || tokens.classes.length > 0 ) ) {
        tokens.tag = "div";
    }

    // Retrieve inner content
    nextToken = template.match( innerHTMLDefinition );
    tokens.innerHTML = !!nextToken ? nextToken[1] : undefined;

    return tokens;

}

baconl.node = function( definition ) {
    if ( definition !== undefined && definition.isNode ) {
        return definition;
    }
    var self = {
        definition: definition||"" , 
        isNode: true, 
        depth: 0 , 
        childNodes: [] , 
        parentNode: undefined, 
        parent: function() { return self.parentNode; }
    };
    
    function htmlBody() {
        var node = self;
        var result = "";
        
        function openTag( tokens ) {
            if ( tokens.tag === undefined ) { return ""; }
            var result = "<" + tokens.tag;
            if ( tokens.id !== undefined ) { result += " id='" + tokens.id + "'"; }
            if ( tokens.classes.length > 0 ) { 
                result+=" class='" + tokens.classes.join(" ") + "'"; 
            }
            return result + ">";
        } 
        function closeTag( tokens ) {
            if ( tokens.tag === undefined ) { return ""; }
            return "</" + tokens.tag + ">";
        }

        result += openTag( node );

        if ( self.innerHTML !== undefined ) {
            result += self.innerHTML;
        } 

        result += baconl.map( node.childNodes , function(index , childNode ){
            return childNode.html();
        } ).join("\n");

        result += closeTag( node );
        return result;        
    }
        
    function parseDefintion(){
        var element = baconl.parse( self.definition );
        self.id = element.id;
        self.classes = element.classes;
        self.tag = element.tag;
        self.innerHTML = element.innerHTML;
    }    
    
    function makeChild( child ) {
        child = baconl.node( child );
        child.depth = self.depth + 1;
        child.parentNode = self;
        return child;
    }

    self.html = function() {
        if ( arguments.length === 0 ) {
            return htmlBody();
        }
        self.empty();
        self.append.apply( self , arguments );
        return self;                
    }

    self.prepend = function() {
        for ( var i = 0 ; i < arguments.length ; i++ ) {
            self.childNodes.splice(0,0, makeChild( arguments[i] ) );
        }
        return self;        
    }
    
    self.append = function() {
        for ( var i = 0 ; i < arguments.length ; i++ ) {
            self.childNodes.push( makeChild( arguments[i] ) );
        }
        return self;
    }
    
    self.remove = function() {
        self.depth = 0;
        if ( self.parentNode === undefined ) { return self; }
        self.parentNode.childNodes = baconl.grep( self.parentNode.childNodes , function(i,node){
            return node !== self;
        } );
        self.parentNode = undefined;
        return self;
    }
    
    self.empty = function() {
        baconl.each( self.childNodes , function(i,node){
            node.remove();
        });
        return self;
    }
    
    self.hasClass = function( className ) {
        for (var i=0; i < self.classes.length; i++) {
            if ( self.classes[i] === className ) { return true; }
        };
        return false;
    }
    
    self.addClass = function( classes ) {
        baconl.each( classes.split(/\s+/) , function(i , className) {
            if ( !self.hasClass( className ) ) {
                self.classes.push( className );
            }
        });
        return self;
    }
    
    self.removeClass = function( classes ) {
        baconl.each( classes.split(/\s+/) , function(index, argClassName) {
            self.classes = baconl.grep( self.classes , function( index , ownClassName ) {
                return (ownClassName !== argClassName);
            } ) ;
        });
        return self;
    }
    
    parseDefintion();
    return self;
}

baconl.baconize = function( unreadBuffer , parentNode ) {
    if ( unreadBuffer.constructor === String ) {
        unreadBuffer = unreadBuffer.split("\n");
    }
    
    if ( parentNode === undefined ) {
        parentNode = baconl.node();
    }
    function lineDepth( line ) {
        return line.match(/^\s*/)[0].length/2 + 1;
    }
    function isChild( line ) {
        return lineDepth(line) === parentNode.depth+1;
    }

    for ( var i = 0 ; i < unreadBuffer.length ; i++ ) {
        if ( isChild( unreadBuffer[i] ) ) {
            var child = baconl.node( unreadBuffer[i] ) ;
            parentNode.append( child );
            baconl.baconize( 
                unreadBuffer.slice( i+1 ) , 
                child 
            );
        }
        else if ( lineDepth(unreadBuffer[i]) <= parentNode.depth ) {
            return parentNode;            
        }
    }
    return parentNode;
}
