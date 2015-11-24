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
				HostPageFolderUrl: "SmartNotificationsHost",
				ManageAppView: "ManageApp",
				ScriptingDisabledError: `
					The error indicates that scripting capabilities are disabled for this site.<br>
					To Smart Notifications functioning correctly you need to <b>turn on scripting capabilities.</b><br>
					Use <a href='https://support.office.com/en-sg/article/Turn-scripting-capabilities-on-or-off-1f2c515f-5d7e-448a-9fd7-835da935584f?ui=en-US&rs=en-SG&ad=SG' target='_blank'>this link</a> to read more about scripting capabilities feature.`,
				WebPartTemplate: "<webParts>  " +
					"<webPart xmlns=\"http://schemas.microsoft.com/WebPart/v3\">    " +
						"<metaData>      " +
							"<type name=\"Microsoft.SharePoint.WebPartPages.ScriptEditorWebPart, Microsoft.SharePoint, Version={0}.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c\" />      " +
							"<importErrorMessage>Cannot import this Web Part.</importErrorMessage>    " +
						"</metaData>   " +
						"<data>      " +
							"<properties>        " +
								"<property name=\"ExportMode\" type=\"exportmode\">All</property>        " +
								"<property name=\"HelpUrl\" type=\"string\" />        " +
								"<property name=\"Hidden\" type=\"bool\">False</property>        " +
								"<property name=\"Description\" type=\"string\">Allows authors to insert HTML snippets or scripts.</property>        " +
								"<property name=\"Content\" type=\"string\" />        " +
								"<property name=\"CatalogIconImageUrl\" type=\"string\" />        " +
								"<property name=\"Title\" type=\"string\">Script Editor</property>        " +
								"<property name=\"AllowHide\" type=\"bool\">True</property>        " +
								"<property name=\"AllowMinimize\" type=\"bool\">True</property>        " +
								"<property name=\"AllowZoneChange\" type=\"bool\">True</property>        " +
								"<property name=\"TitleUrl\" type=\"string\" />        " +
								"<property name=\"ChromeType\" type=\"chrometype\">None</property>        " +
								"<property name=\"AllowConnect\" type=\"bool\">True</property>        " +
								"<property name=\"Width\" type=\"unit\" />        " +
								"<property name=\"Height\" type=\"unit\" />        " +
								"<property name=\"HelpMode\" type=\"helpmode\">Navigate</property>        " +
								"<property name=\"AllowEdit\" type=\"bool\">True</property>        " +
								"<property name=\"TitleIconImageUrl\" type=\"string\" />        " +
								"<property name=\"Direction\" type=\"direction\">NotSet</property>        " +
								"<property name=\"AllowClose\" type=\"bool\">True</property>        " +
								"<property name=\"ChromeState\" type=\"chromestate\">Normal</property>      " +
							"</properties>    " +
						"</data>  " +
						"</webPart>" +
					"</webParts>"
			}
		}

		HostLibraryUrl: string;
		HostLibraryTitle: string;
		AppSettingsKey: string;
		WentWrong: string;
		ContactDev: string;
		SettingsKey: string;
		ScriptLinkId: string;
		HostPageFolderUrl: string;
		ManageAppView: string;
		WebPartTemplate: string;
		ScriptingDisabledError: string;
	}

	angular.module("SN.app.services").constant("Consts", Constants.Default);
}