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
				WebPartTemplate: "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
				"<WebPart xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://schemas.microsoft.com/WebPart/v2\">	" +
					"<Title>Manage Smart Notifications</Title>" +
					"<FrameType>Default</FrameType>	" +
					"<Description>Manage Smart Notifications</Description>" +
					"<IsIncluded>true</IsIncluded>" +
					"<ZoneID></ZoneID>" +
					"<PartOrder>0</PartOrder>" +
					"<FrameState>Normal</FrameState>" +
					"<Height />" +
					"<Width />" +
					"<AllowRemove>true</AllowRemove>" +
					"<AllowZoneChange>true</AllowZoneChange>" +
					"<AllowMinimize>true</AllowMinimize>" +
					"<AllowConnect>true</AllowConnect>" +
					"<AllowEdit>true</AllowEdit>" +
					"<AllowHide>true</AllowHide>" +
					"<IsVisible>true</IsVisible>" +
					"<DetailLink />" +
					"<HelpLink />" +
					"<HelpMode>Modeless</HelpMode>" +
					"<Dir>Default</Dir>" +
					"<PartImageSmall />" +
					"<MissingAssembly>Cannot import this Web Part.</MissingAssembly>" +
					"<PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>" +
					"<IsIncludedFilter />" +
					"<Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>" +
					"<TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>" +
					"<ContentLink xmlns=\"http://schemas.microsoft.com/WebPart/v2/ContentEditor\" />" +
					"<Content xmlns=\"http://schemas.microsoft.com/WebPart/v2/ContentEditor\" >" +
					"	<![CDATA[" +
							"<div id=\"sn-manage-app\" class=\"sn-app-bootstrap\" data-bind=\"template: {name: 'sn-manage-app-tmpl'}\">Prepairing....</div>" +
							"<style>.ms-listviewtable, .ms-InlineSearch-DivBaseline, .ms-list-addnew{display:none;}</style>" +
							"<script type=\"text/javascript\" src=\"../sn.manage.host.js\"></script>" +
						"]]></Content>" +
					"<PartStorage xmlns=\"http://schemas.microsoft.com/WebPart/v2/ContentEditor\" />" +
				"</WebPart>"
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