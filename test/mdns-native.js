var expect = require('chai').expect,
    mdns = require('../mdns-native'),
    publish = mdns.publish;

var test = function() {
      process.platform = 'linux';
      publish("_coqs-gameserver2000", "local", 9900);
  }
var test2 = function() {
      process.platform = 'win32';
      publish("_coqs-gameserver2000", "local", 9900);
  }
var test3 = function() {
      process.platform = 'sunos';
      publish("_coqs-gameserver2000", "local", 9900);
  }

describe('#test', function() {
  it('test linux (no error)', function() {
    expect(test).to.not.throw(Error);
  });

  it('test windows/macOS (error with childProcess.spawn)', function() {
    expect(test2).to.throw('Please refer to the readme file.');
  });

  it('test sunOS (plateform inconnue)', function() {
    expect(test3).to.throw('Platform not supported: ');
  });
});