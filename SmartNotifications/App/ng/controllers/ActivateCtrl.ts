/// <reference path="../_references.ts" />

namespace SN {
    export class ActivateCtrl {
        static $inject = [
			"$scope",
            "SPService",
			"Consts",
			"toastr",
			"$timeout",
			"$window",
			"$log"
        ];

		licenseKey: string;
		private actualKey = "WJX2SWFUDthTgnCjb5fImmfmeLm9NiSFoSwqNplz";

		constructor(
			private $scope: ICtrlScope<ActivateCtrl>,
			private spservice: SPService,
			private consts: Constants,
			private toastr: Toastr,
			private $timeout: ng.ITimeoutService,
			private $window: ng.IWindowService,
			private $log: ng.ILogService) {

			$scope.vm = this;
		}

		activate() {
			if (!this.licenseKey) return;
			this.spservice.settingsRepo.getSettingsByKey(this.consts.SettingsKey)
				.then(settings => {
					var appSettings = <CommonAppSettings>JSON.parse(LZString.decompressFromBase64(settings.value_SN));

					if (this.actualKey === this.licenseKey) {
						appSettings.licensed = true;
						appSettings.trial = appSettings.invalidLicense = false;
					} else {
						appSettings.invalidLicense = true;
						appSettings.trial = appSettings.licensed = false;
					}
					settings.value_SN = LZString.compressToBase64(JSON.stringify(appSettings));
					return this.spservice.settingsRepo.saveItem(settings).getUnderlyingPromise();
				})
				.then(() => {
					this.toastr.success("", "License applied", { timeOut: 2000 });
					this.$timeout(() => {
						this.$window.location.reload();
					}, 1000);
				})
				.catch((err: SPListRepo.RequestError | any) => {
					if (err instanceof SPListRepo.RequestError) {
						this.$log.error(err.message);
						this.$log.error(err.stackTrace);
					} else {
						this.$log.error(err);
					}
					this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 0 });
				});
		}
    }

    angular.module("SN.app.controllers").controller("ActivateCtrl", ActivateCtrl);
}