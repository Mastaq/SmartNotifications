/// <reference path="_references.ts" />

namespace SN {
	"use strict";

	angular.module("SN.app.controllers", ["SN.app.services"]);
	angular.module("SN.app.directives", []);
	angular.module("SN.app.services", []);

	angular.module("SN.app", ["SN.app.controllers", "SN.app.directives", "SN.app.services", "eehNavigation", "ui.bootstrap", "ui.router", "ui.select", "ngSanitize", "toastr", "ngAnimate"])
		.config(["$urlRouterProvider", "$stateProvider", "$translateProvider", "eehNavigationProvider",
			($urlRouterProvider: angular.ui.IUrlRouterProvider,
				$stateProvider: angular.ui.IStateProvider,
				$translateProvider: angular.translate.ITranslateProvider,
				eehNavigationProvider: any) => {

				$translateProvider.useSanitizeValueStrategy("sanitize");

				$urlRouterProvider.otherwise("/");

				$stateProvider
					.state("home", {
						url: "/",
						templateUrl: "../App/templates/home.html",
						controller: "HomeCtrl"
					})
					.state("onoff", {
						url: "/onoff",
						templateUrl: "../App/templates/onoff.html",
						controller: "OnOffCtrl"
					})
					.state("contactdev", {
						url: "/contactdev",
						templateUrl: "../App/templates/contactdev.html",
						controller: "ContactDevCtrl"
					})
					.state("activate", {
						url: "/activate",
						templateUrl: "../App/templates/activate.html",
						controller: "ActivateCtrl"
					});

				eehNavigationProvider
					.menuItem("SideNav.home", {
						text: "Home",
						iconClass: "glyphicon-home",
						state: "home"
					})
					.menuItem("SideNav.host", {
						text: " ",
						iconClass: "fa fa-sitemap",
						target: "_blank",
						href: "#"
					})
					.menuItem("SideNav.customizationStatus", {
						text: "Switch On\\Off",
						iconClass: "fa fa-cog",
						state: "onoff"
					})
					.menuItem("SideNav.allNotifications", {
						text: "All Notifications",
						iconClass: "glyphicon-th-list",
						target: "_blank",
						href: "#"
					})
					.menuItem("SideNav.addNotification", {
						text: "Add New Notification",
						iconClass: "glyphicon-plus",
						target: "_blank",
						href: "#"
					})
					.menuItem("SideNav.contactDev", {
						text: "Contact Developer",
						iconClass: "fa fa-envelope",
						state:"contactdev"
					})
					.menuItem("SideNav.activate", {
						text: "Activate the app",
						iconClass: "fa fa-key",
						state: "activate"
					});
			}])
		.config(["$logProvider", ($logProvider: ng.ILogProvider) => {
			var globalDebug = (<any>window).SN.debug;
			var queryStringDebug = window.location.search.indexOf("isdebug=1") !== -1;
			$logProvider.debugEnabled(globalDebug || queryStringDebug);
		}]);
}