Ruby.require('cgi');

// Good version (blows up):
String.prototype.escapeHTML = function () {
  return Ruby.CGI.escapeHTML(this);
};

// Crap version (works):
String.prototype.escapeHTML = function () {
  return this.replace(/&/g,'&amp;').
    replace(/>/g,'&gt;').
    replace(/</g,'&lt;').
    replace(/"/g,'&quot;');
           };