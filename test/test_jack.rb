require 'rubygems'
# require 'minitest'
require 'test/unit'
require File.dirname(__FILE__) + '/../lib/jack'
require 'open-uri'
require 'ostruct'

class TestJack < Test::Unit::TestCase
  TEST_OPTS = OpenStruct.new(:log => File.dirname(__FILE__) + '/test.log',
                             :host => 'localhost', :port => 1338)

  def test_hello_world
    app_thread = Thread.new do
      Jack.run(File.dirname(__FILE__) + '/../samples/hello.js', TEST_OPTS)
    end
    sleep 1 # TODO: don't sleep; seriously.
    assert_match /Hello World/, open('http://localhost:1338').read
  end
end
