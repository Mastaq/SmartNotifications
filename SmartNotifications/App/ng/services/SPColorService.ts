/// <reference path="../_references.ts" />

namespace SN {
    export class SPColorService {
        static $inject = [
            "VendorsFactory"
        ];

		private wait: any = null;
		private $: JQueryStatic;

		constructor(
			vendorsFactory: { $: JQueryStatic }) {
			this.$ = vendorsFactory.$;
		}

		private getElementColor(selector: string): string {
			return this.$(selector).css("color");
		}

	    private getElementBackground(selector:string): string {
			return this.$(selector).css("background-color");
	    }

	    public getSuiteBarBackground(): string {
		    return this.getElementBackground("#suiteBarLeft");
	    }

		public applyBackgrounds() {
			var background = this.getElementBackground(".ms-rteTable-1 tr.ms-rteTableHeaderRow-1");
			var linksColor = this.getElementColor(".ms-core-listMenu-item");
			var linksBackground = this.getElementBackground(".ms-HoverBackground-bgColor");
			var activeLinkBackground = this.getElementBackground(".ms-core-listMenu-selected");
			this.$("head").append(String.format("<style type='text/css'>" +
				".navigation-menu ul a {{color: {1};}} " +
				".navigation-menu ul a:hover {{background-color:{2};}} " +
				".navigation-menu ul li.active a {{background-color: {3};color: {1};}}" +
				"</style>", background, linksColor, linksBackground, activeLinkBackground));
		}
    }

	angular.module("SN.app.services").service("SPColorService", SPColorService);
}