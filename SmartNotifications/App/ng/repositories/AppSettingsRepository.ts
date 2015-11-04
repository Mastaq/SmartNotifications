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

		protected _createDeferred<T>(): SPListRepo.IDeferred<T> {
			
			return new SPListRepo.ngDeferred<T>();
		}

		public getSettingsByKey(key: string): ng.IPromise<AppSettingsBaseItem> {
			var camlExpression = CamlBuilder.Expression().TextField(Fields.Key).EqualTo(key);

			return <ng.IPromise<AppSettingsBaseItem>>this._getItemByExpression(camlExpression).getUnderlyingPromise();
		}
	}
}
