require 'optparse'

options = OptionParser.new("", 24, '  ') { |opts|

  opts.banner = "Usage: jackup [rack options] [javascript options]"

  opts.separator ""
  opts.separator "Rack options:"
  opts.on("-o", "--host HOST", "listen on HOST (default: 0.0.0.0)") { |host|
    options[:Host] = host
  }

  opts.on("-p", "--port PORT", "use PORT (default: 9292)") { |port|
    options[:Port] = port
  }

  opts.separator ""
  opts.separator "Javscript options:"

  opts.on_tail("-f", "--file", "require a javascript file") do |f|
    Jack.require f
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