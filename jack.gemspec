
Gem::Specification.new do |s|
  s.name = %q{jack}
  s.version = "0.2.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Jack Danger Canty", "Phil Hagelberg"]
  s.date = %q{2009-03-19}
  s.default_executable = %q{jack}
  s.email = ["gems@6brand.com", "technomancy@gmail.com"]
  s.executables = ["jack"]
  s.extra_rdoc_files = ["Manifest.txt"]
  s.files = ["Manifest.txt", "README.markdown", "Rakefile", "bin/jack", "jack.gemspec", "lib/jack.js", "lib/jack.rb", "lib/jack/action.js", "lib/jack/baconl.js", "lib/jack/utils.js", "lib/jack/view.js", "samples/framework/boot.js", "samples/framework/templates/index.html.haml", "test/app.js", "test/test.log", "test/test_jack.rb"]
  s.has_rdoc = true
  s.rdoc_options = ["--main", "README.txt"]
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{jack}
  s.rubygems_version = %q{1.3.1}
  s.summary = %q{A web framework for Javascript.}
  s.test_files = ["test/test_jack.rb"]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 2

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jbarnette-johnson>, ["~> 1.0.0"])
      s.add_runtime_dependency(%q<rack>, ["~> 0.9.0"])
      s.add_runtime_dependency(%q<clip>, ["~> 1.0.0"])
      s.add_development_dependency(%q<minitest>, ["~> 1.3.0"])
      s.add_development_dependency(%q<hoe>, [">= 1.11.0"])
    else
      s.add_dependency(%q<jbarnette-johnson>, ["~> 1.0.0"])
      s.add_dependency(%q<rack>, ["~> 0.9.0"])
      s.add_dependency(%q<clip>, ["~> 1.0.0"])
      s.add_dependency(%q<minitest>, ["~> 1.3.0"])
      s.add_dependency(%q<hoe>, [">= 1.11.0"])
    end
  else
    s.add_dependency(%q<jbarnette-johnson>, ["~> 1.0.0"])
    s.add_dependency(%q<rack>, ["~> 0.9.0"])
    s.add_dependency(%q<clip>, ["~> 1.0.0"])
    s.add_dependency(%q<minitest>, ["~> 1.3.0"])
    s.add_dependency(%q<hoe>, [">= 1.11.0"])
  end
end
