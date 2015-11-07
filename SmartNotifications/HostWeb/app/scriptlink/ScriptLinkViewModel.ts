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
					notificationItem.notifications = this.getNotificationsByColor(uniqueColors[i], notifications);
					notificationItem.key = uniqueColors[i];
					notificationItem.rgba = this.hexToRgb(uniqueColors[i]);
					notificationItem.boxShadow = String.format("0 0 5px {0}", uniqueColors[i]);

					this.grouppedNotifications().push(notificationItem);
				}

				this.grouppedNotifications.valueHasMutated();

			}, 2 * 1000);
		}

		logMouseOver(data) {
			console.log(data);
			console.log("over");
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