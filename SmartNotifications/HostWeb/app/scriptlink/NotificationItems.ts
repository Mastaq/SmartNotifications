/// <reference path="_references.ts" />

namespace SN {
	export class NotificationItems {
		notifications: Notification[];
		key: string;
		rgba: string;
		isHovering: KnockoutObservable<boolean> = ko.observable(false);
		boxShadow: string;
	}
}