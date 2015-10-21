/// <reference path="../_references.ts" />

namespace SN {
    export class AppLoadCtrl {
        static $inject = [
			"$scope",
            "$http",
            "$window",
			"$timeout",
			"SPColorService",
			"PleaseWaitService",
			"SPService"
        ];

		constructor(
			private $scope: ICtrlScope<AppLoadCtrl>,
			private $http: ng.IHttpService,
			private $window: ng.IWindowService,
			private $timeout: ng.ITimeoutService,
			private colorService: SPColorService,
			private pleaseWait: PleaseWaitService,
			private spservice: SPService) {

            $scope.vm = this;

			this.pleaseWait.start(colorService.getSuiteBarBackground());
			this.colorService.applyBackgrounds();

			spservice.getSettings().done((appSettings) => {
				//first run, the app is not inited yet
				if (appSettings == null) {
					
				}
			});


			$timeout(() => {
				this.pleaseWait.close();
			}, 3000);


		}
    }

    angular.module("SN.app.controllers").controller("AppLoadCtrl", AppLoadCtrl);
}