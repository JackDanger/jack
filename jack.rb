require 'rubygems'
require 'rack'

module Jack

  SPIDERMONKEY_BIN = 'js'
  JACK_JS = File.join(File.dirname(__FILE__), '/', 'jack.js')
  
  def self.run_jack_app(js_file)
    command = "#{SPIDERMONKEY_BIN} -f #{JACK_JS} #{js_file}"
    app = proc {system(command)}
    Rack::Handler::Mongrel.run(app, headers)
  end
end