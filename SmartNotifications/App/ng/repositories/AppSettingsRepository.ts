/// <reference path="../_references.ts" />

namespace SN {
	export class AppSettingsRepository extends SPListRepo.ListRepository<AppSettingsBaseItem>{
		constructor();
		constructor(id?: SP.Guid) {
			if (id) {
				super(id, AppSettingsBaseItem);
			} else {
				super("AppSettings", AppSettingsBaseItem);
			}
		}

		public getSettingsByKey(key: string): JQueryPromise<AppSettingsBaseItem> {
			var camlExpression = CamlBuilder.Expression().TextField(Fields.Key).EqualTo(key);

			return this._getItemByExpression(camlExpression);
		}
	}
}
