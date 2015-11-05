/// <reference path="_references.ts" />

namespace SN {
	export class ManageAppViewModel {
		hasPermissions = ko.observable(false);
		loaded = ko.observable(false);
		constructor() {
			var context = SP.ClientContext.get_current();
			context.load(context.get_web(), "EffectiveBasePermissions");
			this.hasPermissions(false);
			context.executeQueryAsync(() => {
				this.loaded(true);
				this.hasPermissions(context.get_web().get_effectiveBasePermissions().has(SP.PermissionKind.manageWeb));
			}, (s, e) => {
				alert(e.get_message());
			});
		}
	}
}