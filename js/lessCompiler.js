$(function() {
	var options = {
		lessVersions: [ '1.3.3', '1.3.1', '1.3.0' ]
		,lessCDN: "//cdnjs.cloudflare.com/ajax/libs/less.js/{version}/less.min.js"
	};

	var elements = {
		lessVersion: $('#lessVersion')
		,lessInput: $('#lessInput')
		,cssCode: $('#cssOutput')
	};



	populateLessVersions();
	setupEvents();




	function populateLessVersions() {
		$.each(options.lessVersions, function(i, ver) {
			elements.lessVersion.append($('<option />').text(ver));
		});
	}

	function setupEvents() {
		elements.lessVersion.bind('change', function(){
			var version = elements.lessVersion.val();
			var script = options.lessCDN.replace('{version}', version);
			$.getScript(script).then(compileLess)
		});

		var previousLessCode = elements.lessInput.val();
		elements.lessInput.on('change keyup input paste cut copy', function() {
			var lessCode = elements.lessInput.val();
			if (previousLessCode === lessCode)
				return;

			previousLessCode = lessCode;

			compileLess();
		});
	}


	function compileLess() {
		var lessCode = elements.lessInput.val();

		var compiledCSS = "TEMP: " + lessCode;

		elements.cssCode.text(compiledCSS);
	}


});