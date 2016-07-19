(function () {
	var hostUrl = "";
	if (document.URL.indexOf("?") != -1) {
		var params = document.URL.split("?")[1].split("&");
		for (var i = 0; i < params.length; i++) {
			p = decodeURIComponent(params[i]);
			if (/^SPHostUrl=/i.test(p)) {
				hostUrl = getParameterByName("SPHostUrl");
				document.write("<link rel=\"stylesheet\" href=\"" + hostUrl +
					"/_layouts/15/defaultcss.ashx\" />");
				break;
			}
		}
	}
	// if no host web URL was available, load the default styling
	if (hostUrl == "") {
		document.write("<link rel=\"stylesheet\" " +
			"href=\"/_layouts/15/1033/styles/themable/corev15.css\" />");
	}

	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

})();