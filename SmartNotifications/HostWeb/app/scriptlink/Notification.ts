/// <reference path="_references.ts" />

namespace SN {
	export class Notification {
		color: string;
		text: string;
		dismissable: boolean;
		title: string = "";
		active: KnockoutObservable<boolean> = ko.observable<boolean>(false);

		static getStubNotifications(): Notification[] {
			var notifications: Notification[] = [];

			var n1 = new Notification();
			n1.color = "#FF0E0E";
			n1.text = "Some super important message";
			n1.dismissable = true;
			n1.title = "Some cool title";

			var n2 = new Notification();
			n2.color = "#0072C6";
			n2.text = "Some super important message";
			n2.dismissable = false;

			var n3 = new Notification();
			n3.color = "#059630";
			n3.text = "Some super important message";
			n3.dismissable = true;

			var n4 = new Notification();
			n4.color = "#680EFF";
			n4.text = "<h1>Some super important message</h1><br><div><b>This message</b> <br> is very important!</div>";
			n4.dismissable = true;
			n4.title = "Really cool title goes here";

			var n5 = new Notification();
			n5.color = "#680EFF";
			n5.text = "<h1>Some super important message</h1><br><div><b>Hello</b> from message</div>";
			n5.dismissable = false;

			var n6 = new Notification();
			n6.color = "#680EFF";
			n6.text = "<h1>WOW</h1><br><div><b>Hello</b> from message</div>";
			n6.dismissable = true;

			var n7 = new Notification();
			n7.color = "#680EFF";
			n7.text = "<h1>Happy birthday!!!!</h1><br><div><b>Hello</b> from message</div>";
			n7.dismissable = true;

			notifications.push(n1, n2, n3, n4, n5, n6, n7);

			return notifications;
		}
	}
}