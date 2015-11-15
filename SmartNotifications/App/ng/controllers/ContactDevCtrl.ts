/// <reference path="../_references.ts" />

namespace SN {
    export class ContactDevCtrl {
        static $inject = [
			"$scope",
            "$http",
            "$window",
			"$timeout"
        ];

		constructor(
			private $scope: ICtrlScope<ContactDevCtrl>,
			private $http: ng.IHttpService,
			private $window: ng.IWindowService,
			private $timeout: ng.ITimeoutService) {

            $scope.vm = this;

		}
    }

    angular.module("SN.app.controllers").controller("ContactDevCtrl", ContactDevCtrl);
}