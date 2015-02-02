var expect = require('chai').expect;
var	path = require('path');
var	fail = require('chai').assert.fail;
var	mdns = require('../mdns-native');
var	publish = mdns.publish;
var	originalPlatform = process.platform;
var	childprocess;


var testPublish = function(platformOverride, errorCallback)
{
	process.platform = platformOverride;
	return publish("_dummyService", "local", 9900, errorCallback);
}

describe('MDNS module', function() {

	afterEach(function(done)
	{
		process.platform = originalPlatform;

		if (childprocess){
				childprocess.kill();
				childprocess = null;
			}

		done();
    });


	it('gives an error if the platform is not supported', function(done) {
		testPublish('dummyPlateForm', function(err) {
			expect(err).to.equal('Platform not supported: '+process.platform);
			done();
		});
	});



	it('doesn\'t give me an error when mDNS exists.', function(done) {
		process.env.PATH = path.join(process.env.PWD, '/test/PATH/');

		childprocess = testPublish("darwin", function(err) {
			fail(null,null,'function did return an error.');
		});

		setTimeout(function(){
			// After delay expires we consider that there's no error.
			done();
		}, 200);
	});


	it('gives an error when mDNS does not exist.', function(done) {
		process.env.PATH = '';
		childprocess = testPublish(process.platform, function(err) {
			expect(err).to.equal('Please refer to the readme file.');
			done();
		});

		setTimeout(function(){
			fail(null,null,'function did NOT return an error.');
			done();
		},200);
	});
});
