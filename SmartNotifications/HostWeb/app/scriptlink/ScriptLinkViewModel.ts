/// <reference path="_references.ts" />

namespace SN {
	export class ScriptLinkViewModel {

		grouppedNotifications: KnockoutObservableArray<NotificationItems>;

		constructor() {
			this.grouppedNotifications = ko.observableArray([]);
			setTimeout(() => {
				var notifications = Notification.getStubNotifications();
				var uniqueColors: string[] = [];
				for (let i = 0; i < notifications.length; i++) {
					if (uniqueColors.indexOf(notifications[i].color) === -1) {
						uniqueColors.push(notifications[i].color);
					}
				}

				for (let i = 0; i < uniqueColors.length; i++) {
					var notificationItem = new NotificationItems();
					ko.utils.arrayPushAll<Notification>(notificationItem.notifications, this.getNotificationsByColor(uniqueColors[i], notifications));
					notificationItem.notifications.valueHasMutated();
					notificationItem.key = uniqueColors[i];
					notificationItem.rgba = this.hexToRgb(uniqueColors[i]);
					notificationItem.boxShadow = String.format("0 0 5px {0}", uniqueColors[i]);

					this.grouppedNotifications().push(notificationItem);
				}

				this.grouppedNotifications.valueHasMutated();

			}, 300);
		}

		showNotifications(notification: NotificationItems) {
			var el = jQuery("#sn-notify-modal").clone().appendTo("#sn-notify-modal");
			SP.UI.ModalDialog.showModalDialog({
				title: "Notifications",
				html: el[0],
				autoSize: true
			});

			el.show();
			
			ko.applyBindings(notification, el[0]);

			var dlg = <SP.UI.ModalDialog>(<any>SP.UI.ModalDialog).get_childDialog();
			if (dlg) {
				dlg.autoSize();
			}
		}
		
		private getNotificationsByColor(color: string, notifications: Notification[]): Notification[] {
			return notifications.filter((notification) => {
				return notification.color === color;
			});
		}

		private hexToRgb(hex: string) {
			var bigint = parseInt(hex.substring(1, hex.length), 16);
			var r = (bigint >> 16) & 255;
			var g = (bigint >> 8) & 255;
			var b = bigint & 255;

			return String.format("rgba({0},{1},{2},0.7)", r, g, b);
		}
	}
}