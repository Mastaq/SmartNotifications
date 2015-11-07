/// <reference path="_references.ts" />

namespace SN {
	((window: any) => {
		SP.SOD.executeOrDelayUntilScriptLoaded(() => {
			function onkoLoaded() {
				jQuery.get("../templates.html")
					.then(data => {
						jQuery("body").append("<div style=\"display:none\">" + data + "<\/div>");
						ko.applyBindings(new ManageAppViewModel(), document.getElementById("sn-manage-app"));
					});
			}

			function onjQueryLoaded() {
				if (!window.ko) {
					var koLoader = new SPAsyncScript("snknockout", "../knockout.js", onkoLoaded);
					koLoader.load();
				} else {
					onkoLoaded();
				}
			}

			var start = () => {
				SP.SOD.executeOrDelayUntilScriptLoaded(() => {
					if (!window.jQuery) {
						window.registerCssLink("../bootstrap.css");
						window.registerCssLink("../styles.css");
						var jqLoader = new SPAsyncScript("snjquery", "../jquery.js", onjQueryLoaded);
						jqLoader.load();
					} else {
						onjQueryLoaded();
					}
				}, "sp.js");
			}

			if (_spBodyOnLoadCalled) {
				start();
			} else {
				_spBodyOnLoadFunctions.push(start);
			}

		}, "sp.js");
	})(window);
}