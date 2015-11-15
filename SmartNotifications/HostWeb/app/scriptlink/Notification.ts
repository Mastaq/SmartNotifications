/// <reference path="_references.ts" />

namespace SNScriptLink {
	export class Notification {
		color: string;
		text: string;
		dismissable: boolean;
		id: number;
		title: string = "";
		active: KnockoutObservable<boolean> = ko.observable<boolean>(false);
	}
}