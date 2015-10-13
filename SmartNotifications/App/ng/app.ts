/// <reference path="../_references.ts" />

namespace SN {
	"use strict";

	angular.module("SN.app.controllers", ["SN.app.services"]);
	angular.module("SN.app.directives", []);
	angular.module("SN.app.services", []);

	angular.module("SN.app", ["SN.app.controllers", "eehNavigation", "ui.bootstrap", "ui.router", "ui.select", "ngSanitize"])
		.config(["$urlRouterProvider", "$stateProvider", "$translateProvider", "eehNavigationProvider",
			($urlRouterProvider: angular.ui.IUrlRouterProvider, $stateProvider: angular.ui.IStateProvider, $translateProvider: angular.translate.ITranslateProvider, eehNavigationProvider: any) => {

				$translateProvider.useSanitizeValueStrategy("sanitize");

				$urlRouterProvider.otherwise("/");

				$stateProvider
					.state("home", {
						url: "/",
						templateUrl: "../App/templates/home.html",
						controller: "HomeCtrl"
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
						text: "[Host customization status]",
						iconClass: "glyphicon-th-list",
						target: "_blank",
						href: "#"
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
					.menuItem("SideNav.permissions", {
						text: "[Permissions]",
						iconClass: "glyphicon-th-list",
						target: "_blank",
						href: "#"
					})
					.menuItem("SideNav.updates", {
						text: "[Updates]",
						iconClass: "glyphicon-th-list",
						target: "_blank",
						href: "#"
					})
					.menuItem("SideNav.checkNotification", {
						text: "[Check notification]",
						iconClass: "glyphicon-th-list",
						target: "_blank",
						href: "#"
					});
			}]);



}