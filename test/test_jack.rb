require 'rubygems'
# require 'minitest'
require 'test/unit'
require File.dirname(__FILE__) + '/../lib/jack'
require 'open-uri'
require 'ostruct'

class TestJack < Test::Unit::TestCase
  TEST_OPTS = OpenStruct.new(:log => File.dirname(__FILE__) + '/test.log',
                             :host => 'localhost', :port => 1338)

  def setup
    @app_thread = Thread.new do
      Jack.run(File.dirname(__FILE__) + '/app.js', TEST_OPTS)
    end
    sleep 0.1
  end

  def teardown
    @app_thread.kill
  end

  def test_hello_world
    assert_match /o hai/i, open('http://localhost:1338/hello').read
    assert_raises(OpenURI::HTTPError) { open('http://localhost:1338/error').read }
    assert_raises(OpenURI::HTTPError) { open('http://localhost:1338/404').read }
  end
end
