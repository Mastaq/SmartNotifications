/// <reference path="../_references.ts" />

namespace SN {
    export class AppLoadCtrl {
        static $inject = [
			"$scope",
			"SPColorService",
			"PleaseWaitService",
			"SPService",
			"$log",
			"toastr",
			"Consts"
        ];

		constructor(
			private $scope: ICtrlScope<AppLoadCtrl>,
			private colorService: SPColorService,
			private pleaseWait: PleaseWaitService,
			private spservice: SPService,
			private $log: ng.ILogService,
			private toastr: Toastr,
			private consts: Constants) {

            $scope.vm = this;

			this.pleaseWait.start(colorService.getSuiteBarBackground());
			this.colorService.applyBackgrounds();

			spservice.getSettings().then((appSettings) => {
				//first run, the app is not inited yet
				if (appSettings == null) {
					this.spservice.createLibrary().then((library) => {
						
					}, (err: SPListRepo.RequestError) => {
						$log.error(err.message);
						$log.error(err.stackTrace);
						this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 10000});
					})
					.finally(() => {
						this.pleaseWait.close();
					});
				} else {
					this.pleaseWait.close();
				}
			}, (err: SPListRepo.RequestError) => {
				$log.error(err.message);
				$log.error(err.stackTrace);

				this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 10000 });
			});
		}
    }

    angular.module("SN.app.controllers").controller("AppLoadCtrl", AppLoadCtrl);
}