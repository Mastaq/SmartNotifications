/// <reference path="_references.ts" />
var SN;
(function (SN) {
    "use strict";
    angular.module("SN.app.controllers", ["SN.app.services"]);
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
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var Context = (function () {
        function Context() {
        }
        return Context;
    })();
    SN.Context = Context;
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var HomeCtrl = (function () {
        function HomeCtrl($scope, $http, $window) {
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            $scope.vm = this;
            this.info = "123";
        }
        HomeCtrl.$inject = [
            "$scope",
            "$http",
            "$window"
        ];
        return HomeCtrl;
    })();
    SN.HomeCtrl = HomeCtrl;
    angular.module("SN.app.controllers").controller("HomeCtrl", HomeCtrl);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var ChromeNavCtrl = (function () {
        function ChromeNavCtrl($scope, context) {
            this.$scope = $scope;
            this.context = context;
            $scope.vm = this;
            this.hostUrl = this.context.hostUrl;
            this.hostTitle = this.context.hostTitle;
            this.appUrl = this.context.appUrl;
        }
        ChromeNavCtrl.$inject = [
            "$scope",
            "ContextService"
        ];
        return ChromeNavCtrl;
    })();
    SN.ChromeNavCtrl = ChromeNavCtrl;
    angular.module("SN.app.controllers").controller("ChromeNavCtrl", ChromeNavCtrl);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var SideNavCtrl = (function () {
        function SideNavCtrl($scope, eehNavigation, context) {
            this.$scope = $scope;
            this.eehNavigation = eehNavigation;
            this.context = context;
            $scope.vm = this;
            this.eehNavigation.menuItem("SideNav.allNotifications").href = context.appUrl + "Notifications";
            this.eehNavigation.menuItem("SideNav.addNotification").href = context.appUrl + "Notifications/NewForm.aspx";
            this.eehNavigation.menuItem("SideNav.host").href = context.hostUrl;
            this.eehNavigation.menuItem("SideNav.host").text = context.hostTitle;
        }
        SideNavCtrl.$inject = [
            "$scope",
            "eehNavigation",
            "ContextService"
        ];
        return SideNavCtrl;
    })();
    SN.SideNavCtrl = SideNavCtrl;
    angular.module("SN.app.controllers").controller("SideNavCtrl", SideNavCtrl);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
/// <reference path="../_references.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SN;
(function (SN) {
    var ContextService = (function (_super) {
        __extends(ContextService, _super);
        function ContextService($window, $location) {
            _super.call(this);
            this.$window = $window;
            this.$location = $location;
            this.appLeafUrl = this.$window.SN.appUrl;
            this.version = this.$window.SN.version;
            this.appUrl = this.$location.absUrl().substr(0, this.$location.absUrl().indexOf(this.appLeafUrl) + this.appLeafUrl.length + 1);
            this.hostTitle = this.getParameterByName("HostTitle");
            this.hostUrl = this.getParameterByName("SPHostUrl");
        }
        ContextService.prototype.getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
        ContextService.prototype.getWebUrl = function (key) {
            var webUrl = this.getParameterByName(key);
            return this.endsWith(webUrl, "/") ? webUrl : webUrl + "/";
        };
        ContextService.prototype.endsWith = function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        };
        ContextService.$inject = [
            "$window",
            "$location"
        ];
        return ContextService;
    })(SN.Context);
    SN.ContextService = ContextService;
    angular.module("SN.app.services").service("ContextService", ContextService);
})(SN || (SN = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="app.ts" />
/// <reference path="model/Context.ts" />
/// <reference path="controllers/HomeCtrl.ts" />
/// <reference path="controllers/ChromeNavCtrl.ts" />
/// <reference path="controllers/SideNavCtrl.ts" />
/// <reference path="interfaces/ICtrlScope.ts" />
/// <reference path="services/ContextService.ts" /> 

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyIsIm1vZGVsL0NvbnRleHQudHMiLCJjb250cm9sbGVycy9Ib21lQ3RybC50cyIsImNvbnRyb2xsZXJzL0Nocm9tZU5hdkN0cmwudHMiLCJjb250cm9sbGVycy9TaWRlTmF2Q3RybC50cyIsImludGVyZmFjZXMvSUN0cmxTY29wZS50cyIsInNlcnZpY2VzL0NvbnRleHRTZXJ2aWNlLnRzIiwiX3JlZmVyZW5jZXMudHMiXSwibmFtZXMiOlsiU04iLCJTTi5Db250ZXh0IiwiU04uQ29udGV4dC5jb25zdHJ1Y3RvciIsIlNOLkhvbWVDdHJsIiwiU04uSG9tZUN0cmwuY29uc3RydWN0b3IiLCJTTi5DaHJvbWVOYXZDdHJsIiwiU04uQ2hyb21lTmF2Q3RybC5jb25zdHJ1Y3RvciIsIlNOLlNpZGVOYXZDdHJsIiwiU04uU2lkZU5hdkN0cmwuY29uc3RydWN0b3IiLCJTTi5Db250ZXh0U2VydmljZSIsIlNOLkNvbnRleHRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0UGFyYW1ldGVyQnlOYW1lIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0V2ViVXJsIiwiU04uQ29udGV4dFNlcnZpY2UuZW5kc1dpdGgiXSwibWFwcGluZ3MiOiJBQUFDLHVDQUF1QztBQUV4QyxJQUFVLEVBQUUsQ0EyRVg7QUEzRUQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNiQSxZQUFZQSxDQUFDQTtJQUViQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDMURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLG1CQUFtQkEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDeENBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFFdENBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLG9CQUFvQkEs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
