/// <reference path="_references.ts" />

namespace SN {
	export class ManageAppViewModel {
		hasPermissions = ko.observable(false);
		loaded = ko.observable(false);
		snEnabled = ko.observable(false);
		private customActionKey = "sn.app";
		constructor() {
			var context = SP.ClientContext.get_current();
			context.load(context.get_web(), "EffectiveBasePermissions");
			var hostActions = context.get_web().get_userCustomActions();
			context.load(hostActions);
			context.executeQueryAsync(() => {
				var enumerator = hostActions.getEnumerator();
				var resolved = false;
				while (enumerator.moveNext()) {
					var action = enumerator.get_current();
					if (action.get_name() === this.customActionKey) {
						resolved = true;
					}
				}

				this.snEnabled(resolved);
				this.loaded(true);
				this.hasPermissions(context.get_web().get_effectiveBasePermissions().has(SP.PermissionKind.manageWeb));
			}, (s, e) => {
				alert(e.get_message());
			});
		}

		toggleState() {
			this.snEnabled() ? this.addScriptLink() : this.removeScriptLink();
			return true;
		}

		private removeScriptLink() {
			var context = SP.ClientContext.get_current();
			var hostActions = context.get_web().get_userCustomActions();
			context.load(hostActions);

			context.executeQueryAsync(() => {
				var enumerator = hostActions.getEnumerator();
				var actionToDelete: SP.UserCustomAction = null;
				while (enumerator.moveNext()) {
					var action = enumerator.get_current();
					if (action.get_name() === this.customActionKey) {
						actionToDelete = action;
						break;
					}
				}
				if (actionToDelete != null) {
					actionToDelete.deleteObject();
				}

				context.executeQueryAsync(() => {
					var notify = SP.UI.Notify.addNotification("Smart Notifications switched OFF", true);
					setTimeout(() => {
						SP.UI.Notify.removeNotification(notify);
					}, 2 * 1000);
				}, (s, e) => {
					alert(e.get_message());
				});

			}, (s, e) => {
				alert(e.get_message());
			});
		}

		private addScriptLink() {
			var context = SP.ClientContext.get_current();
			var userCustomAction = context.get_web().get_userCustomActions().add();
			userCustomAction.set_location("ScriptLink");
			userCustomAction.set_scriptSrc("~Site/SmartNotificationsAssets/sn.scriptlink.js");
			userCustomAction.set_sequence(9);
			userCustomAction.set_title("Smart Notifications");
			userCustomAction.set_description("Smart Notifications App");
			userCustomAction.set_name(this.customActionKey);
			userCustomAction.update();

			context.executeQueryAsync(() => {
				var notify = SP.UI.Notify.addNotification("Smart Notifications switched ON", true);
				setTimeout(() => {
					SP.UI.Notify.removeNotification(notify);
				}, 2 * 1000);
			}, (s, e) => {
				alert(e.get_message());
			});
		}
	}
}