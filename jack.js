/*
  Javascript + Rack = Jack
  http://github.com/JackDanger/jack
*/




var Jack = {
  run : function(app){
    env = {}
    var status_code, headers, body
    [status_code, headers, body] = ('function' == typeof(app)) ? app(env) : app.call(env)
    print("Status: "+status_code)
    for (var key in headers) {
      value = headers[key],
      print(key+": "+value)
    }
    print("")
    print(body)
    if ('function' == typeof(body.close))
      body.close()
  }
}