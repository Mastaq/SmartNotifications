/// <reference path="../_references.ts" />

namespace SN {
    export class SPService {
        static $inject = [
            "VendorsFactory"
        ];

		private wait: any = null;
		private $: JQueryStatic;

		constructor(
			vendorsFactory: { $: JQueryStatic }) {
			this.$ = vendorsFactory.$;
		}

		public getSettings(): JQueryPromise<AppSettingsBaseItem> {
			var appSettingsRepo = new AppSettingsRepository();

			return appSettingsRepo.getSettingsByKey("global");
		}
    }

	angular.module("SN.app.services").service("SPService", SPService);
}