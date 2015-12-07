/// <reference path="_references.ts" />

namespace SNScriptLink {

	((window: any) => {
		function onLzLoaded() {
			jQuery.get(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/templates.html")
				.then(data => {
					Type.registerNamespace("ko");
					Type.registerNamespace("LZString");

					jQuery("body").append("<div style=\"display:none\">" + data + "<\/div>");
					jQuery("#RibbonContainer-TabRowRight").prepend("<div class=\"sn-app-bootstrap\" id=\"sn-app-scriptlink\" data-bind=\"template: {name: 'sn-app-scriptlink-tmpl'}\"></div>");

					ko.applyBindings(new ScriptLinkViewModel(), document.getElementById("sn-app-scriptlink"));
				});
		}

		function onkoLoaded() {
			if (!window.LZString) {
				var lzLoader = new SPAsyncScript("snlzstring", _spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/lz-string.min.js", onLzLoaded);
				lzLoader.load();
			} else {
				onLzLoaded();
			}
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
			SP.SOD.loadMultiple(["sp.js"], () => { });
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
				RegisterModuleInit(url + "SmartNotificationsAssets/sn.scriptlink.js", () => {
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
	})(window);
}