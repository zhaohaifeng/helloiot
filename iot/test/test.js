'use strict';

var assert = require('assert');
var path = require('path');
var test = require('test');

var appRunner = require('ruff-app-runner');
var mock = require('ruff-mock');

var verify = mock.verify;
var when = mock.when;

var appPath = path.join(__dirname, '..');

module.exports = {
  'test should run application': function (done) {
    appRunner
      .run(appPath, function () {

        $('#infrared-receiver').emit('data', {a: 'a', b: 'b'});

        $('#button').emit('push')
        verify($('#led-r')).turnOn();

        setTimeout(function () {
          console.log('timeOut');
        }, 3000)
      })
      .end(function () {
        verify($('#led-r')).turnOff();
        done();
      });
  }
};

test.run(module.exports);
