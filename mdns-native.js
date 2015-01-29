"use strict";
var os = require('os');
var childProcess = require ('child_process');

function executeIt(command, args)
{
      var kid = childProcess.spawn(command, args);
      kid.on('error', function(err) {
          throw new Error('Please refer to the readme file.');
       });
      return kid;
}


  module.exports = {
    publish: function(type, domain, port) {
      var child, name;
      name = os.hostname().replace(/\.local\.?$/, '');
      try {
        return child = (function() {
          switch (process.platform) {
            case "darwin":
            case "win32":
            case "win64":
              return executeIt('dns-sd', ['-R', name, type, domain, port]);
            case "linux":
              return executeIt('avahi-publish-service', [name, "" + type + "._tcp", port]);
            default:
              // throw new Error('Platform not supported: ' + process.platform + '.');
              throw new Error('Platform not supported: ');
          }
        })();
      } catch (_error) {
          // console.error (_error);
          throw _error;
      }
    }
  };
