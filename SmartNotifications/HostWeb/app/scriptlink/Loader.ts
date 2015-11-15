/// <reference path="_references.ts" />

namespace SNScriptLink {
	((window: any) => {
		function onkoLoaded() {

			jQuery.get(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/templates.html")
				.then(data => {
					jQuery("body").append("<div style=\"display:none\">" + data + "<\/div>");
					jQuery("#RibbonContainer-TabRowRight").prepend("<div class=\"sn-app-bootstrap\" id=\"sn-app-scriptlink\" data-bind=\"template: {name: 'sn-app-scriptlink-tmpl'}\">hello</div>");

					ko.applyBindings(new ScriptLinkViewModel(), document.getElementById("sn-app-scriptlink"));
				});
		}

		function onjQueryLoaded() {
			if (!window.ko) {
				var koLoader = new SPAsyncScript("snknockout", _spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/knockout.js", onkoLoaded);
				koLoader.load();
			} else {
				onkoLoaded();
			}
		}

		var start = () => {
			SP.SOD.executeOrDelayUntilScriptLoaded(() => {
				if (!window.jQuery) {
					window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/styles.css");
					var jqLoader = new SPAsyncScript("snjquery", _spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/jquery.js", onjQueryLoaded);
					jqLoader.load();
				} else {
					onjQueryLoaded();
				}
			}, "sp.js");
			SP.SOD.loadMultiple(["sp.js"], () => {});
		}

		if (_spBodyOnLoadCalled) {
			start();
		} else {
			_spBodyOnLoadFunctions.push(start);
		}
	})(window);
}