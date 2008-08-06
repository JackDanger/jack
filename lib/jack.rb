#!/usr/bin/env ruby

require 'rubygems'
gem 'johnson'
require 'johnson'
gem 'rack'
require 'rack'

#
# Javascript + Rack = Jack
# http://github.com/JackDanger/jack
#

class Johnson::Runtime
  def readfile(file)
    IO.read(file)
  end
end


class Jack
  class << self
    BASE    = File.join(File.dirname(__FILE__), '..')
    JACK_JS = File.read(File.join(BASE, 'lib', 'jack.js'))

    def up(js_app_files, options = {})
      
      options[:Port] ||= '1337'
      options[:Host] ||= '127.0.0.1'
      
      app = proc do |env|

        js_app_code = js_app_files.map {|file| File.read(File.join(BASE, file)) }.join(";\n")

        status, headers, body = Johnson.evaluate(JACK_JS + js_app_code, :env => env).to_a
        [status, Hash[*headers.to_a.flatten], body.split('\n')]
      end
      
      puts "Running #{js_app_files.join(", ")} on port #{options[:Port]}"

      Rack::Handler::Mongrel.run(app, options)
    end
  end
end
