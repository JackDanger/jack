# Jack

Rack + Javascript = Jack

Write your web apps in the same powerful language on both ends.

## Does it work?

Yes, thanks entirely to the hard work of Christian Neukirchen (http://chneukirchen.org/) for Rack and John Barnette, Aaron Patterson, Yehuda Katz, and Matthew Draper for their work on Johnson (http://github.com/jbarnette/johnson).

## Why would I need this?

Because this is kickass, that's why:

    Jack.run(function(env){
      return [200, {'Content-Type': 'text/html'}, "you're looking at: "+env['PATH_INFO']]
    })

And so's this:

    MyFramework = {
      call: function(env){

        (complex stuff goes here)
        
        return [status, headers, body]
      }
    }
    Jack.run(MyFramework)

## How do I try it painlessly?

    git clone git://github.com/JackDanger/jack.git
    ruby jack/bin/jackup test/hello_world.js