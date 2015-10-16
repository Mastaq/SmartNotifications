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
    function VendorsFactory($window) {
        return {
            $: $window.jQuery
        };
    }
    SN.VendorsFactory = VendorsFactory;
    VendorsFactory.$inject = ["$window"];
    angular.module("SN.app.services").factory("VendorsFactory", VendorsFactory);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var HomeCtrl = (function () {
        function HomeCtrl($scope, $http, $window, $timeout) {
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            this.$timeout = $timeout;
            $scope.vm = this;
        }
        HomeCtrl.$inject = [
            "$scope",
            "$http",
            "$window",
            "$timeout"
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
        function ChromeNavCtrl($scope, context, pleaseWait, colorService, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.context = context;
            this.pleaseWait = pleaseWait;
            this.colorService = colorService;
            this.$timeout = $timeout;
            $scope.vm = this;
            this.hostUrl = this.context.hostUrl;
            this.hostTitle = this.context.hostTitle;
            this.appUrl = this.context.appUrl;
            this.pleaseWait.start(colorService.getSuiteBarBackground());
            this.colorService.applyBackgrounds();
            $timeout(function () {
                _this.pleaseWait.close();
            }, 3000);
        }
        ChromeNavCtrl.$inject = [
            "$scope",
            "ContextService",
            "PleaseWaitService",
            "SPColorService",
            "$timeout"
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
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var PleaseWaitService = (function () {
        function PleaseWaitService($window) {
            this.$window = $window;
            this.wait = null;
        }
        PleaseWaitService.prototype.start = function (color) {
            this.wait = this.$window.pleaseWait({
                logo: "../Images/AppIcon.png",
                backgroundColor: color,
                loadingHtml: String.format("<div class='ms-core-pageTitle'>Smart Notifications App</div>" +
                    "<div class='spinner'>" +
                    "<div class='bounce1 ms-topBar'></div>" +
                    "<div class='bounce2 ms-topBar'></div>" +
                    "<div class='bounce3 ms-topBar'></div>" +
                    "</div>")
            });
        };
        PleaseWaitService.prototype.close = function () {
            if (this.wait != null) {
                this.wait.finish();
            }
        };
        PleaseWaitService.$inject = [
            "$window"
        ];
        return PleaseWaitService;
    })();
    SN.PleaseWaitService = PleaseWaitService;
    angular.module("SN.app.services").service("PleaseWaitService", PleaseWaitService);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var SPColorService = (function () {
        function SPColorService(vendorsFactory) {
            this.wait = null;
            this.$ = vendorsFactory.$;
        }
        SPColorService.prototype.getElementBackground = function (selector) {
            return this.$(selector).css("background-color");
        };
        SPColorService.prototype.getSuiteBarBackground = function () {
            return this.getElementBackground("#suiteBarLeft");
        };
        SPColorService.prototype.applyBackgrounds = function () {
            var background = this.getElementBackground(".ms-rteTable-1 tr.ms-rteTableHeaderRow-1");
            this.$("head").append(String.format("<style type='text/css'>#eeh-navigation-page-wrapper, .eeh-navigation-sidebar {{background-color:{0};}} </style>", background));
        };
        SPColorService.$inject = [
            "VendorsFactory"
        ];
        return SPColorService;
    })();
    SN.SPColorService = SPColorService;
    angular.module("SN.app.services").service("SPColorService", SPColorService);
})(SN || (SN = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="app.ts" />
/// <reference path="model/Context.ts" />
/// <reference path="factories/VendorsFactory.ts" />
/// <reference path="controllers/HomeCtrl.ts" />
/// <reference path="controllers/ChromeNavCtrl.ts" />
/// <reference path="controllers/SideNavCtrl.ts" />
/// <reference path="interfaces/ICtrlScope.ts" />
/// <reference path="services/ContextService.ts" />
/// <reference path="services/PleaseWaitService.ts" />
/// <reference path="services/SPColorService.ts" />

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyIsIm1vZGVsL0NvbnRleHQudHMiLCJmYWN0b3JpZXMvVmVuZG9yc0ZhY3RvcnkudHMiLCJjb250cm9sbGVycy9Ib21lQ3RybC50cyIsImNvbnRyb2xsZXJzL0Nocm9tZU5hdkN0cmwudHMiLCJjb250cm9sbGVycy9TaWRlTmF2Q3RybC50cyIsImludGVyZmFjZXMvSUN0cmxTY29wZS50cyIsInNlcnZpY2VzL0NvbnRleHRTZXJ2aWNlLnRzIiwic2VydmljZXMvUGxlYXNlV2FpdFNlcnZpY2UudHMiLCJzZXJ2aWNlcy9TUENvbG9yU2VydmljZS50cyIsIl9yZWZlcmVuY2VzLnRzIl0sIm5hbWVzIjpbIlNOIiwiU04uQ29udGV4dCIsIlNOLkNvbnRleHQuY29uc3RydWN0b3IiLCJTTi5WZW5kb3JzRmFjdG9yeSIsIlNOLkhvbWVDdHJsIiwiU04uSG9tZUN0cmwuY29uc3RydWN0b3IiLCJTTi5DaHJvbWVOYXZDdHJsIiwiU04uQ2hyb21lTmF2Q3RybC5jb25zdHJ1Y3RvciIsIlNOLlNpZGVOYXZDdHJsIiwiU04uU2lkZU5hdkN0cmwuY29uc3RydWN0b3IiLCJTTi5Db250ZXh0U2VydmljZSIsIlNOLkNvbnRleHRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0UGFyYW1ldGVyQnlOYW1lIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0V2ViVXJsIiwiU04uQ29udGV4dFNlcnZpY2UuZW5kc1dpdGgiLCJTTi5QbGVhc2VXYWl0U2VydmljZSIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uUGxlYXNlV2FpdFNlcnZpY2Uuc3RhcnQiLCJTTi5QbGVhc2VXYWl0U2VydmljZS5jbG9zZSIsIlNOLlNQQ29sb3JTZXJ2aWNlIiwiU04uU1BDb2xvclNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5TUENvbG9yU2VydmljZS5nZXRFbGVtZW50QmFja2dyb3VuZCIsIlNOLlNQQ29sb3JTZXJ2aWNlLmdldFN1aXRlQmFy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QUFDQSxDQUFDQTtBQUNuRkEsQ0FBQ0EsRUFqQ1MsRUFBRSxLQUFGLEVBQUUsUUFpQ1g7QUNuQ0EsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQTZCWDtBQTdCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1ZBO1FBUUZtQix3QkFDQ0EsY0FBbUNBO1lBSjVCQyxTQUFJQSxHQUFRQSxJQUFJQSxDQUFDQTtZQUt4QkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLENBQUNBO1FBRVVELDZDQUFvQkEsR0FBNUJBLFVBQTZCQSxRQUFlQTtZQUM5Q0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtRQUM5Q0EsQ0FBQ0E7UUFFTUYsOENBQXFCQSxHQUE1QkE7WUFDQ0csTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtRQUNuREEsQ0FBQ0E7UUFFR0gseUNBQWdCQSxHQUF2QkE7WUFDQ0ksSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSwwQ0FBMENBLENBQUNBLENBQUNBO1lBQ3ZGQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxpSEFBaUhBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO1FBQ3JLQSxDQUFDQTtRQXZCWUosc0JBQU9BLEdBQUdBO1lBQ2JBLGdCQUFnQkE7U0FDbkJBLENBQUNBO1FBc0JOQSxxQkFBQ0E7SUFBREEsQ0F6QkFuQixBQXlCQ21CLElBQUFuQjtJQXpCWUEsaUJBQWNBLGlCQXlCMUJBLENBQUFBO0lBRUpBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxjQUFjQSxDQUFDQSxDQUFDQTtBQUM3RUEsQ0FBQ0EsRUE3QlMsRUFBRSxLQUFGLEVBQUUsUUE2Qlg7QUMvQkMsK0NBQStDO0FBR2pELCtCQUErQjtBQUcvQix5Q0FBeUM7QUFHekMsb0RBQW9EO0FBSXBELGdEQUFnRDtBQUNoRCxxREFBcUQ7QUFDckQsbURBQW1EO0FBR25ELGlEQUFpRDtBQUdqRCxtREFBbUQ7QUFDbkQsc0RBQXNEO0FBQ3RELG1EQUFtRCIsImZpbGUiOiJzbi5hcHAuanMiLCJzb3VyY2VSb290IjoiLi4vbmcifQ==
