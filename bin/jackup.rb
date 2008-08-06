require 'rubygems'
gem 'clip'
require 'clip'
require File.join(File.dirname(__FILE__), '..', 'lib', 'jack')

usage = "Usage: jackup my_javascript_app.js [rack options]"

options = Clip do |p|
  p.optional 'o', 'Host', :desc => 'listen on HOST (default: 127.0.0.1)', :default => '127.0.0.1'
  p.optional 'p', 'Port', :desc => 'use PORT (default: 9292)', :default => 9292 do |v|
    v.to_i # always deal with integers
  end
end

if options.valid? && options.remainder.size > 0
  Jack.up options.remainder
else
  $stderr.puts options.to_s
end