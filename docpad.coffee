redirects = require('./redirects')
# DocPad Configuration File
# http://docpad.org/docs/config
# Define the DocPad Configuration
docpadConfig = {
	# ...
	templateData:

		# Specify some site properties
		site:
			# The production url of our website
			url: "http://cumulocity.com/guides"


			# The default title of our website
			title: "Cumulocity IoT Guides"

			# The website description (for SEO)
			description: "Concepts, user, and developer guides for the Cumulocity IoT platform"


			# The website keywords (for SEO) separated by commas§
			keywords: "Concepts, documentation, user guide, developer guide, Cumulocity IoT, IoT platform "

			# The website author's name
			author: "Cumulocity"

			# The website author's email
			email: "carlos.ceia@cumulocity.com"

      # Scripts
			scripts: [
				"/scripts/bootstrap/dropdown.js",
				"/scripts/bootstrap/transition.js",
				"/scripts/bootstrap/scrollspy.js",
				"/scripts/bootstrap/collapse.js",
				"/scripts/bootstrap/transition.js",
				"/scripts/clipboard.js",
				"/scripts/zoom.min.js",
				"/scripts/jquery-scrollto.js",
				"/scripts/jquery.history.js",
				"/scripts/ajaxify-html5.js",
				"/scripts/docs-main.js"
			]



		# -----------------------------
		# Helper Functions
		getUrl: (document) ->
			return @site.url + (document.url or document.get?('url'))

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')

		getAbsoluteUrl: (_, site) ->
			site = site || @site.url

			if (typeof _ == "string")
					if (_[0] == "/" && _[1] != "/")
							return site+_
					return _

			if (typeof _ == "object")
					if (_.url)
							return @getUrl(_.url,site)
					if (_.map)
							_getUrl = arguments.callee
							return _.map((d) ->
									return _getUrl(d,site)
							)

			return _

		sections: [
			{ title: 'Concepts Guide', folder: 'guides/concepts', slug: 'concepts-guide', icon: 'c8y-icon c8y-icon-c8y-engine', description: 'The concept descriptions explain the architecture and technical concepts behind Cumulocity. They are intended for anyone technically interested in the machine-to-machine application platform, be it solution architects, system administrators or software developers.' },
			{ title: 'User\'s Guide', folder: 'guides/users-guide', slug: 'users-guide', icon : 'fa fa-user-circle-o', description: ''}
			# { title: 'Handbuch', folder: 'guides/benutzerhandbuch', slug: 'benutzerhandbuch', icon : 'fa fa-user-circle-o', description: ''},
			# { title: 'Analytics User Guide', folder: 'guides/event-language' , slug: 'event-language', icon : 'c8y-icon c8y-icon-data-explorer', description: 'TBD'},
			# { title: 'Device Guides', folder: 'guides/devices' , slug: 'device-guides', icon: 'c8y-icon c8y-icon-device-management', description: '' },
			# { title: 'REST Developer\'s Guide', folder: 'guides/rest', slug: 'rest-developer', icon: 'fa fa-cog', description: '' },
			# { title: 'MQTT Developer\'s Guide', folder: 'guides/mqtt', slug: 'mqtt-developer', icon: 'fa fa-cog', description: '' },
			# { title: 'Java Developer\'s Guide', folder: 'guides/java', slug: 'java-developer', icon: 'c8y-icon c8y-icon-java', description: '' },
			# { title: 'Web Developer\'s Guide', folder: 'guides/web', slug: 'web-developer', icon: 'c8y-icon c8y-icon-smart-rest', description: '' },
			# { title: 'C++ Developer\'s Guide', folder: 'guides/cpp', slug: 'cpp-developer', icon: 'fa fa-cog', description: '' },
			# { title: 'Reference Guide', folder: 'guides/reference' , slug: 'reference-guide', icon : 'fa fa-book', description: 'The reference guide contains the detailed technical specifications of the programming interfaces of Cumulocity as reference for software developers.'},
		]
	

	# =================================
	# Environments
	environments:
		development:
			templateData:
				site:
					url: 'http://localhost:9778/guides'

	watchOptions: preferredMethods: ['watchFile','watch']

	plugins:
		redirector:
			redirects:
				redirects
		less:
			referencesOthers: true

	ignoreHiddenFiles: true

}

# Export the DocPad Configuration
module.exports = docpadConfig