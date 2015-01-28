os = require 'os'
childProcess = require 'child_process'


module.exports =
	publish: (type, domain, port)->
		name = os.hostname().replace /\.local\.?$/, ''
		# type = '_coqs-gameserver'
		# domain = 'local'

		# possible values for process.platform
		# linux
		# win32
		# win64
		# darwin (osx)

		# dns-sd support can be added to windows using apple's sdk: https://developer.apple.com/bonjour/
		try
			child = switch process.platform
				when "darwin" 
					childProcess.spawn 'dns-sd', ['-R', name, type, domain, port]
				when "win32","win64" 
					childProcess.spawn 'dns-sd', ['-R', name, type, domain, port]
				when "linux" 
					childProcess.spawn 'avahi-publish-service', [name, "#{type}._tcp", port]
				else
					console.warn "Plateform not supported"
		catch
			print "Veuillez installer mDNS"