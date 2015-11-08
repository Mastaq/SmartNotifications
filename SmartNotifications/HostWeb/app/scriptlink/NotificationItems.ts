/// <reference path="_references.ts" />

namespace SN {
	export class NotificationItems {
		notifications: KnockoutObservableArray<Notification>;
		key: string;
		rgba: string;
		isHovering: KnockoutObservable<boolean> = ko.observable(false);
		boxShadow: string;

		constructor() {
			this.notifications = ko.observableArray([]);
		}

		onAfterRender(data: NotificationItems) {
			for (var i = 0; i < data.notifications().length; i++) {
				data.notifications()[i].active(false);
			}
			var firstNotification = data.notifications()[0];
			firstNotification.active(true);
		}

		dismiss(notification: Notification) {
			var activeNotification = this.getActiveNotification();
			var index = this.notifications.indexOf(activeNotification);
			if (this.notifications().length > 1) {
				this.go("next");
			} else {
				(<SP.UI.ModalDialog>(<any>SP.UI.ModalDialog).get_childDialog()).close(SP.UI.DialogResult.OK);
			}
			this.notifications.splice(index, 1);
			this.notifications.valueHasMutated();
		}

		go(direction: string) {
			var activeNotification = this.getActiveNotification();
			direction === "prev" ? this.goPrev(activeNotification) : this.goNext(activeNotification);

			(<SP.UI.ModalDialog>(<any>SP.UI.ModalDialog).get_childDialog()).autoSize();
		}

		private goNext(activeNotification: Notification) {
			var index = this.notifications.indexOf(activeNotification);
			var newIndex = 0;

			if (index !== this.notifications().length - 1) {
				newIndex = index + 1;
			}

			activeNotification.active(false);
			var nextNotification = this.notifications()[newIndex];
			nextNotification.active(true);
		}

		private goPrev(activeNotification: Notification) {
			var index = this.notifications.indexOf(activeNotification);
			var newIndex = this.notifications().length - 1;

			if (index !== 0) {
				newIndex = index - 1;
			}

			activeNotification.active(false);
			var nextNotification = this.notifications()[newIndex];
			nextNotification.active(true);
		}

		private getActiveNotification(): Notification {
			return this.notifications().filter((notification) => {
				return notification.active();
			})[0];
		}
	}
}