"use strict";
var os = require('os');
var childProcess = require ('child_process');

function executeIt(command, args, callback) {

	var child = childProcess.spawn(command, args);

	child.on('error', function(err){
		callback('Please refer to the readme file.');
	});

	callback(null,child);
}

module.exports = {
	publish: function(type, domain, port, callback){
		if(!callback)
			callback = function(){};

		var name = os.hostname().replace(/\.local\.?$/, '');

		switch (process.platform) {
			case "darwin":
			case "win32":
			case "win64":
				executeIt('dns-sd', ['-R', name, type, domain, port], callback);
				break;
			case "linux":
				executeIt('avahi-publish-service', [name, type + "._tcp", port], callback);
				break;
			default:
				callback('Platform not supported: '+process.platform);
				break;
		}
	}
};
