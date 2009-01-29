#!/usr/bin/env jack

function(env){
  return [200, {'Content-Type': 'text/html'}, '<h1>Hello World</h1>'];
}