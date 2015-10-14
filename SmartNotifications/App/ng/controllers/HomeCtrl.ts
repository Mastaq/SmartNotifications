/// <reference path="../_references.ts" />

namespace SN {
    export class HomeCtrl {
        static $inject = [
			"$scope",
            "$http",
            "$window"
        ];

		info: string;

        constructor(private $scope: ICtrlScope<HomeCtrl>, private $http: ng.IHttpService, private $window: ng.IWindowService) {

            $scope.vm = this;

	        this.info = "123";

        }
    }

    angular.module("SN.app.controllers").controller("HomeCtrl", HomeCtrl);
}