require 'rubygems'
require 'optparse'
require 'jack'

usage = "Usage: jackup my_javascript_app.js [rack options] [javascript options]"

options = OptionParser.new("", 24, '  ') do |opts|

  opts.banner = usage

  opts.separator ""
  opts.separator "Rack options:"
  opts.on("-o", "--host HOST", "listen on HOST (default: 127.0.0.1)") do |host|
    Jack.options[:Host] = host
  end

  opts.on("-p", "--port PORT", "use PORT (default: 9292)") do |port|
    Jack.options[:port] = port
  end

  opts.separator ""
  opts.separator "Javscript options:"

  opts.on_tail("-f", "--file", "require a javascript file") do |f|
    Jack.require  f
  end

  opts.on_tail("-h", "--help", "Show this message") do
    puts opts
    exit
  end

  opts.on_tail("--version", "Show version") do
    require 'jack'
    puts "Jack #{Jack.version}"
    exit
  end

  opts.parse! ARGV
  
end

unless js_app_file = ARGV[0]
  puts "!!Missing js app file!!"
  puts ''
  puts usage
  exit
end

Jack.up js_app_file
