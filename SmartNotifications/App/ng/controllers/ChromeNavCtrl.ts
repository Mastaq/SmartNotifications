/// <reference path="../../_references.ts" />

namespace SN {
    export class ChromeNavCtrl {
        static $inject = [
			"$scope",
            "$http",
            "$window"
        ];

		hostUrl: string;
		hostTitle: string;
		appUrl: string;

        constructor(private $scope: ICtrlScope<ChromeNavCtrl>, private $http: ng.IHttpService, private $window: ng.IWindowService) {

            $scope.vm = this;
			this.hostUrl = "http://host.url";
			this.hostTitle = "COOL";
	        this.appUrl = "http://app.url";

        }
    }

    angular.module("SN.app.controllers").controller("ChromeNavCtrl", ChromeNavCtrl);
}