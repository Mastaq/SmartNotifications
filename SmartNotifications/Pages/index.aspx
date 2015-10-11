<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
	<meta name="WebPartPageExpansion" content="full"/>
	<link rel="stylesheet" type="text/css" href="../App/build/sn.app.external.css?v=1.0.0.0"/>
	<link rel="stylesheet" type="text/css" href="../App/build/sn.app.css?v=1.0.0.0"/>
</asp:content>

<asp:content contentplaceholderid="PlaceHolderPageTitleInTitleArea" runat="server">
    Smart Notifications App
</asp:content>

<asp:content contentplaceholderid="PlaceHolderMain" runat="server">
	<div id="sn-app" ng-app="SN.app">
		<div>
			<eeh-navigation-navbar menu-name="'TopNav'"></eeh-navigation-navbar>
			<eeh-navigation-sidebar menu-name="'SideNav'">
				<ui-view></ui-view>
			</eeh-navigation-sidebar>
		</div>
	</div>

	<script type="text/javascript" src="../App/build/sn.app.external.js?v=1.0.0.0"></script>
	<script type="text/javascript" src="../App/build/app.js?v=1.0.0.0"></script>
	<script type="text/javascript" src="../App/build/sn.app.js?v=1.0.0.0"></script>
</asp:content>