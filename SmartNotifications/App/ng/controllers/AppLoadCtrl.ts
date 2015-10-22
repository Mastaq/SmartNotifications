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
			"Consts",
			"$http"
        ];

		constructor(
			private $scope: ICtrlScope<AppLoadCtrl>,
			private colorService: SPColorService,
			private pleaseWait: PleaseWaitService,
			private spservice: SPService,
			private $log: ng.ILogService,
			private toastr: Toastr,
			private consts: Constants,
			private $http: ng.IHttpService) {

            $scope.vm = this;

			this.pleaseWait.start(colorService.getSuiteBarBackground());
			this.colorService.applyBackgrounds();

			spservice.getSettings().then((appSettings) => {
				//first run, the app is not inited yet
				if (appSettings == null) {
					this.spservice.createHostLibrary().then((library) => {
						this.uploadFiles(library);
					}, this.onError)
					.finally(() => {
						this.pleaseWait.close();
					});
				} else {
					this.pleaseWait.close();
				}
			}, (err: SPListRepo.RequestError) => {
				this.onError(err);
				this.pleaseWait.close();
			});
		}

		private onError(err: SPListRepo.RequestError) {
			this.$log.error(err.message);
			this.$log.error(err.stackTrace);

			this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 10000 });
		}

		private uploadFiles(library: SP.List) {
			this.$http.get("./../HostWeb/Sample.txt")
				.success(data => {
					this.spservice.uploadFileToHostLibrary("Sample.txt", <string>data, library.get_rootFolder())
						.then(() => {
							this.toastr.success("Uploaded!");
						});
				})
				.catch(this.onError);
		}
    }

    angular.module("SN.app.controllers").controller("AppLoadCtrl", AppLoadCtrl);
}