/// <reference path="_references.ts" />

namespace SN {
	((window: any) => {
		SP.SOD.executeOrDelayUntilScriptLoaded(() => {
			function onkoLoaded() {
				Type.registerNamespace("ko");

				jQuery.get("./templates.html")
					.then(data => {
						jQuery("body").append("<div style=\"display:none\">" + data + "<\/div>");
						ko.applyBindings(new ManageAppViewModel(), document.getElementById("sn-manage-app"));
					});
			}

			function onjQueryLoaded() {
				if (!window.ko) {
					var koLoader = new SPAsyncScript("snknockout", "./knockout.js", onkoLoaded);
					koLoader.load();
				} else {
					onkoLoaded();
				}
			}

			var start = () => {
				SP.SOD.executeOrDelayUntilScriptLoaded(() => {
					if (!window.jQuery) {
						window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/bootstrap.css");
						window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/styles.css");

						var jqLoader = new SPAsyncScript("snjquery", "./jquery.js", onjQueryLoaded);
						jqLoader.load();
					} else {
						onjQueryLoaded();
					}
				}, "sp.js");
			}

			function snstartup() {
				if (_spBodyOnLoadCalled) {
					start();
				} else {
					_spBodyOnLoadFunctions.push(start);
				}
			}

			snstartup();
			if (typeof RegisterModuleInit == "function") {

				function mystart() {
					var url = _spPageContextInfo.webServerRelativeUrl;
					url = url.endsWith("/") ? url : url + "/";
					RegisterModuleInit(url + "SmartNotificationsAssets/sn.manage.host.js", () => {
						window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/bootstrap.css");
						window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/styles.css");
						snstartup();
					});
				}

				if (_spBodyOnLoadCalled) {
					mystart();
				} else {
					_spBodyOnLoadFunctions.push(mystart);
				}
			}
		}, "sp.js");
	})(window);
}