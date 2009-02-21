# -*- ruby -*-

require 'rubygems'
require 'hoe'
require File.dirname(__FILE__) + '/lib/jack'

Hoe.new('jack', Jack::VERSION) do |p|
  p.summary = "A web framework for Javascript."
  p.developer('Jack Danger Canty', 'gems@6brand.com')
  p.developer('Phil Hagelberg', 'technomancy@gmail.com')

  p.extra_deps << ['johnson', '~> 1.0.0']
  p.extra_deps << ['rack', '~> 0.9.0']
  p.extra_deps << ['clip', '~> 1.0.0']
  p.extra_dev_deps << ['minitest', '~> 1.3.0']
end

# vim: syntax=Ruby
