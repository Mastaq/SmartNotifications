/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    "use strict";
    angular.module("SN.app.controllers", []);
    angular.module("SN.app.directives", []);
    angular.module("SN.app.services", []);
    angular.module("SN.app", ["SN.app.controllers", "eehNavigation", "ui.bootstrap", "ui.router", "ui.select", "ngSanitize"])
        .config(["$urlRouterProvider", "$stateProvider", "$translateProvider", "eehNavigationProvider",
        function ($urlRouterProvider, $stateProvider, $translateProvider, eehNavigationProvider) {
            $translateProvider.useSanitizeValueStrategy("sanitize");
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("home", {
                url: "/",
                templateUrl: "../App/templates/home.html",
                controller: "WelcomeCtrl"
            })
                .state("sitecreation", {
                url: "/sitecreation",
                templateUrl: "App/templates/site.creation.html",
                controller: "SiteCreationCtrl"
            }).state("sitecreationprogress", {
                url: "/sitecreationprogress",
                templateUrl: "App/templates/site.creation.progress.html",
                controller: "SiteCreationProgressCtrl"
            });
            eehNavigationProvider
                .menuItem("TopNav.home", {
                text: "Smart Notifications App",
                weight: -1,
                state: "home"
            });
            eehNavigationProvider
                .menuItem("SideNav.home", {
                text: "Home",
                iconClass: "glyphicon-home",
                state: "home",
                weight: 1
            })
                .menuItem("SideNav.diveder1", {
                isDivider: true,
                weight: 2
            })
                .menuItem("SideNav.appSettings", {
                text: "Application Parameters",
                iconClass: "glyphicon-th-list",
                target: "_blank",
                href: "#",
                weight: 4
            })
                .menuItem("SideNav.permissionSettings", {
                text: "Permissions Settings",
                iconClass: "glyphicon-lock",
                target: "_blank",
                href: "#",
                weight: 5
            })
                .menuItem("SideNav.sitecreation", {
                text: "Site Creation",
                iconClass: "glyphicon-wrench",
                state: "sitecreation",
                weight: 6
            });
        }]);
})(SN || (SN = {}));
