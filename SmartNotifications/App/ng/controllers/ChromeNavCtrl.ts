/// <reference path="../../_references.ts" />

namespace SN {
    export class ChromeNavCtrl {
        static $inject = [
			"$scope",
            "$http",
            "$window"
        ];

		info: string;

        constructor(private $scope: ICtrlScope<ChromeNavCtrl>, private $http: ng.IHttpService, private $window: ng.IWindowService) {

            $scope.vm = this;
        }
    }

    angular.module("SN.app.controllers").controller("ChromeNavCtrl", ChromeNavCtrl);
}