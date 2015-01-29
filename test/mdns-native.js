var expect = require('chai').expect,
		mdns = require('../mdns-native'),
		publish = mdns.publish;

var test = function(platformOverride, callback)
{
	process.platform = platformOverride;
	publish("_dummyService", "local", 9900, callback);
}

describe('MDNS module', function() {
	it('works as expected.', function(done) {
		test('linux', function(err, childProcess) {
			if (err) throw new Error(err);
			if (childProcess)
				console.log('Found child process:',childProcess.pid);
			done();
			childProcess.kill();
		});
	});
});
