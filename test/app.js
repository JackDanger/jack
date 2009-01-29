#!/usr/bin/env jack

var hello = function () {
  return "<h1>O hai.</h1>";
};

var error = function () {
  return boognish;
}

Jack.routes.push([/hello/, hello]);
Jack.routes.push([/ohai/, hello]);
Jack.routes.push([/error/, error]);
Jack.up();