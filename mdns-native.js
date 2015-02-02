"use strict";
var os = require('os');
var childProcess = require ('child_process');

function execute(command, args, errorCallback) {
	var child = childProcess.spawn(command, args);
	child.on('error', function(err){
		errorCallback('Please refer to the readme file.');
	});

	return child;
}

module.exports = {
	publish: function(type, domain, port, errorCallback){
		if(!errorCallback)
			errorCallback = function(){};

		var name = os.hostname().replace(/\.local\.?$/, '');

		switch (process.platform) {
			case "darwin":
			case "win32":
			case "win64":
				return execute('dns-sd', ['-R', name, type, domain, port], errorCallback);
			case "linux":
				return execute('avahi-publish-service', [name, type + "._tcp", port], errorCallback);
			default:
				errorCallback('Platform not supported: '+process.platform);
		}
	}
};
