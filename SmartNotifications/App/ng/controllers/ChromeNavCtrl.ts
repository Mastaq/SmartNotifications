/// <reference path="../_references.ts" />

namespace SN {
    export class ChromeNavCtrl {
        static $inject = [
			"$scope",
			"ContextService"
        ];

		hostUrl: string;
		hostTitle: string;
		appUrl: string;

        constructor(private $scope: ICtrlScope<ChromeNavCtrl>, private context: ContextService) {

            $scope.vm = this;
			this.hostUrl = this.context.hostUrl;
			this.hostTitle = this.context.hostTitle;
	        this.appUrl = this.context.appUrl;

        }
    }

    angular.module("SN.app.controllers").controller("ChromeNavCtrl", ChromeNavCtrl);
}