os = require 'os'
# childProcess = require 'child_process'


module.exports =
	test: (testOS)->
		try
			child = switch testOS
				when "linux" 
					console.log "je suis sous linux"
				when "darwin" 
					childProcess.spawn 'dns-sd', ['-R', name, type, domain, port]
				else
					console.warn "Platform not supported"
		catch
			console.error "Veuillez installer mDNS"

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
					console.warn "Platform not supported"
		catch
			console.error "Veuillez installer mDNS"