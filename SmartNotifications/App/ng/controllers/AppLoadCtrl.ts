/// <reference path="../_references.ts" />

namespace SN {

	enum ErrorTypes {
		NoPermissions,
		AppAlreadyInited
	}

	interface IError { customError: boolean, type: ErrorTypes }

    export class AppLoadCtrl {
        static $inject = [
			"$scope",
			"SPColorService",
			"PleaseWaitService",
			"SPService",
			"$log",
			"toastr",
			"Consts",
			"$http",
			"$q",
			"ContextService",
			"$state"
        ];

		hasPermissions = false;
		permissionChecked = false;
		trialExpired = false;
		underTrial = false;
		licenseNotValid = false;
		licensed = false;
		daysLeft = 0;

		private trialPeriodInDays = 30;

		constructor(
			private $scope: ICtrlScope<AppLoadCtrl>,
			private colorService: SPColorService,
			private pleaseWait: PleaseWaitService,
			private spservice: SPService,
			private $log: ng.ILogService,
			private toastr: Toastr,
			private consts: Constants,
			private $http: ng.IHttpService,
			private $q: ng.IQService,
			private context: ContextService,
			private $state: angular.ui.IStateService) {

            $scope.vm = this;

			this.pleaseWait.start(colorService.getSuiteBarBackground());
			this.colorService.applyBackgrounds();

			spservice.doesUserHaveFullControl()
				.then(hasFullControl => {
					this.hasPermissions = hasFullControl;
					if (!hasFullControl) {
						var dfd = this.$q.defer();
						dfd.reject(<IError>{ customError: true, type: ErrorTypes.NoPermissions });
						return dfd.promise;
					}
					return spservice.settingsRepo.getSettingsByKey(this.consts.SettingsKey);
				})
				.then((appSettings) => {
					//first run, the app is not inited yet
					if (appSettings == null) {
						return this.spservice.createHostLibrary();

					} else {
						var dfd = this.$q.defer();
						dfd.reject(<IError>{ customError: true, type: ErrorTypes.AppAlreadyInited });
						return dfd.promise;
					}
				})
				.then(library => {
					return this.spservice.uploadFiles(library.get_rootFolder());
				})
				.then(() => {
					var settings = new CommonAppSettings();
					settings.version = this.context.version;
					settings.licensed = false;
					settings.invalidLicense = false;
					settings.trial = true;
					settings.installationDate = new Date();
					var appSettingsModel = new AppSettingsBaseItem();
					appSettingsModel.key_SN = this.consts.AppSettingsKey;
					appSettingsModel.value_SN = LZString.compressToBase64(JSON.stringify(settings));
					return this.spservice.settingsRepo.saveItem(appSettingsModel).getUnderlyingPromise();
				})
				.catch(err => {
					if (err instanceof SPListRepo.RequestError) {
						this.onError(err);
					} else if (!err.customError) {
						this.onError(err);
					}
				})
				.finally(() => {
					this.pleaseWait.close();
					this.permissionChecked = true;

					this.loadLicense();
				});
		}

		go(state: string) {
			this.$state.go(state);
		}

		private loadLicense() {
			this.spservice.settingsRepo.getSettingsByKey(this.consts.SettingsKey)
				.then(settings => {
					var appSettings = <CommonAppSettings>JSON.parse(LZString.decompressFromBase64(settings.value_SN));
					this.licenseNotValid = appSettings.invalidLicense;
					this.underTrial = appSettings.trial;
					this.licensed = appSettings.licensed;
					if (appSettings.trial) {
						var dateNow = moment();

						var dayDIff = dateNow.diff(moment(appSettings.installationDate), "days");

						if (dayDIff > this.trialPeriodInDays) {
							this.trialExpired = true;
							this.underTrial = false;
						} else {
							this.underTrial = true;
							this.daysLeft = this.trialPeriodInDays - dayDIff;
						}
					}

					this.$scope.$apply();
				});
		}

		private onError(err: SPListRepo.RequestError | any) {
			if (err instanceof SPListRepo.RequestError) {
				this.$log.error(err.message);
				this.$log.error(err.stackTrace);
				if ((<SPListRepo.RequestError>err).errorType === "System.UnauthorizedAccessException") {
					this.toastr.error(this.consts.ScriptingDisabledError, this.consts.WentWrong, <any>{ timeOut: 0, closeButton: true, allowHtml: true, extendedTimeOut: 0, tapToDismiss: false });
					return;
				}
			} else {
				this.$log.error(err);
			}
			this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 0 });
		}
    }

    angular.module("SN.app.controllers").controller("AppLoadCtrl", AppLoadCtrl);
}