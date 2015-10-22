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
        function AppLoadCtrl($scope, colorService, pleaseWait, spservice, $log, toastr, consts, $http) {
            var _this = this;
            this.$scope = $scope;
            this.colorService = colorService;
            this.pleaseWait = pleaseWait;
            this.spservice = spservice;
            this.$log = $log;
            this.toastr = toastr;
            this.consts = consts;
            this.$http = $http;
            $scope.vm = this;
            this.pleaseWait.start(colorService.getSuiteBarBackground());
            this.colorService.applyBackgrounds();
            spservice.getSettings().then(function (appSettings) {
                if (appSettings == null) {
                    _this.spservice.createHostLibrary().then(function (library) {
                        _this.uploadFiles(library);
                    }, _this.onError)
                        .finally(function () {
                        _this.pleaseWait.close();
                    });
                }
                else {
                    _this.pleaseWait.close();
                }
            }, function (err) {
                _this.onError(err);
                _this.pleaseWait.close();
            });
        }
        AppLoadCtrl.prototype.onError = function (err) {
            this.$log.error(err.message);
            this.$log.error(err.stackTrace);
            this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 10000 });
        };
        AppLoadCtrl.prototype.uploadFiles = function (library) {
            var _this = this;
            this.$http.get("./../HostWeb/Sample.txt")
                .success(function (data) {
                _this.spservice.uploadFileToHostLibrary("Sample.txt", data, library.get_rootFolder())
                    .then(function () {
                    _this.toastr.success("Uploaded!");
                });
            })
                .catch(this.onError);
        };
        AppLoadCtrl.$inject = [
            "$scope",
            "SPColorService",
            "PleaseWaitService",
            "SPService",
            "$log",
            "toastr",
            "Consts",
            "$http"
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
        SPService.prototype.uploadFileToHostLibrary = function (url, content, folder, overwrite) {
            if (overwrite === void 0) { overwrite = true; }
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            var factory = new SP.ProxyWebRequestExecutorFactory(this.context.appUrl);
            context.set_webRequestExecutorFactory(factory);
            var hostContext = new SP.AppContextSite(context, this.context.hostUrl);
            var fileCreateInfo = new SP.FileCreationInformation();
            fileCreateInfo.set_url(url);
            fileCreateInfo.set_overwrite(overwrite);
            fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
            for (var i = 0; i < content.length; i++) {
                fileCreateInfo.get_content().append(content.charCodeAt(i));
            }
            var newFile = hostContext.get_web().getFolderByServerRelativeUrl(folder.get_serverRelativeUrl()).get_files().add(fileCreateInfo);
            context.load(newFile);
            context.executeQueryAsync(function () {
                dfd.resolve();
            }, function (sender, args) {
                dfd.reject(new SPListRepo.RequestError(args));
            });
            return dfd.promise;
        };
        SPService.prototype.createHostLibrary = function () {
            var _this = this;
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            var factory = new SP.ProxyWebRequestExecutorFactory(this.context.appUrl);
            context.set_webRequestExecutorFactory(factory);
            var hostContext = new SP.AppContextSite(context, this.context.hostUrl);
            var hostWeb = hostContext.get_web();
            var library = hostWeb.get_lists().getByTitle(this.consts.HostLibraryTitle);
            context.load(library, "RootFolder", "Title");
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
                    context.load(newLibrary, "RootFolder", "Title");
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy9BcHBTZXR0aW5nc1JlcG9zaXRvcnkudHMiLCJjb21tb24vRmllbGRzLnRzIiwiYXBwLnRzIiwibW9kZWwvQ29udGV4dC50cyIsIm1vZGVsL0FwcFNldHRpbmdzLnRzIiwiZmFjdG9yaWVzL1ZlbmRvcnNGYWN0b3J5LnRzIiwiY29udHJvbGxlcnMvSG9tZUN0cmwudHMiLCJjb250cm9sbGVycy9DaHJvbWVOYXZDdHJsLnRzIiwiY29udHJvbGxlcnMvU2lkZU5hdkN0cmwudHMiLCJjb250cm9sbGVycy9BcHBMb2FkQ3RybC50cyIsImludGVyZmFjZXMvSUN0cmxTY29wZS50cyIsInNlcnZpY2VzL0NvbnRleHRTZXJ2aWNlLnRzIiwic2VydmljZXMvUGxlYXNlV2FpdFNlcnZpY2UudHMiLCJzZXJ2aWNlcy9TUENvbG9yU2VydmljZS50cyIsInNlcnZpY2VzL1NQU2VydmljZS50cyIsInNlcnZpY2VzL0NvbnN0YW50cy50cyIsIl9yZWZlcmVuY2VzLnRzIl0sIm5hbWVzIjpbIlNOIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5IiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5LmNvbnN0cnVjdG9yIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5LmdldFNldHRpbmdzQnlLZXkiLCJTTi5GaWVsZHMiLCJTTi5Db250ZXh0IiwiU04uQ29udGV4dC5jb25zdHJ1Y3RvciIsIlNOLkFwcFNldHRpbmdzQmFzZUl0ZW0iLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtLmNvbnN0cnVjdG9yIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5tYXBGcm9tTGlzdEl0ZW0iLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtLm1hcFRvTGlzdEl0ZW0iLCJTTi5WZW5kb3JzRmFjdG9yeSIsIlNOLkhvbWVDdHJsIiwiU04uSG9tZUN0cmwuY29uc3RydWN0b3IiLCJTTi5DaHJvbWVOYXZDdHJsIiwiU04uQ2hyb21lTmF2Q3RybC5jb25zdHJ1Y3RvciIsIlNOLlNpZGVOYXZDdHJsIiwiU04uU2lkZU5hdkN0cmwuY29uc3RydWN0b3IiLCJTTi5BcHBMb2FkQ3RybCIsIlNOLkFwcExvYWRDdHJsLmNvbnN0cnVjdG9yIiwiU04uQXBwTG9hZEN0cmwub25FcnJvciIsIlNOLkFwcExvYWRDdHJsLnVwbG9hZEZpbGVzIiwiU04uQ29udGV4dFNlcnZpY2UiLCJTTi5Db250ZXh0U2VydmljZS5jb25zdHJ1Y3RvciIsIlNOLkNvbnRleHRTZXJ2aWNlLmdldFBhcmFtZXRlckJ5TmFtZSIsIlNOLkNvbnRleHRTZXJ2aWNlLmdldFdlYlVybCIsIlNOLkNvbnRleHRTZXJ2aWNlLmVuZHNXaXRoIiwiU04uUGxlYXNlV2FpdFNlcnZpY2UiLCJTTi5QbGVhc2VXYWl0U2VydmljZS5jb25zdHJ1Y3RvciIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlLnN0YXJ0IiwiU04uUGxlYXNlV2FpdFNlcnZpY2UuY2xvc2UiLCJTTi5TUENvbG9yU2VydmljZSIsIlNOLlNQQ29sb3JTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uU1BDb2xvclNlcnZpY2UuZ2V0RWxlbWVudEJhY2tncm91bmQiLCJTTi5TUENvbG9yU2VydmljZS5nZXRTdWl0ZUJhckJhY2tncm91bmQiLCJTTi5TUENvbG9yU2VydmljZS5hcHBseUJhY2tncm91bmRzIiwiU04uU1BTZXJ2aWNlIiwiU04uU1BTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uU1BTZXJ2aWNlLmdldFNldHRpbmdzIiwiU04uU1BTZXJ2aWNlLnVwbG9hZEZpbGVUb0hvc3RMaWJyYXJ5IiwiU04uU1BTZXJ2aWNlLmNyZWF0ZUhvc3RMaWJyYXJ5IiwiU04uQ29uc3RhbnRzIiwiU04uQ29uc3RhbnRzLmNvbnN0cnVjdG9yIiwiU04uQ29uc3RhbnRzLkRlZmF1bHQiXSwibWFwcGluZ3MiOiJBQUFDLDBDQUEwQzs7Ozs7O0FBRTNDLElBQVUsRUFBRSxDQWlCWDtBQWpCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQTJDQyx5Q0FBOENBO1FBRXhGQSwrQkFBWUEsRUFBWUE7WUFD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
