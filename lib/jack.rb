require 'logger'
require 'rubygems'
require 'johnson'
require 'rack'

module Jack
  VERSION = '0.2.0'

  def self.run(app_file, options)
    @js = Johnson::Runtime.new
    @js.load(File.dirname(__FILE__) + "/jack.js")
    app = @js.load(app_file)

    @log = Logger.new(options.log)
    @log.info "Starting #{app_file} on http://#{options.host}:#{options.port}"

    Rack::Handler::Mongrel.run(app, {:Port => options.port, :Host => options.host})
  end

  def self.log; @log end
end
