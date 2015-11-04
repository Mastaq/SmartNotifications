/// <reference path="../_references.ts" />

namespace SN {
	export class Constants {
		static get Default(): Constants {
			return {
				HostLibraryUrl: "SmartNotificationsAssets",
				HostLibraryTitle: "Smart Notifications Assets",
				AppSettingsKey: "AppSettings",
				WentWrong: "Something went wrong....",
				ContactDev: "Try again and if the problem still exists contact app developer",
				SettingsKey: "appsettings",
				ScriptLinkId: "sn.app",
				HostPageName: "sn.html",
				HostPageFolderUrl: "SmartNotificationsHost",
				ManageAppView: "ManageApp"
			}
		}

		HostLibraryUrl: string;
		HostLibraryTitle: string;
		AppSettingsKey: string;
		WentWrong: string;
		ContactDev: string;
		SettingsKey: string;
		ScriptLinkId: string;
		HostPageName: string;
		HostPageFolderUrl: string;
		ManageAppView: string;
	}

	angular.module("SN.app.services").constant("Consts", Constants.Default);
}