/// <reference path="../_references.ts" />

namespace SN {
    export class PleaseWaitService {
        static $inject = [
            "$window"
        ];

		private wait: any = null;

		constructor(
			private $window: ng.IWindowService) {
		}

		public start(color: string): void {
			this.wait = (<any>this.$window).pleaseWait({
				logo: "../Images/AppIcon.png",
				backgroundColor: color,
				loadingHtml: String.format("<div class='ms-core-pageTitle'>Smart Notifications App</div>" +
				"<div class='spinner'>" +
				"<div class='bounce1 ms-topBar'></div>" +
				"<div class='bounce2 ms-topBar'></div>" +
				"<div class='bounce3 ms-topBar'></div>" +
				"</div>")
			});
		}

		public close(): void {
			if (this.wait != null) {
				this.wait.finish();
			}
		}
    }

	angular.module("SN.app.services").service("PleaseWaitService", PleaseWaitService);
}