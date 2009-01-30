Jack.Utils = {
    detect: function( array , callback ) {
        for ( var i in array ) {
            if ( callback.call( array[i] , i , array[i] ) ) {
                return array[i];
            }
        }
        return undefined;
    } , 
    camelize: function(string) {
      var parts = string.split("_");
      return parts.map(function(part) {
        return part.substr(0,1).toUpperCase() + part.substr(1, part.length);
      }).join("");
    },
    parameterize: function(string) {
      var params = {};

      if(null == string) return params;
      var parameters = string.split("&");
      for(var i = 0; i < parameters.length; i++) {
        var bits = parameters[i].split("=");
        params[bits[0]] = bits[1];
      }
      return params;
    }
}
