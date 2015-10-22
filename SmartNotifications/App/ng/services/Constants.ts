/// <reference path="../_references.ts" />

namespace SN {
	export class Constants {
		static get Default(): Constants {
			return {
				HostLibraryUrl: "SmartNotificationsAssets",
				HostLibraryTitle: "Smart Notifications Assets",
				AppSettingsKey: "AppSettings",
				WentWrong: "Something went wrong....",
				ContactDev: "Try again and if the problem still exists contact app developer"
			}
		}

		HostLibraryUrl: string;
		HostLibraryTitle: string;
		AppSettingsKey: string;
		WentWrong: string;
		ContactDev: string;
	}

	angular.module("SN.app.services").constant("Consts", Constants.Default);
}