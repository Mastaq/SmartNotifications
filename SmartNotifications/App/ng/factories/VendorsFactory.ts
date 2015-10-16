/// <reference path="../_references.ts" />

namespace SN {
	export function VendorsFactory($window: ng.IWindowService) {
		return {
			$: (<any>$window).jQuery
		}
	}

	VendorsFactory.$inject = ["$window"];

    angular.module("SN.app.services").factory("VendorsFactory", VendorsFactory);
}