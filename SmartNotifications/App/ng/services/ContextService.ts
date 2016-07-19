/// <reference path="../_references.ts" />

namespace SN {
	export class ContextService extends Context {
		static $inject = [
            "$window",
			"$location"
        ];

		constructor(private $window: ng.IWindowService, private $location: ng.ILocationService) {
			super();

			this.appLeafUrl = (<any>this.$window).SN.appUrl;
			this.version = (<any>this.$window).SN.version;
			this.appUrl = this.$location.absUrl().substr(0, this.$location.absUrl().indexOf(this.appLeafUrl) + this.appLeafUrl.length + 1);
			this.hostTitle = this.getParameterByName("HostTitle");
			this.hostUrl = SPListRepo.Helper.ensureTrailingSlash(this.getParameterByName("SPHostUrl"));
			this.debug = (<any>this.$window).SN.debug;
		}

		private getParameterByName(name: string): string {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

		private getWebUrl(key: string): string {
			var webUrl = this.getParameterByName(key);
			return this.endsWith(webUrl, "/") ? webUrl : webUrl + "/";
		}

		private endsWith(str: string, suffix: string): boolean {
			return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}

	}

    angular.module("SN.app.services").service("ContextService", ContextService);
}