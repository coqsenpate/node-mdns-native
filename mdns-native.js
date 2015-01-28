"use strict";
var os = require('os');
var childProcess = require ('child_process');

function execute(command, args)
{
  try {
        return childProcess.spawn(command, args);
  }
  catch(error){
      throw "Please refer to the readme file.";
  }
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
              return execute('dns-sd', ['-R', name, type, domain, port]);
            case "linux":
              return execute('avahi-publish-service', [name, "" + type + "._tcp", port]);
            default:
              throw "Platform not supported.";
          }
        })();
      } catch (_error) {
          console.error (_error);
      }
    }
  };
