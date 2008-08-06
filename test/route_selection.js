Jack.run(function(env){
  body = env['PATH_INFO']
  return [200, {'Content-Type': 'text/html'}, body]
})