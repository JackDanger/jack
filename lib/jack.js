

var Jack = {
  /* the Rack env object */
  env : env,

  run : function(app){
    return ('function' == typeof(app)) ? app(Jack.env) : app.call(Jack.env)
  }
}
