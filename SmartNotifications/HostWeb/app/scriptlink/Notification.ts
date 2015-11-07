/// <reference path="_references.ts" />

namespace SN {
	export class Notification {
		color: string;
		text: string;
		dismissable: boolean;

		static getStubNotifications(): Notification[] {
			var notifications: Notification[] = [];

			var n1 = new Notification();
			n1.color = "#FF0E0E";
			n1.text = "Some super important message";
			n1.dismissable = true;

			var n2 = new Notification();
			n2.color = "#0E2EFF";
			n2.text = "Some super important message";
			n2.dismissable = false;

			var n3 = new Notification();
			n3.color = "#059630";
			n3.text = "Some super important message";
			n3.dismissable = true;

			var n4 = new Notification();
			n4.color = "#680EFF";
			n4.text = "Some super important message";
			n4.dismissable = true;

			var n5 = new Notification();
			n5.color = "#680EFF";
			n5.text = "Some super important message";
			n5.dismissable = false;

			notifications.push(n1, n2, n3, n4, n5);

			return notifications;
		}
	}
}