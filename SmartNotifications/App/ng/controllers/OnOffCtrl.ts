/// <reference path="../_references.ts" />

namespace SN {
	export class OnOffCtrl {

		static $inject = [
			"$scope",
			"SPService",
			"$log",
			"toastr",
			"Consts",
			"ContextService"
        ];

		private onStatus = "\"Switched On\"";
		private offStatus = "\"Switched Off\"";
		status: string;
		manageStatus: string;

		constructor(
			private $scope: ICtrlScope<OnOffCtrl>,
			private spservice: SPService,
			private $log: ng.ILogService,
			private toastr: Toastr,
			private consts: Constants,
			private context: ContextService) {

			$scope.vm = this;

			//this.manageStatus = SPListRepo.Helper.ensureTrailingSlash(this.context.hostUrl) + this.consts.HostLibraryUrl + "/" + this.consts.HostPageName;
			this.manageStatus = SPListRepo.Helper.ensureTrailingSlash(this.context.hostUrl) + "test/my.html";

			spservice.getHostCustomizationStatus()
				.then(customized => {
					this.status = customized ? this.onStatus : this.offStatus;
				}, this.onError);
		}

		private onError(err: SPListRepo.RequestError | any) {
			if (err instanceof SPListRepo.RequestError) {
				this.$log.error(err.message);
				this.$log.error(err.stackTrace);
			} else {
				this.$log.error(err);
			}
			this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 10000 });
		}
	}

	angular.module("SN.app.controllers").controller("OnOffCtrl", OnOffCtrl);

}