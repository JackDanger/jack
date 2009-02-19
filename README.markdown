# Jack

Rack + Javascript = Jack

Write your web apps in the same powerful language on both ends.

## Does it work?

Yes, thanks entirely to the hard work of [Christian Neukirchen](http://chneukirchen.org/) for Rack and John Barnette, Aaron
Patterson, Yehuda Katz, and Matthew Draper for their work on [Johnson](http://github.com/jbarnette/johnson).

## Why would I need this?

Because this is kickass, that's why:

    function(env){
      return [200, {'Content-Type': 'text/html'}, "you're looking at: "+env['PATH_INFO']];
    };

## How do I try it painlessly?

    $ sudo gem install jbarnette-johnson --source=http://gems.github.com
    $ git clone git://github.com/technomancy/jack.git
    $ cd jack && rake install_gem
      [...]
    $ samples/hello.js &
    $ curl http://localhost:1337

First version (and idea) by Jack Danger Canty, this version by Phil Hagelberg.
