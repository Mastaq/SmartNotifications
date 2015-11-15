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
					});
			}])
		.config(["$logProvider", ($logProvider: ng.ILogProvider) => {
			var globalDebug = (<any>window).SN.debug;
			var queryStringDebug = window.location.search.indexOf("isdebug=1") !== -1;
			$logProvider.debugEnabled(globalDebug || queryStringDebug);
		}]);
}