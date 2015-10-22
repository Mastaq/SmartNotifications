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
    angular.module("SN.app", ["SN.app.controllers", "SN.app.directives", "SN.app.services", "eehNavigation", "ui.bootstrap", "ui.router", "ui.select", "ngSanitize", "toastr", "ngAnimate"])
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
        }])
        .config(["$logProvider", function ($logProvider) {
            $logProvider.debugEnabled(window.SN.debug);
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
        function AppLoadCtrl($scope, colorService, pleaseWait, spservice, $log, toastr, consts) {
            var _this = this;
            this.$scope = $scope;
            this.colorService = colorService;
            this.pleaseWait = pleaseWait;
            this.spservice = spservice;
            this.$log = $log;
            this.toastr = toastr;
            this.consts = consts;
            $scope.vm = this;
            this.pleaseWait.start(colorService.getSuiteBarBackground());
            this.colorService.applyBackgrounds();
            spservice.getSettings().then(function (appSettings) {
                if (appSettings == null) {
                    _this.spservice.createLibrary().then(function (library) {
                    }, function (err) {
                        $log.error(err.message);
                        $log.error(err.stackTrace);
                        _this.toastr.error(_this.consts.ContactDev, _this.consts.WentWrong, { timeOut: 10000 });
                    })
                        .finally(function () {
                        _this.pleaseWait.close();
                    });
                }
                else {
                    _this.pleaseWait.close();
                }
            }, function (err) {
                $log.error(err.message);
                $log.error(err.stackTrace);
                _this.toastr.error(_this.consts.ContactDev, _this.consts.WentWrong, { timeOut: 10000 });
            });
        }
        AppLoadCtrl.$inject = [
            "$scope",
            "SPColorService",
            "PleaseWaitService",
            "SPService",
            "$log",
            "toastr",
            "Consts"
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
            this.debug = this.$window.SN.debug;
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
        function SPService(vendorsFactory, context, consts, $q) {
            this.context = context;
            this.consts = consts;
            this.$q = $q;
            this.wait = null;
            this.$ = vendorsFactory.$;
        }
        SPService.prototype.getSettings = function () {
            var dfd = this.$q.defer();
            var appSettingsRepo = new SN.AppSettingsRepository();
            appSettingsRepo.getSettingsByKey("")
                .done(function (data) {
                dfd.resolve(data);
            })
                .fail(function (err) {
                dfd.reject(err);
            });
            return dfd.promise;
        };
        SPService.prototype.createLibrary = function () {
            var _this = this;
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            var factory = new SP.ProxyWebRequestExecutorFactory(this.context.appUrl);
            context.set_webRequestExecutorFactory(factory);
            var hostContext = new SP.AppContextSite(context, this.context.hostUrl);
            var hostWeb = hostContext.get_web();
            var library = hostWeb.get_lists().getByTitle(this.consts.HostLibraryTitle);
            context.load(library);
            context.executeQueryAsync(function () {
                dfd.resolve(library);
            }, function (sender, args) {
                if (args.get_errorTypeName() === "System.ArgumentException") {
                    var listInfo = new SP.ListCreationInformation();
                    listInfo.set_quickLaunchOption(SP.QuickLaunchOptions.off);
                    listInfo.set_url(_this.consts.HostLibraryUrl);
                    listInfo.set_title(_this.consts.HostLibraryTitle);
                    listInfo.set_templateType(101);
                    listInfo.set_templateFeatureId(new SP.Guid("00bfea71-e717-4e80-aa17-d0c71b360101"));
                    var newLibrary = hostWeb.get_lists().add(listInfo);
                    context.load(newLibrary);
                    context.executeQueryAsync(function () {
                        dfd.resolve(newLibrary);
                    }, function (sender, args) {
                        dfd.reject(new SPListRepo.RequestError(args));
                    });
                }
                else {
                    dfd.reject(args.get_message());
                }
            });
            return dfd.promise;
        };
        SPService.$inject = [
            "VendorsFactory",
            "ContextService",
            "Consts",
            "$q"
        ];
        return SPService;
    })();
    SN.SPService = SPService;
    angular.module("SN.app.services").service("SPService", SPService);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var Constants = (function () {
        function Constants() {
        }
        Object.defineProperty(Constants, "Default", {
            get: function () {
                return {
                    HostLibraryUrl: "SmartNotificationsAssets",
                    HostLibraryTitle: "Smart Notifications Assets",
                    AppSettingsKey: "AppSettings",
                    WentWrong: "Something went wrong....",
                    ContactDev: "Try again and if the problem still exists contact app developer"
                };
            },
            enumerable: true,
            configurable: true
        });
        return Constants;
    })();
    SN.Constants = Constants;
    angular.module("SN.app.services").constant("Consts", Constants.Default);
})(SN || (SN = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="repositories/AppSettingsRepository.ts" />
/// <reference path="common/Fields.ts" />
/// <reference path="app.ts" />
/// <reference path="model/Context.ts" />
/// <reference path="model/AppSettings.ts" />
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
/// <reference path="services/Constants.ts" />

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy9BcHBTZXR0aW5nc1JlcG9zaXRvcnkudHMiLCJjb21tb24vRmllbGRzLnRzIiwiYXBwLnRzIiwibW9kZWwvQ29udGV4dC50cyIsIm1vZGVsL0FwcFNldHRpbmdzLnRzIiwiZmFjdG9yaWVzL1ZlbmRvcnNGYWN0b3J5LnRzIiwiY29udHJvbGxlcnMvSG9tZUN0cmwudHMiLCJjb250cm9sbGVycy9DaHJvbWVOYXZDdHJsLnRzIiwiY29udHJvbGxlcnMvU2lkZU5hdkN0cmwudHMiLCJjb250cm9sbGVycy9BcHBMb2FkQ3RybC50cyIsImludGVyZmFjZXMvSUN0cmxTY29wZS50cyIsInNlcnZpY2VzL0NvbnRleHRTZXJ2aWNlLnRzIiwic2VydmljZXMvUGxlYXNlV2FpdFNlcnZpY2UudHMiLCJzZXJ2aWNlcy9TUENvbG9yU2VydmljZS50cyIsInNlcnZpY2VzL1NQU2VydmljZS50cyIsInNlcnZpY2VzL0NvbnN0YW50cy50cyIsIl9yZWZlcmVuY2VzLnRzIl0sIm5hbWVzIjpbIlNOIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5IiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5LmNvbnN0cnVjdG9yIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5LmdldFNldHRpbmdzQnlLZXkiLCJTTi5GaWVsZHMiLCJTTi5Db250ZXh0IiwiU04uQ29udGV4dC5jb25zdHJ1Y3RvciIsIlNOLkFwcFNldHRpbmdzQmFzZUl0ZW0iLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtLmNvbnN0cnVjdG9yIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5tYXBGcm9tTGlzdEl0ZW0iLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtLm1hcFRvTGlzdEl0ZW0iLCJTTi5WZW5kb3JzRmFjdG9yeSIsIlNOLkhvbWVDdHJsIiwiU04uSG9tZUN0cmwuY29uc3RydWN0b3IiLCJTTi5DaHJvbWVOYXZDdHJsIiwiU04uQ2hyb21lTmF2Q3RybC5jb25zdHJ1Y3RvciIsIlNOLlNpZGVOYXZDdHJsIiwiU04uU2lkZU5hdkN0cmwuY29uc3RydWN0b3IiLCJTTi5BcHBMb2FkQ3RybCIsIlNOLkFwcExvYWRDdHJsLmNvbnN0cnVjdG9yIiwiU04uQ29udGV4dFNlcnZpY2UiLCJTTi5Db250ZXh0U2VydmljZS5jb25zdHJ1Y3RvciIsIlNOLkNvbnRleHRTZXJ2aWNlLmdldFBhcmFtZXRlckJ5TmFtZSIsIlNOLkNvbnRleHRTZXJ2aWNlLmdldFdlYlVybCIsIlNOLkNvbnRleHRTZXJ2aWNlLmVuZHNXaXRoIiwiU04uUGxlYXNlV2FpdFNlcnZpY2UiLCJTTi5QbGVhc2VXYWl0U2VydmljZS5jb25zdHJ1Y3RvciIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlLnN0YXJ0IiwiU04uUGxlYXNlV2FpdFNlcnZpY2UuY2xvc2UiLCJTTi5TUENvbG9yU2VydmljZSIsIlNOLlNQQ29sb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uU1BDb2xvclNlcnZpY2UuZ2V0RWxlbWVudEJhY2tncm91bmQiLCJTTi5TUENvbG9yU2VydmljZS5nZXRTdWl0ZUJhckJhY2tncm91bmQiLCJTTi5TUENvbG9yU2VydmljZS5hcHBseUJhY2tncm91bmRzIiwiU04uU1BTZXJ2aWNlIiwiU04uU1BTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uU1BTZXJ2aWNlLmdldFNldHRpbmdzIiwiU04uU1BTZXJ2aWNlLmNyZWF0ZUxpYnJhcnkiLCJTTi5Db25zdGFudHMiLCJTTi5Db25zdGFudHMuY29uc3RydWN0b3IiLCJTTi5Db25zdGFudHMuRGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUMsMENBQTBDOzs7Ozs7QUFFM0MsSUFBVSxFQUFFLENBaUJYO0FBakJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFBMkNDLHlDQUE4Q0E7UUFFeEZBLCtCQUFZQSxFQUFZQTtZQUN2QkMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1JBLGtCQUFNQSxFQUFFQSxFQUFFQSxzQkFBbUJBLENBQUNBLENBQUNBO1lBQ2hD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
