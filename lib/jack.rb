require 'rubygems'
require 'rack'

class Jack
  class << self

    def options
      @options ||= {}
    end
    
    def require(file)
      @required_files ||= []
      @required_files << file
    end
    
    JACK_JS = File.join(File.dirname(__FILE__), '/', 'jack.js')
  
    def up(js_app)
      
      require_files = @required_files.map {|file| " -f #{file} " }.join if @required_files

      command = "#{SPIDERMONKEY_BIN} -f #{JACK_JS} #{require_files} #{js_app}"

      options[:Port] ||= '1337'
      options[:Host] ||= '127.0.0.1'

      app = proc {
        puts "about to run #{command}"
        system(command)
      }
      
      puts "Running #{js_app} on port #{options[:Port]}"

      Rack::Handler::Mongrel.run(app, options)
    end
  end
  
  class Handler
  end
end

  #   server = HttpServer.new("0.0.0.0", 3000)
  #   server.register("/stuff", MyNiftyHandler.new)
  #   server.run.join
