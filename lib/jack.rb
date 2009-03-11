require 'logger'
require 'rubygems'
require 'johnson'
require 'rack'
gem 'builder'

module Jack
  VERSION = '0.2.0'

  def self.run(app_file, options)
    @js = Johnson::Runtime.new
    @js.load(File.dirname(__FILE__) + "/jack.js")
    Dir.glob(File.dirname(__FILE__) + "/jack/*.js").each { |f| @js.load(f) }

    app = @js.load(app_file)

    @log = Logger.new(options.log)
    @log.info "Starting #{app_file} on http://#{options.host}:#{options.port}"
    @js['Jack']['root'] = File.dirname(app_file)
    @js['Jack']['log']  = @log # Why can't we go the other way? (Jack.log = Ruby.Jack.log)

    Rack::Handler::Mongrel.run(app, {:Port => options.port, :Host => options.host})
  end

  def self.log; @log end
end
