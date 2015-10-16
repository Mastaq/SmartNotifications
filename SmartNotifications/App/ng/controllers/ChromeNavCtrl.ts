/// <reference path="../_references.ts" />

namespace SN {
    export class ChromeNavCtrl {
        static $inject = [
			"$scope",
			"ContextService",
			"PleaseWaitService",
			"SPColorService",
			"$timeout"
        ];

		hostUrl: string;
		hostTitle: string;
		appUrl: string;

        constructor(
			private $scope: ICtrlScope<ChromeNavCtrl>,
			private context: ContextService,
			private pleaseWait: PleaseWaitService,
			private colorService: SPColorService,
			private $timeout: ng.ITimeoutService) {

            $scope.vm = this;
			this.hostUrl = this.context.hostUrl;
			this.hostTitle = this.context.hostTitle;
	        this.appUrl = this.context.appUrl;

			this.pleaseWait.start(colorService.getSuiteBarBackground());
	        this.colorService.applyBackgrounds();

			$timeout(() => {
				this.pleaseWait.close();
			}, 3000);
        }
    }

    angular.module("SN.app.controllers").controller("ChromeNavCtrl", ChromeNavCtrl);
}