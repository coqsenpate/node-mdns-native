var expect = require('chai').expect,
    mdns = require('../mdns-native'),
    publish = mdns.publish;

var test = function() {
      process.platform = 'linux';
      publish("_coqs-gameserver", "local", 9000);
  }
var test2 = function() {
      process.platform = 'win32';
      publish("_coqs-gameserver", "local", 9000);
  }
var test3 = function() {
      process.platform = 'sunos';
      publish("_coqs-gameserver", "local", 9000);
  }

describe('#test', function() {
  it('test linux (no error)', function() {
    expect(test).to.not.throw(Error);
  });

  it('test windows/macOS (error with childProcess.spawn)', function() {
    expect(test2).to.throw(Error);
  });

  it('test sunOS (plateform inconnue)', function() {
    expect(test3).to.throw(Error);
  });
});