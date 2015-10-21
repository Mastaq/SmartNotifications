/// <reference path="../_references.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SN;
(function (SN) {
    var AppSettingsRepository = (function (_super) {
        __extends(AppSettingsRepository, _super);
        function AppSettingsRepository(id) {
            if (id) {
                _super.call(this, id, SN.AppSettingsBaseItem);
            }
            else {
                _super.call(this, "AppSettings", SN.AppSettingsBaseItem);
            }
        }
        AppSettingsRepository.prototype.getSettingsByKey = function (key) {
            var camlExpression = CamlBuilder.Expression().TextField(SN.Fields.Key).EqualTo(key);
            return this._getItemByExpression(camlExpression);
        };
        return AppSettingsRepository;
    })(SPListRepo.ListRepository);
    SN.AppSettingsRepository = AppSettingsRepository;
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var Fields;
    (function (Fields) {
        Fields.Key = "Key_SN";
        Fields.Value = "Value_SN";
    })(Fields = SN.Fields || (SN.Fields = {}));
})(SN || (SN = {}));
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
/// <reference path="../../lib/sp-list-repository/build/sp.list.repository.d.ts" />
var SN;
(function (SN) {
    var AppSettingsBaseItem = (function (_super) {
        __extends(AppSettingsBaseItem, _super);
        function AppSettingsBaseItem(item) {
            _super.call(this, item);
            if (item) {
                this.mapFromListItem(item);
            }
        }
        AppSettingsBaseItem.prototype.mapFromListItem = function (item) {
            _super.prototype.mapFromListItem.call(this, item);
            this.value_SN = this.getFieldValue("Value_SN");
            this.key_SN = this.getFieldValue("Key_SN");
            this.contentType = this.getFieldValue("ContentType");
            this._UIVersionString = this.getFieldValue("_UIVersionString");
            this.edit = this.getFieldValue("Edit");
            this.linkTitleNoMenu = this.getFieldValue("LinkTitleNoMenu");
            this.linkTitle = this.getFieldValue("LinkTitle");
            this.docIcon = this.getFieldValue("DocIcon");
            this.itemChildCount = this.getFieldValue("ItemChildCount");
            this.folderChildCount = this.getFieldValue("FolderChildCount");
            this.appAuthor = this.getFieldValue("AppAuthor");
            this.appEditor = this.getFieldValue("AppEditor");
        };
        AppSettingsBaseItem.prototype.mapToListItem = function (item) {
            _super.prototype.mapToListItem.call(this, item);
            this.setFieldValue(item, "Value_SN", this.value_SN);
            this.setFieldValue(item, "Key_SN", this.key_SN);
        };
        return AppSettingsBaseItem;
    })(SPListRepo.BaseListItem);
    SN.AppSettingsBaseItem = AppSettingsBaseItem;
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
/// <reference path="../../lib/sp-list-repository/build/sp.list.repository.d.ts" />
var SN;
(function (SN) {
    var NotificationsBaseItem = (function (_super) {
        __extends(NotificationsBaseItem, _super);
        function NotificationsBaseItem(item) {
            _super.call(this, item);
            if (item) {
                this.mapFromListItem(item);
            }
        }
        NotificationsBaseItem.prototype.mapFromListItem = function (item) {
            _super.prototype.mapFromListItem.call(this, item);
            this.message_SN = this.getFieldValue("Message_SN");
            this.from_SN = this.getFieldValue("From_SN");
            this.to_SN = this.getFieldValue("To_SN");
            this.assignedTo_SN = this.getFieldValue("AssignedTo_SN");
            this.dismissable_SN = this.getFieldValue("Dismissable_SN");
            this.color_SN = this.getFieldValue("Color_SN");
            this.contentType = this.getFieldValue("ContentType");
            this._UIVersionString = this.getFieldValue("_UIVersionString");
            this.edit = this.getFieldValue("Edit");
            this.linkTitleNoMenu = this.getFieldValue("LinkTitleNoMenu");
            this.linkTitle = this.getFieldValue("LinkTitle");
            this.docIcon = this.getFieldValue("DocIcon");
            this.itemChildCount = this.getFieldValue("ItemChildCount");
            this.folderChildCount = this.getFieldValue("FolderChildCount");
            this.appAuthor = this.getFieldValue("AppAuthor");
            this.appEditor = this.getFieldValue("AppEditor");
        };
        NotificationsBaseItem.prototype.mapToListItem = function (item) {
            _super.prototype.mapToListItem.call(this, item);
            this.setFieldValue(item, "Message_SN", this.message_SN);
            this.setFieldValue(item, "From_SN", this.from_SN);
            this.setFieldValue(item, "To_SN", this.to_SN);
            this.setFieldValue(item, "AssignedTo_SN", this.assignedTo_SN);
            this.setFieldValue(item, "Dismissable_SN", this.dismissable_SN);
            this.setFieldValue(item, "Color_SN", this.color_SN);
        };
        return NotificationsBaseItem;
    })(SPListRepo.BaseListItem);
    SN.NotificationsBaseItem = NotificationsBaseItem;
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
        function ChromeNavCtrl($scope, context, $timeout) {
            this.$scope = $scope;
            this.context = context;
            this.$timeout = $timeout;
            $scope.vm = this;
            this.hostUrl = this.context.hostUrl;
            this.hostTitle = this.context.hostTitle;
            this.appUrl = this.context.appUrl;
        }
        ChromeNavCtrl.$inject = [
            "$scope",
            "ContextService",
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
var SN;
(function (SN) {
    var AppLoadCtrl = (function () {
        function AppLoadCtrl($scope, $http, $window, $timeout, colorService, pleaseWait, spservice) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            this.$timeout = $timeout;
            this.colorService = colorService;
            this.pleaseWait = pleaseWait;
            this.spservice = spservice;
            $scope.vm = this;
            this.pleaseWait.start(colorService.getSuiteBarBackground());
            this.colorService.applyBackgrounds();
            spservice.getSettings().done(function (appSettings) {
                if (appSettings == null) {
                }
            });
            $timeout(function () {
                _this.pleaseWait.close();
            }, 3000);
        }
        AppLoadCtrl.$inject = [
            "$scope",
            "$http",
            "$window",
            "$timeout",
            "SPColorService",
            "PleaseWaitService",
            "SPService"
        ];
        return AppLoadCtrl;
    })();
    SN.AppLoadCtrl = AppLoadCtrl;
    angular.module("SN.app.controllers").controller("AppLoadCtrl", AppLoadCtrl);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
/// <reference path="../_references.ts" />
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
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var SPService = (function () {
        function SPService(vendorsFactory) {
            this.wait = null;
            this.$ = vendorsFactory.$;
        }
        SPService.prototype.getSettings = function () {
            var appSettingsRepo = new SN.AppSettingsRepository();
            return appSettingsRepo.getSettingsByKey("global");
        };
        SPService.$inject = [
            "VendorsFactory"
        ];
        return SPService;
    })();
    SN.SPService = SPService;
    angular.module("SN.app.services").service("SPService", SPService);
})(SN || (SN = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="repositories/AppSettingsRepository.ts" />
/// <reference path="common/Fields.ts" />
/// <reference path="app.ts" />
/// <reference path="model/Context.ts" />
/// <reference path="model/AppSettings.ts" />
/// <reference path="model/Notifications.ts" />
/// <reference path="factories/VendorsFactory.ts" />
/// <reference path="controllers/HomeCtrl.ts" />
/// <reference path="controllers/ChromeNavCtrl.ts" />
/// <reference path="controllers/SideNavCtrl.ts" />
/// <reference path="controllers/AppLoadCtrl.ts" />
/// <reference path="interfaces/ICtrlScope.ts" />
/// <reference path="services/ContextService.ts" />
/// <reference path="services/PleaseWaitService.ts" />
/// <reference path="services/SPColorService.ts" />
/// <reference path="services/SPService.ts" />

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy9BcHBTZXR0aW5nc1JlcG9zaXRvcnkudHMiLCJjb21tb24vRmllbGRzLnRzIiwiYXBwLnRzIiwibW9kZWwvQ29udGV4dC50cyIsIm1vZGVsL0FwcFNldHRpbmdzLnRzIiwibW9kZWwvTm90aWZpY2F0aW9ucy50cyIsImZhY3Rvcmllcy9WZW5kb3JzRmFjdG9yeS50cyIsImNvbnRyb2xsZXJzL0hvbWVDdHJsLnRzIiwiY29udHJvbGxlcnMvQ2hyb21lTmF2Q3RybC50cyIsImNvbnRyb2xsZXJzL1NpZGVOYXZDdHJsLnRzIiwiY29udHJvbGxlcnMvQXBwTG9hZEN0cmwudHMiLCJpbnRlcmZhY2VzL0lDdHJsU2NvcGUudHMiLCJzZXJ2aWNlcy9Db250ZXh0U2VydmljZS50cyIsInNlcnZpY2VzL1BsZWFzZVdhaXRTZXJ2aWNlLnRzIiwic2VydmljZXMvU1BDb2xvclNlcnZpY2UudHMiLCJzZXJ2aWNlcy9TUFNlcnZpY2UudHMiLCJfcmVmZXJlbmNlcy50cyJdLCJuYW1lcyI6WyJTTiIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeSIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeS5jb25zdHJ1Y3RvciIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeS5nZXRTZXR0aW5nc0J5S2V5IiwiU04uRmllbGRzIiwiU04uQ29udGV4dCIsIlNOLkNvbnRleHQuY29uc3RydWN0b3IiLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5jb25zdHJ1Y3RvciIsIlNOLkFwcFNldHRpbmdzQmFzZUl0ZW0ubWFwRnJvbUxpc3RJdGVtIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5tYXBUb0xpc3RJdGVtIiwiU04uTm90aWZpY2F0aW9uc0Jhc2VJdGVtIiwiU04uTm90aWZpY2F0aW9uc0Jhc2VJdGVtLmNvbnN0cnVjdG9yIiwiU04uTm90aWZpY2F0aW9uc0Jhc2VJdGVtLm1hcEZyb21MaXN0SXRlbSIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbS5tYXBUb0xpc3RJdGVtIiwiU04uVmVuZG9yc0ZhY3RvcnkiLCJTTi5Ib21lQ3RybCIsIlNOLkhvbWVDdHJsLmNvbnN0cnVjdG9yIiwiU04uQ2hyb21lTmF2Q3RybCIsIlNOLkNocm9tZU5hdkN0cmwuY29uc3RydWN0b3IiLCJTTi5TaWRlTmF2Q3RybCIsIlNOLlNpZGVOYXZDdHJsLmNvbnN0cnVjdG9yIiwiU04uQXBwTG9hZEN0cmwiLCJTTi5BcHBMb2FkQ3RybC5jb25zdHJ1Y3RvciIsIlNOLkNvbnRleHRTZXJ2aWNlIiwiU04uQ29udGV4dFNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5Db250ZXh0U2VydmljZS5nZXRQYXJhbWV0ZXJCeU5hbWUiLCJTTi5Db250ZXh0U2VydmljZS5nZXRXZWJVcmwiLCJTTi5Db250ZXh0U2VydmljZS5lbmRzV2l0aCIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlIiwiU04uUGxlYXNlV2FpdFNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5QbGVhc2VXYWl0U2VydmljZS5zdGFydCIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlLmNsb3NlIiwiU04uU1BDb2xvclNlcnZpY2UiLCJTTi5TUENvbG9yU2VydmljZS5jb25zdHJ1Y3RvciIsIlNOLlNQQ29sb3JTZXJ2aWNlLmdldEVsZW1lbnRCYWNrZ3JvdW5kIiwiU04uU1BDb2xvclNlcnZpY2UuZ2V0U3VpdGVCYXJCYWNrZ3JvdW5kIiwiU04uU1BDb2xvclNlcnZpY2UuYXBwbHlCYWNrZ3JvdW5kcyIsIlNOLlNQU2VydmljZSIsIlNOLlNQU2VydmljZS5jb25zdHJ1Y3RvciIsIlNOLlNQU2VydmljZS5nZXRTZXR0aW5ncyJdLCJtYXBwaW5ncyI6IkFBQUMsMENBQTBDOzs7Ozs7QUFFM0MsSUFBVSxFQUFFLENBaUJYO0FBakJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFBMkNDLHlDQUE4Q0E7UUFFeEZBLCtCQUFZQSxFQUFZQTtZQUN2QkMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0Es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
