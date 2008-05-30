var Jack = {
  VERSION : '0.0.0',

  Handler : {
    
    run : function(app){
      /* Should do:
       *   Claim a port
       *   Run the app on request 
       * Does:
       *   Just run the app once
       */
      this.call(app)
    },
    
    call : function(app){
      env = {}
      var status_code, headers, body
      [status_code, headers, body] = app.call(env)
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
}


var application = {
 call : function(env){
   return [200, {'Content-Type': 'text/html'}, '<h1>SpiderMonkey</h1>']
 } 
}

Jack.Handler.run(application)