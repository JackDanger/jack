

var Jack = {
  /* the Rack env object */
  env : env,

  run : function(app){
    return ('function' == typeof(app)) ? app(Jack.env) : app.call(Jack.env)
  },
  
  lib : {
    jQuery : function(){
      return Johnson.runtime.readfile('lib/jquery-1.2.6.min.js')
    }
  }
}
