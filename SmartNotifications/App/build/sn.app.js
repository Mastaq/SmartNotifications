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
        AppSettingsRepository.prototype._createDeferred = function () {
            return new SPListRepo.ngDeferred();
        };
        AppSettingsRepository.prototype.getSettingsByKey = function (key) {
            var camlExpression = CamlBuilder.Expression().TextField(SN.Fields.Key).EqualTo(key);
            return this._getItemByExpression(camlExpression).getUnderlyingPromise();
        };
        return AppSettingsRepository;
    })(SPListRepo.ListRepository);
    SN.AppSettingsRepository = AppSettingsRepository;
})(SN || (SN = {}));
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../lib/sp-list-repository/build/sp.list.repository.d.ts" />
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
                .menuItem("SideNav.addNotification", {
                text: "Add New Notification",
                iconClass: "glyphicon-plus",
                target: "_blank",
                href: "#"
            })
                .menuItem("SideNav.allNotifications", {
                text: "All Notifications",
                iconClass: "glyphicon-th-list",
                target: "_blank",
                href: "#"
            })
                .menuItem("SideNav.customizationStatus", {
                text: "Switch the app ON or OFF",
                iconClass: "fa fa-cog",
                state: "onoff"
            })
                .menuItem("SideNav.contactDev", {
                text: "Contact Developer",
                iconClass: "fa fa-envelope",
                state: "contactdev"
            })
                .menuItem("SideNav.activate", {
                text: "Activate the app",
                iconClass: "fa fa-key",
                state: "activate"
            });
        }])
        .config(["$logProvider", function ($logProvider) {
            var globalDebug = window.SN.debug;
            var queryStringDebug = window.location.search.indexOf("isdebug=1") !== -1;
            $logProvider.debugEnabled(globalDebug || queryStringDebug);
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
/// <reference path="../../../typings/tsd.d.ts" />
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
/// <reference path="../../../typings/tsd.d.ts" />
var SN;
(function (SN) {
    var CommonAppSettings = (function () {
        function CommonAppSettings() {
        }
        return CommonAppSettings;
    })();
    SN.CommonAppSettings = CommonAppSettings;
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
    var ErrorTypes;
    (function (ErrorTypes) {
        ErrorTypes[ErrorTypes["NoPermissions"] = 0] = "NoPermissions";
        ErrorTypes[ErrorTypes["AppAlreadyInited"] = 1] = "AppAlreadyInited";
    })(ErrorTypes || (ErrorTypes = {}));
    var AppLoadCtrl = (function () {
        function AppLoadCtrl($scope, colorService, pleaseWait, spservice, $log, toastr, consts, $http, $q, context, $state) {
            var _this = this;
            this.$scope = $scope;
            this.colorService = colorService;
            this.pleaseWait = pleaseWait;
            this.spservice = spservice;
            this.$log = $log;
            this.toastr = toastr;
            this.consts = consts;
            this.$http = $http;
            this.$q = $q;
            this.context = context;
            this.$state = $state;
            this.hasPermissions = false;
            this.permissionChecked = false;
            this.trialExpired = false;
            this.underTrial = false;
            this.licenseNotValid = false;
            this.licensed = false;
            this.daysLeft = 0;
            this.trialPeriodInDays = 30;
            $scope.vm = this;
            this.pleaseWait.start(colorService.getSuiteBarBackground());
            this.colorService.applyBackgrounds();
            spservice.doesUserHaveFullControl()
                .then(function (hasFullControl) {
                _this.hasPermissions = hasFullControl;
                if (!hasFullControl) {
                    var dfd = _this.$q.defer();
                    dfd.reject({ customError: true, type: ErrorTypes.NoPermissions });
                    return dfd.promise;
                }
                return spservice.settingsRepo.getSettingsByKey(_this.consts.SettingsKey);
            })
                .then(function (appSettings) {
                if (appSettings == null) {
                    return _this.spservice.createHostLibrary();
                }
                else {
                    var dfd = _this.$q.defer();
                    dfd.reject({ customError: true, type: ErrorTypes.AppAlreadyInited });
                    return dfd.promise;
                }
            })
                .then(function (library) {
                return _this.spservice.uploadFiles(library.get_rootFolder());
            })
                .then(function () {
                var settings = new SN.CommonAppSettings();
                settings.version = _this.context.version;
                settings.licensed = false;
                settings.invalidLicense = false;
                settings.trial = true;
                settings.installationDate = new Date();
                var appSettingsModel = new SN.AppSettingsBaseItem();
                appSettingsModel.key_SN = _this.consts.AppSettingsKey;
                appSettingsModel.value_SN = LZString.compressToBase64(JSON.stringify(settings));
                return _this.spservice.settingsRepo.saveItem(appSettingsModel).getUnderlyingPromise();
            })
                .catch(function (err) {
                if (err instanceof SPListRepo.RequestError) {
                    _this.onError(err);
                }
                else if (!err.customError) {
                    _this.onError(err);
                }
            })
                .finally(function () {
                _this.pleaseWait.close();
                _this.permissionChecked = true;
                _this.loadLicense();
            });
        }
        AppLoadCtrl.prototype.go = function (state) {
            this.$state.go(state);
        };
        AppLoadCtrl.prototype.loadLicense = function () {
            var _this = this;
            this.spservice.settingsRepo.getSettingsByKey(this.consts.SettingsKey)
                .then(function (settings) {
                var appSettings = JSON.parse(LZString.decompressFromBase64(settings.value_SN));
                _this.licenseNotValid = appSettings.invalidLicense;
                _this.underTrial = appSettings.trial;
                _this.licensed = appSettings.licensed;
                if (appSettings.trial) {
                    var dateNow = moment();
                    var dayDIff = dateNow.diff(moment(appSettings.installationDate), "days");
                    if (dayDIff > _this.trialPeriodInDays) {
                        _this.trialExpired = true;
                        _this.underTrial = false;
                    }
                    else {
                        _this.underTrial = true;
                        _this.daysLeft = _this.trialPeriodInDays - dayDIff;
                    }
                }
                _this.$scope.$apply();
            });
        };
        AppLoadCtrl.prototype.onError = function (err) {
            if (err instanceof SPListRepo.RequestError) {
                this.$log.error(err.message);
                this.$log.error(err.stackTrace);
                if (err.errorType === "System.UnauthorizedAccessException") {
                    this.toastr.error(this.consts.ScriptingDisabledError, this.consts.WentWrong, { timeOut: 0, closeButton: true, allowHtml: true, extendedTimeOut: 0, tapToDismiss: false });
                    return;
                }
            }
            else {
                this.$log.error(err);
            }
            this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 0 });
        };
        AppLoadCtrl.$inject = [
            "$scope",
            "SPColorService",
            "PleaseWaitService",
            "SPService",
            "$log",
            "toastr",
            "Consts",
            "$http",
            "$q",
            "ContextService",
            "$state"
        ];
        return AppLoadCtrl;
    })();
    SN.AppLoadCtrl = AppLoadCtrl;
    angular.module("SN.app.controllers").controller("AppLoadCtrl", AppLoadCtrl);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var OnOffCtrl = (function () {
        function OnOffCtrl($scope, spservice, $log, toastr, consts, context) {
            var _this = this;
            this.$scope = $scope;
            this.spservice = spservice;
            this.$log = $log;
            this.toastr = toastr;
            this.consts = consts;
            this.context = context;
            this.onStatus = "\"Switched On\"";
            this.offStatus = "\"Switched Off\"";
            $scope.vm = this;
            this.manageStatus = SPListRepo.Helper.ensureTrailingSlash(this.context.hostUrl) + this.consts.HostLibraryUrl + "/Forms/" + this.consts.ManageAppView + ".aspx";
            spservice.getHostCustomizationStatus()
                .then(function (customized) {
                _this.status = customized ? _this.onStatus : _this.offStatus;
            }, this.onError);
        }
        OnOffCtrl.prototype.onError = function (err) {
            if (err instanceof SPListRepo.RequestError) {
                this.$log.error(err.message);
                this.$log.error(err.stackTrace);
            }
            else {
                this.$log.error(err);
            }
            this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 10000 });
        };
        OnOffCtrl.$inject = [
            "$scope",
            "SPService",
            "$log",
            "toastr",
            "Consts",
            "ContextService"
        ];
        return OnOffCtrl;
    })();
    SN.OnOffCtrl = OnOffCtrl;
    angular.module("SN.app.controllers").controller("OnOffCtrl", OnOffCtrl);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var ContactDevCtrl = (function () {
        function ContactDevCtrl($scope, $http, $window, $timeout) {
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            this.$timeout = $timeout;
            $scope.vm = this;
        }
        ContactDevCtrl.$inject = [
            "$scope",
            "$http",
            "$window",
            "$timeout"
        ];
        return ContactDevCtrl;
    })();
    SN.ContactDevCtrl = ContactDevCtrl;
    angular.module("SN.app.controllers").controller("ContactDevCtrl", ContactDevCtrl);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var ActivateCtrl = (function () {
        function ActivateCtrl($scope, spservice, consts, toastr, $timeout, $window, $log) {
            this.$scope = $scope;
            this.spservice = spservice;
            this.consts = consts;
            this.toastr = toastr;
            this.$timeout = $timeout;
            this.$window = $window;
            this.$log = $log;
            this.actualKey = "WJX2SWFUDthTgnCjb5fImmfmeLm9NiSFoSwqNplz";
            $scope.vm = this;
        }
        ActivateCtrl.prototype.activate = function () {
            var _this = this;
            if (!this.licenseKey)
                return;
            this.spservice.settingsRepo.getSettingsByKey(this.consts.SettingsKey)
                .then(function (settings) {
                var appSettings = JSON.parse(LZString.decompressFromBase64(settings.value_SN));
                if (_this.actualKey === _this.licenseKey) {
                    appSettings.licensed = true;
                    appSettings.trial = appSettings.invalidLicense = false;
                }
                else {
                    appSettings.invalidLicense = true;
                    appSettings.trial = appSettings.licensed = false;
                }
                settings.value_SN = LZString.compressToBase64(JSON.stringify(appSettings));
                return _this.spservice.settingsRepo.saveItem(settings).getUnderlyingPromise();
            })
                .then(function () {
                _this.toastr.success("", "License applied", { timeOut: 2000 });
                _this.$timeout(function () {
                    _this.$window.location.reload();
                }, 1000);
            })
                .catch(function (err) {
                if (err instanceof SPListRepo.RequestError) {
                    _this.$log.error(err.message);
                    _this.$log.error(err.stackTrace);
                }
                else {
                    _this.$log.error(err);
                }
                _this.toastr.error(_this.consts.ContactDev, _this.consts.WentWrong, { timeOut: 0 });
            });
        };
        ActivateCtrl.$inject = [
            "$scope",
            "SPService",
            "Consts",
            "toastr",
            "$timeout",
            "$window",
            "$log"
        ];
        return ActivateCtrl;
    })();
    SN.ActivateCtrl = ActivateCtrl;
    angular.module("SN.app.controllers").controller("ActivateCtrl", ActivateCtrl);
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
        SPColorService.prototype.getElementColor = function (selector) {
            return this.$(selector).css("color");
        };
        SPColorService.prototype.getElementBackground = function (selector) {
            return this.$(selector).css("background-color");
        };
        SPColorService.prototype.getSuiteBarBackground = function () {
            return this.getElementBackground("#suiteBarLeft");
        };
        SPColorService.prototype.applyBackgrounds = function () {
            var background = this.getElementBackground(".ms-rteTable-1 tr.ms-rteTableHeaderRow-1");
            var linksColor = this.getElementColor(".ms-core-listMenu-item");
            var linksBackground = this.getElementBackground(".ms-HoverBackground-bgColor");
            var activeLinkBackground = this.getElementBackground(".ms-core-listMenu-selected");
            this.$("head").append(String.format("<style type='text/css'>" +
                ".navigation-menu ul a {{color: {1};}} " +
                ".navigation-menu ul a:hover {{background-color:{2};}} " +
                ".navigation-menu ul li.active a {{background-color: {3};color: {1};}}" +
                "</style>", background, linksColor, linksBackground, activeLinkBackground));
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
        function SPService(vendorsFactory, context, consts, $q, $http) {
            this.context = context;
            this.consts = consts;
            this.$q = $q;
            this.$http = $http;
            this.wait = null;
            this.fileList = [
                "./../HostWeb/template/templates.html",
                "./../HostWeb/External/knockout.js",
                "./../HostWeb/External/jquery.js",
                "./../HostWeb/External/lz-string.min.js",
                "./../HostWeb/External/bootstrap.css",
                "./../HostWeb/build/styles.css",
                "./../HostWeb/build/sn.manage.host.js",
                "./../HostWeb/build/sn.scriptlink.js"];
            this.newFileList = [
                "HostWeb/template/templates.html"];
            this.$ = vendorsFactory.$;
            this.settingsRepo = new SN.AppSettingsRepository();
        }
        SPService.prototype.uploadFileToFolder = function (url, content, folder, overwrite) {
            if (overwrite === void 0) { overwrite = true; }
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            var fileCreateInfo = new SP.FileCreationInformation();
            fileCreateInfo.set_url(url);
            fileCreateInfo.set_overwrite(overwrite);
            fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
            for (var i = 0; i < content.length; i++) {
                fileCreateInfo.get_content().append(content.charCodeAt(i));
            }
            var newFile = folder.get_files().add(fileCreateInfo);
            context.load(newFile);
            SN.Ex.executeQueryPromise(context)
                .then(function () {
                dfd.resolve(newFile);
            }, function (e) {
                dfd.reject(new SPListRepo.RequestError(e));
            });
            return dfd.promise;
        };
        SPService.prototype.createHostLibrary = function () {
            var _this = this;
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            var hostContext = new SP.AppContextSite(context, this.context.hostUrl);
            var hostWeb = hostContext.get_web();
            var library = hostWeb.get_lists().getByTitle(this.consts.HostLibraryTitle);
            context.load(library, "RootFolder", "Title");
            SN.Ex.executeQueryPromise(context)
                .then(function () {
                dfd.resolve(library);
            }, function (e) {
                if (e.get_errorTypeName() === "System.ArgumentException") {
                    var listInfo = new SP.ListCreationInformation();
                    listInfo.set_quickLaunchOption(SP.QuickLaunchOptions.off);
                    listInfo.set_url(_this.consts.HostLibraryUrl);
                    listInfo.set_title(_this.consts.HostLibraryTitle);
                    listInfo.set_templateType(101);
                    listInfo.set_templateFeatureId(new SP.Guid("00bfea71-e717-4e80-aa17-d0c71b360101"));
                    var newLibrary = hostWeb.get_lists().add(listInfo);
                    context.load(newLibrary, "RootFolder", "Title");
                    SN.Ex.executeQueryPromise(context)
                        .then(function () {
                        return _this.createManageAppView(library);
                    })
                        .then(function () {
                        dfd.resolve(library);
                    })
                        .catch(function (e) {
                        dfd.reject(new SPListRepo.RequestError(e));
                    });
                    return null;
                }
                else {
                    var deferred = _this.$q.defer();
                    deferred.reject(e);
                    return deferred.promise;
                }
            })
                .catch(function (e) {
                dfd.reject(new SPListRepo.RequestError(e));
            });
            return dfd.promise;
        };
        SPService.prototype.uploadFiles = function (folder) {
            var _this = this;
            var dfd = this.$q.defer();
            this.$q.all(this.fileList.map(function (file) {
                return _this.$http.get(file);
            }))
                .then(function (data) {
                return _this.$q.all(_this.fileList.map(function (file, indx) {
                    return _this.uploadFileToFolder(_this.getFileName(file), data[indx].data, folder);
                }));
            })
                .then(function () {
                dfd.resolve();
            })
                .catch(function (e) {
                if (e instanceof SP.ClientRequestFailedEventArgs) {
                    dfd.reject(new SPListRepo.RequestError(e));
                }
                else {
                    dfd.reject(e);
                }
            });
            return dfd.promise;
        };
        SPService.prototype.doesUserHaveFullControl = function () {
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            context.load(context.get_web(), "EffectiveBasePermissions");
            SN.Ex.executeQueryPromise(context)
                .then(function () {
                if (context.get_web().get_effectiveBasePermissions().has(SP.PermissionKind.manageWeb)) {
                    dfd.resolve(true);
                }
                else {
                    dfd.resolve(false);
                }
            })
                .catch(function (e) {
                dfd.reject(new SPListRepo.RequestError(e));
            });
            return dfd.promise;
        };
        SPService.prototype.getHostCustomizationStatus = function () {
            var _this = this;
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            var hostContext = new SP.AppContextSite(context, this.context.hostUrl);
            var hostActions = hostContext.get_web().get_userCustomActions();
            context.load(hostActions);
            SN.Ex.executeQueryPromise(context)
                .then(function () {
                var enumerator = hostActions.getEnumerator();
                var resolved = false;
                while (enumerator.moveNext()) {
                    var action = enumerator.get_current();
                    if (action.get_name() === _this.consts.ScriptLinkId) {
                        dfd.resolve(true);
                        resolved = true;
                    }
                }
                if (!resolved) {
                    dfd.resolve(false);
                }
            })
                .catch(function (e) {
                dfd.reject(new SPListRepo.RequestError(e));
            });
            return dfd.promise;
        };
        SPService.prototype.getFileName = function (input) {
            return input.replace(/^.*[\\\/]/, '');
        };
        SPService.prototype.createManageAppView = function (library) {
            var _this = this;
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            var viewInfo = new SP.ViewCreationInformation();
            viewInfo.set_title(this.consts.ManageAppView);
            viewInfo.set_viewTypeKind(SP.ViewType.html);
            var view = library.get_views().add(viewInfo);
            context.load(view);
            context.load(context.get_web(), "ServerRelativeUrl");
            SN.Ex.executeQueryPromise(context)
                .then(function () {
                var viewFile = library.get_parentWeb().getFileByServerRelativeUrl(view.get_serverRelativeUrl());
                var hostWpManager = viewFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                var appWebRelativeUrl = SPListRepo.Helper.ensureTrailingSlash(context.get_web().get_serverRelativeUrl());
                var appFileUrl = String.format("{0}Pages/Default.aspx", appWebRelativeUrl);
                var appFile = library.get_parentWeb().getFileByServerRelativeUrl(appFileUrl);
                var appManager = appFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                var webPartDefinition = appManager.importWebPart(_this.consts.WebPartTemplate);
                var webPart = webPartDefinition.get_webPart();
                hostWpManager.addWebPart(webPart, "", 1);
                return SN.Ex.executeQueryPromise(context);
            })
                .then(function () {
                dfd.resolve();
            })
                .catch(function (e) {
                dfd.reject(e);
            });
            return dfd.promise;
        };
        SPService.$inject = [
            "VendorsFactory",
            "ContextService",
            "Consts",
            "$q",
            "$http"
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
                    ContactDev: "Try again and if the problem still exists contact app developer",
                    SettingsKey: "appsettings",
                    ScriptLinkId: "sn.app",
                    HostPageFolderUrl: "SmartNotificationsHost",
                    ManageAppView: "ManageApp",
                    ScriptingDisabledError: "\n\t\t\t\t\tThe error indicates that scripting capabilities are disabled for this site.<br>\n\t\t\t\t\tTo Smart Notifications functioning correctly you need to <b>turn on scripting capabilities.</b><br>\n\t\t\t\t\tUse <a href='https://support.office.com/en-sg/article/Turn-scripting-capabilities-on-or-off-1f2c515f-5d7e-448a-9fd7-835da935584f?ui=en-US&rs=en-SG&ad=SG' target='_blank'>this link</a> to read more about scripting capabilities feature.",
                    WebPartTemplate: "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
                        "<WebPart xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://schemas.microsoft.com/WebPart/v2\">	" +
                        "<Title>Manage Smart Notifications</Title>" +
                        "<FrameType>Default</FrameType>	" +
                        "<Description>Manage Smart Notifications</Description>" +
                        "<IsIncluded>true</IsIncluded>" +
                        "<ZoneID></ZoneID>" +
                        "<PartOrder>0</PartOrder>" +
                        "<FrameState>Normal</FrameState>" +
                        "<Height />" +
                        "<Width />" +
                        "<AllowRemove>true</AllowRemove>" +
                        "<AllowZoneChange>true</AllowZoneChange>" +
                        "<AllowMinimize>true</AllowMinimize>" +
                        "<AllowConnect>true</AllowConnect>" +
                        "<AllowEdit>true</AllowEdit>" +
                        "<AllowHide>true</AllowHide>" +
                        "<IsVisible>true</IsVisible>" +
                        "<DetailLink />" +
                        "<HelpLink />" +
                        "<HelpMode>Modeless</HelpMode>" +
                        "<Dir>Default</Dir>" +
                        "<PartImageSmall />" +
                        "<MissingAssembly>Cannot import this Web Part.</MissingAssembly>" +
                        "<PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>" +
                        "<IsIncludedFilter />" +
                        "<Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>" +
                        "<TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>" +
                        "<ContentLink xmlns=\"http://schemas.microsoft.com/WebPart/v2/ContentEditor\" />" +
                        "<Content xmlns=\"http://schemas.microsoft.com/WebPart/v2/ContentEditor\" >" +
                        "	<![CDATA[" +
                        "<div id=\"sn-manage-app\" class=\"sn-app-bootstrap\" data-bind=\"template: {name: 'sn-manage-app-tmpl'}\">Prepairing....</div>" +
                        "<style>.ms-listviewtable, .ms-InlineSearch-DivBaseline, .ms-list-addnew{display:none;}</style>" +
                        "<script type=\"text/javascript\" src=\"../sn.manage.host.js\"></script>" +
                        "]]></Content>" +
                        "<PartStorage xmlns=\"http://schemas.microsoft.com/WebPart/v2/ContentEditor\" />" +
                        "</WebPart>"
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
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.prototype.save = function (key, data, expirationInMin) {
            var expirationMS = expirationInMin * 60 * 1000;
            var record = { value: JSON.stringify(data), timestamp: new Date().getTime() + expirationMS };
            var dataToStore = LZString.compressToUTF16(JSON.stringify(record));
            localStorage.setItem(key, dataToStore);
            return data;
        };
        Storage.prototype.load = function (key) {
            var jsonData = LZString.decompressFromUTF16(localStorage.getItem(key));
            if (!jsonData) {
                return false;
            }
            var record = JSON.parse(jsonData);
            return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
        };
        return Storage;
    })();
    SN.Storage = Storage;
    angular.module("SN.app.services").service("Storage", Storage);
})(SN || (SN = {}));
/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var Ex = (function () {
        function Ex() {
        }
        Ex.executeQueryPromise = function (ctx, data) {
            var $q = angular.injector(["ng"]).get("$q");
            var dfd = $q.defer();
            ctx.executeQueryAsync(function () {
                dfd.resolve(data);
            }, function (sender, args) {
                dfd.reject(args);
            });
            return dfd.promise;
        };
        return Ex;
    })();
    SN.Ex = Ex;
})(SN || (SN = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="repositories/AppSettingsRepository.ts" />
/// <reference path="common/Fields.ts" />
/// <reference path="app.ts" />
/// <reference path="model/Context.ts" />
/// <reference path="model/AppSettingsBaseItem.ts" />
/// <reference path="model/CommonAppSettings.ts" />
/// <reference path="model/Notifications.ts" />
/// <reference path="factories/VendorsFactory.ts" />
/// <reference path="controllers/HomeCtrl.ts" />
/// <reference path="controllers/ChromeNavCtrl.ts" />
/// <reference path="controllers/SideNavCtrl.ts" />
/// <reference path="controllers/AppLoadCtrl.ts" />
/// <reference path="controllers/OnOffCtrl.ts" />
/// <reference path="controllers/ContactDevCtrl.ts" />
/// <reference path="controllers/ActivateCtrl.ts" />
/// <reference path="interfaces/ICtrlScope.ts" />
/// <reference path="services/ContextService.ts" />
/// <reference path="services/PleaseWaitService.ts" />
/// <reference path="services/SPColorService.ts" />
/// <reference path="services/SPService.ts" />
/// <reference path="services/Constants.ts" />
/// <reference path="services/Storage.ts" />
/// <reference path="services/Extensions.ts" />

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy9BcHBTZXR0aW5nc1JlcG9zaXRvcnkudHMiLCJjb21tb24vRmllbGRzLnRzIiwiYXBwLnRzIiwibW9kZWwvQ29udGV4dC50cyIsIm1vZGVsL0FwcFNldHRpbmdzQmFzZUl0ZW0udHMiLCJtb2RlbC9Db21tb25BcHBTZXR0aW5ncy50cyIsIm1vZGVsL05vdGlmaWNhdGlvbnMudHMiLCJmYWN0b3JpZXMvVmVuZG9yc0ZhY3RvcnkudHMiLCJjb250cm9sbGVycy9Ib21lQ3RybC50cyIsImNvbnRyb2xsZXJzL0Nocm9tZU5hdkN0cmwudHMiLCJjb250cm9sbGVycy9TaWRlTmF2Q3RybC50cyIsImNvbnRyb2xsZXJzL0FwcExvYWRDdHJsLnRzIiwiY29udHJvbGxlcnMvT25PZmZDdHJsLnRzIiwiY29udHJvbGxlcnMvQ29udGFjdERldkN0cmwudHMiLCJjb250cm9sbGVycy9BY3RpdmF0ZUN0cmwudHMiLCJpbnRlcmZhY2VzL0lDdHJsU2NvcGUudHMiLCJzZXJ2aWNlcy9Db250ZXh0U2VydmljZS50cyIsInNlcnZpY2VzL1BsZWFzZVdhaXRTZXJ2aWNlLnRzIiwic2VydmljZXMvU1BDb2xvclNlcnZpY2UudHMiLCJzZXJ2aWNlcy9TUFNlcnZpY2UudHMiLCJzZXJ2aWNlcy9Db25zdGFudHMudHMiLCJzZXJ2aWNlcy9TdG9yYWdlLnRzIiwic2VydmljZXMvRXh0ZW5zaW9ucy50cyIsIl9yZWZlcmVuY2VzLnRzIl0sIm5hbWVzIjpbIlNOIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5IiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5LmNvbnN0cnVjdG9yIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5Ll9jcmVhdGVEZWZlcnJlZCIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeS5nZXRTZXR0aW5nc0J5S2V5IiwiU04uRmllbGRzIiwiU04uQ29udGV4dCIsIlNOLkNvbnRleHQuY29uc3RydWN0b3IiLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5jb25zdHJ1Y3RvciIsIlNOLkFwcFNldHRpbmdzQmFzZUl0ZW0ubWFwRnJvbUxpc3RJdGVtIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5tYXBUb0xpc3RJdGVtIiwiU04uQ29tbW9uQXBwU2V0dGluZ3MiLCJTTi5Db21tb25BcHBTZXR0aW5ncy5jb25zdHJ1Y3RvciIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbSIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbS5jb25zdHJ1Y3RvciIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbS5tYXBGcm9tTGlzdEl0ZW0iLCJTTi5Ob3RpZmljYXRpb25zQmFzZUl0ZW0ubWFwVG9MaXN0SXRlbSIsIlNOLlZlbmRvcnNGYWN0b3J5IiwiU04uSG9tZUN0cmwiLCJTTi5Ib21lQ3RybC5jb25zdHJ1Y3RvciIsIlNOLkNocm9tZU5hdkN0cmwiLCJTTi5DaHJvbWVOYXZDdHJsLmNvbnN0cnVjdG9yIiwiU04uU2lkZU5hdkN0cmwiLCJTTi5TaWRlTmF2Q3RybC5jb25zdHJ1Y3RvciIsIlNOLkVycm9yVHlwZXMiLCJTTi5BcHBMb2FkQ3RybCIsIlNOLkFwcExvYWRDdHJsLmNvbnN0cnVjdG9yIiwiU04uQXBwTG9hZEN0cmwuZ28iLCJTTi5BcHBMb2FkQ3RybC5sb2FkTGljZW5zZSIsIlNOLkFwcExvYWRDdHJsLm9uRXJyb3IiLCJTTi5Pbk9mZkN0cmwiLCJTTi5Pbk9mZkN0cmwuY29uc3RydWN0b3IiLCJTTi5Pbk9mZkN0cmwub25FcnJvciIsIlNOLkNvbnRhY3REZXZDdHJsIiwiU04uQ29udGFjdERldkN0cmwuY29uc3RydWN0b3IiLCJTTi5BY3RpdmF0ZUN0cmwiLCJTTi5BY3RpdmF0ZUN0cmwuY29uc3RydWN0b3IiLCJTTi5BY3RpdmF0ZUN0cmwuYWN0aXZhdGUiLCJTTi5Db250ZXh0U2VydmljZSIsIlNOLkNvbnRleHRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0UGFyYW1ldGVyQnlOYW1lIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0V2ViVXJsIiwiU04uQ29udGV4dFNlcnZpY2UuZW5kc1dpdGgiLCJTTi5QbGVhc2VXYWl0U2VydmljZSIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uUGxlYXNlV2FpdFNlcnZpY2Uuc3RhcnQiLCJTTi5QbGVhc2VXYWl0U2VydmljZS5jbG9zZSIsIlNOLlNQQ29sb3JTZXJ2aWNlIiwiU04uU1BDb2xvclNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5TUENvbG9yU2VydmljZS5nZXRFbGVtZW50Q29sb3IiLCJTTi5TUENvbG9yU2VydmljZS5nZXRFbGVtZW50QmFja2dyb3VuZCIsIlNOLlNQQ29sb3JTZXJ2aWNlLmdldFN1aXRlQmFyQmFja2dyb3VuZCIsIlNOLlNQQ29sb3JTZXJ2aWNlLmFwcGx5QmFja2dyb3VuZHMiLCJTTi5TUFNlcnZpY2UiLCJTTi5TUFNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5TUFNlcnZpY2UudXBsb2FkRmlsZVRvRm9sZGVyIiwiU04uU1BTZXJ2aWNlLmNyZWF0ZUhvc3RMaWJyYXJ5IiwiU04uU1BTZXJ2aWNlLnVwbG9hZEZpbGVzIiwiU04uU1BTZXJ2aWNlLmRvZXNVc2VySGF2ZUZ1bGxDb250cm9sIiwiU04uU1BTZXJ2aWNlLmdldEhvc3RDdXN0b21pemF0aW9uU3RhdHVzIiwiU04uU1BTZXJ2aWNlLmdldEZpbGVOYW1lIiwiU04uU1BTZXJ2aWNlLmNyZWF0ZU1hbmFnZUFwcFZpZXciLCJTTi5Db25zdGFudHMiLCJTTi5Db25zdGFudHMuY29uc3RydWN0b3IiLCJTTi5Db25zdGFudHMuRGVmYXVsdCIsIlNOLlN0b3JhZ2UiLCJTTi5TdG9yYWdlLmNvbnN0cnVjdG9yIiwiU04uU3RvcmFnZS5zYXZlIiwiU04uU3RvcmFnZS5sb2FkIiwiU04uRXgiLCJTTi5FeC5jb25zdHJ1Y3RvciIsIlNOLkV4LmV4ZWN1dGVRdWVyeVByb21pc2UiXSwibWFwcGluZ3MiOiJBQUFDLDBDQUEwQzs7Ozs7O0FBRTNDLElBQVUsRUFBRSxDQXNCWDtBQXRCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQTJDQyx5Q0FBOENBO1FBRXhGQSwrQkFBWUEsRUFBWUE7WUFDdkJDLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dCQUNSQSxrQkFBTUEsRUFBRUEsRUFBRUEsc0JBQW1CQSxDQUFDQSxDQUFDQTtZQUNoQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLGtCQUFNQSxhQUFhQSxFQUFFQSxzQkFBbUJBLENBQUNBLENBQUNBO1lBQzNDQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVTRCwrQ0FBZUEsR0FBekJBO1lBRUNFLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFVBQVVBLEVBQUtBLENBQUNBO1FBQ3ZDQSxDQUFDQTtRQUVNRixnREFBZ0JBLEdBQXZCQSxVQUF3QkEsR0FBV0E7WUFDbENHLElBQUlBLGNBQWNBLEdBQUdBLFdBQVdBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLFNBQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRWpGQSxNQUFNQSxDQUFtQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO1FBQzNHQSxDQUFDQTtRQUNGSCw0QkFBQ0E7SUFBREEsQ0FwQkFELEFBb0JDQyxFQXBCMENELFVBQVVBLENBQUNBLGNBQWNBLEVBb0JuRUE7SUFwQllBLHdCQUFxQkEsd0JBb0JqQ0EsQ0FBQUE7QUFDRkEsQ0FBQ0EsRUF0QlMsRUFBRSxLQUFGLEVBQUUsUUFzQlg7QUN4QkEsa0RBQWtEO0FBQ25ELG1GQUFtRjtBQUVuRixJQUFVLEVBQUUsQ0FHWDtBQUhELFdBQVUsRUFBRTtJQUFDQSxJQUFBQSxNQUFNQSxDQUdsQkE7SUFIWUEsV0FBQUEsTUFBTUEsRUFBQ0EsQ0FBQ0E7UUFDVEssVUFBR0EsR0FBR0EsUUFBUUEsQ0FBQ0E7UUFDZkEsWUFBS0EsR0FBR0EsVUFBVUEsQ0FBQ0E7SUFDL0JBLENBQUNBLEVBSFlMLE1BQU1BLEdBQU5BLFNBQU1BLEtBQU5BLFNBQU1BLFFBR2xCQTtBQUFEQSxDQUFDQSxFQUhTLEVBQUUsS0FBRixFQUFFLFFBR1g7QUNOQSx1Q0FBdUM7QUFFeEMsSUFBVSxFQUFFLENBcUZYO0FBckZELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkEsWUFBWUEsQ0FBQ0E7SUFFYkEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLENBQUNBO0lBQzFEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO0lBQ3hDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxpQkFBaUJBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO0lBRXRDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQSxvQkFBb0JBLEVBQUVBLG1CQUFtQkEsRUFBRUEsaUJBQWlCQSxFQUFFQSxlQUFlQSxFQUFFQSxjQUFjQSxFQUFFQSxXQUFXQSxFQUFFQSxXQUFXQSxFQUFFQSxZQUFZQSxFQUFFQSxRQUFRQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtTQUN0TEEsTUFBTUEsQ0FBQ0EsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLG9CQUFvQkEsRUFBRUEsdUJBQXVCQTtRQUM3RkEsVUFBQ0Esa0JBQWlEQSxFQUNqREEsY0FBeUNBLEVBQ3pDQSxrQkFBd0RBLEVBQ3hEQSxxQkFBMEJBO1lBRTFCQSxrQkFBa0JBLENBQUNBLHdCQUF3QkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFFeERBLGtCQUFrQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFbENBLGNBQWNBO2lCQUNaQSxLQUFLQSxDQUFDQSxNQUFNQSxFQUFFQTtnQkFDZEEsR0FBR0EsRUFBRUEsR0FBR0E7Z0JBQ1JBLFdBQVdBLEVBQUVBLDRCQUE0QkE7Z0JBQ3pDQSxVQUFVQSxFQUFFQSxVQUFVQTthQUN0QkEsQ0FBQ0E7aUJBQ0RBLEtBQUtBLENBQUNBLE9BQU9BLEVBQUVBO2dCQUNmQSxHQUFHQSxFQUFFQSxRQUFRQTtnQkFDYkEsV0FBV0EsRUFBRUEsNkJBQTZCQTtnQkFDMUNBLFVBQVVBLEVBQUVBLFdBQVdBO2FBQ3ZCQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsWUFBWUEsRUFBRUE7Z0JBQ3BCQSxHQUFHQSxFQUFFQSxhQUFhQTtnQkFDbEJBLFdBQVdBLEVBQUVBLGtDQUFrQ0E7Z0JBQy9DQSxVQUFVQSxFQUFFQSxnQkFBZ0JBO2FBQzVCQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBVUEsRUFBRUE7Z0JBQ2xCQSxHQUFHQSxFQUFFQSxXQUFXQTtnQkFDaEJBLFdBQVdBLEVBQUVBLGdDQUFnQ0E7Z0JBQzdDQSxVQUFVQSxFQUFFQSxjQUFjQTthQUMxQkEsQ0FBQ0EsQ0FBQ0E7WUFFSkEscUJBQXFCQTtpQkFDbkJBLFFBQVFBLENBQUNBLGNBQWNBLEVBQUVBO2dCQUN6QkEsSUFBSUEsRUFBRUEsTUFBTUE7Z0JBQ1pBLFNBQVNBLEVBQUVBLGdCQUFnQkE7Z0JBQzNCQSxLQUFLQSxFQUFFQSxNQUFNQTthQUNiQSxDQUFDQTtpQkFDREEsUUFBUUEsQ0FBQ0EsY0FBY0EsRUFBRUE7Z0JBQ3pCQSxJQUFJQSxFQUFFQSxHQUFHQTtnQkFDVEEsU0FBU0EsRUFBRUEsZUFBZUE7Z0JBQzFCQSxNQUFNQSxFQUFFQSxRQUFRQTtnQkFDaEJBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBO2lCQUNEQSxRQUFRQSxDQUFDQSx5QkFBeUJBLEVBQUVBO2dCQUNwQ0EsSUFBSUEsRUFBRUEsc0JBQXNCQTtnQkFDNUJBLFNBQVNBLEVBQUVBLGdCQUFnQkE7Z0JBQzNCQSxNQUFNQSxFQUFFQSxRQUFRQTtnQkFDaEJBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBO2lCQUNEQSxRQUFRQSxDQUFDQSwwQkFBMEJBLEVBQUVBO2dCQUNyQ0EsSUFBSUEsRUFBRUEsbUJBQW1CQTtnQkFDekJBLFNBQVNBLEVBQUVBLG1CQUFtQkE7Z0JBQzlCQSxNQUFNQSxFQUFFQSxRQUFRQTtnQkFDaEJBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBO2lCQUNEQSxRQUFRQSxDQUFDQSw2QkFBNkJBLEVBQUVBO2dCQUN4Q0EsSUFBSUEsRUFBRUEsMEJBQTBCQTtnQkFDaENBLFNBQVNBLEVBQUVBLFdBQVdBO2dCQUN0QkEsS0FBS0EsRUFBRUEsT0FBT0E7YUFDZEEsQ0FBQ0E7aUJBQ0RBLFFBQVFBLENBQUNBLG9CQUFvQkEsRUFBRUE7Z0JBQy9CQSxJQUFJQSxFQUFFQSxtQkFBbUJBO2dCQUN6QkEsU0FBU0EsRUFBRUEsZ0JBQWdCQTtnQkFDM0JBLEtBQUtBLEVBQUNBLFlBQVlBO2FBQ2xCQSxDQUFDQTtpQkFDREEsUUFBUUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQTtnQkFDN0JBLElBQUlBLEVBQUVBLGtCQUFrQkE7Z0JBQ3hCQSxTQUFTQSxFQUFFQSxXQUFXQTtnQkFDdEJBLEtBQUtBLEVBQUVBLFVBQVVBO2FBQ2pCQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQSxDQUFDQSxDQUFDQTtTQUNIQSxNQUFNQSxDQUFDQSxDQUFDQSxjQUFjQSxFQUFFQSxVQUFDQSxZQUE2QkE7WUFDdERBLElBQUlBLFdBQVdBLEdBQVNBLE1BQU9BLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3pDQSxJQUFJQSxnQkFBZ0JBLEdBQUdBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1lBQzFFQSxZQUFZQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxJQUFJQSxnQkFBZ0JBLENBQUNBLENBQUNBO1FBQzVEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUNOQSxDQUFDQSxFQXJGUyxFQUFFLEtBQUYsRUFBRSxRQXFGWDtBQ3ZGQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBU1g7QUFURCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQUFNO1FBT0FDLENBQUNBO1FBQURELGNBQUNBO0lBQURBLENBUEFOLEFBT0NNLElBQUFOO0lBUFlBLFVBQU9BLFVBT25CQSxDQUFBQTtBQUNGQSxDQUFDQSxFQVRTLEVBQUUsS0FBRixFQUFFLFFBU1g7QUNYQSxrREFBa0Q7QUFDbkQsbUZBQW1GO0FBRW5GLElBQVUsRUFBRSxDQTZDWDtBQTdDRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQXlDUSx1Q0FBdUJBO1FBYS9EQSw2QkFBWUEsSUFBa0JBO1lBQzdCQyxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDWkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1ZBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzVCQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVERCw2Q0FBZUEsR0FBZkEsVUFBZ0JBLElBQWlCQTtZQUNoQ0UsZ0JBQUtBLENBQUNBLGVBQWVBLFlBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRTVCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUMvQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQ3JEQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDL0RBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3ZDQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQzdEQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUNqREEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDN0NBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7WUFDM0RBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtZQUMvREEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDakRBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBQ2xEQSxDQUFDQTtRQUVERiwyQ0FBYUEsR0FBYkEsVUFBY0EsSUFBaUJBO1lBQzlCRyxnQkFBS0EsQ0FBQ0EsYUFBYUEsWUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFMUJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQ3BEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxFQUFFQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtRQUNqREEsQ0FBQ0E7UUFDRkgsMEJBQUNBO0lBQURBLENBM0NBUixBQTJDQ1EsRUEzQ3dDUixVQUFVQSxDQUFDQSxZQUFZQSxFQTJDL0RBO0lBM0NZQSxzQkFBbUJBLHNCQTJDL0JBLENBQUFBO0FBQ0ZBLENBQUNBLEVBN0NTLEVBQUUsS0FBRixFQUFFLFFBNkNYO0FDaERBLGtEQUFrRDtBQUVuRCxJQUFVLEVBQUUsQ0FRWDtBQVJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFBQVk7UUFNQUMsQ0FBQ0E7UUFBREQsd0JBQUNBO0lBQURBLENBTkFaLEFBTUNZLElBQUFaO0lBTllBLG9CQUFpQkEsb0JBTTdCQSxDQUFBQTtBQUNGQSxDQUFDQSxFQVJTLEVBQUUsS0FBRixFQUFFLFFBUVg7QUNWQSwwQ0FBMEM7QUFDM0MsbUZBQW1GO0FBRW5GLElBQVUsRUFBRSxDQXlEWDtBQXpERCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQTJDYyx5Q0FBdUJBO1FBaUJqRUEsK0JBQVlBLElBQWtCQTtZQUM3QkMsa0JBQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ1pBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUNWQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM1QkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFREQsK0NBQWVBLEdBQWZBLFVBQWdCQSxJQUFpQkE7WUFDaENFLGdCQUFLQSxDQUFDQSxlQUFlQSxZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUU1QkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7WUFDbkRBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQzdDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUN6Q0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7WUFDekRBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7WUFDM0RBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBQy9DQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUNyREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO1lBQy9EQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUN2Q0EsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQTtZQUM3REEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDakRBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQzdDQSxJQUFJQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1lBQzNEQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDL0RBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQ2pEQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUNsREEsQ0FBQ0E7UUFFREYsNkNBQWFBLEdBQWJBLFVBQWNBLElBQWlCQTtZQUM5QkcsZ0JBQUtBLENBQUNBLGFBQWFBLFlBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRTFCQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxFQUFFQSxZQUFZQSxFQUFFQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUN4REEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDbERBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQzlDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxFQUFFQSxlQUFlQSxFQUFFQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtZQUM5REEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtZQUNoRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDckRBLENBQUNBO1FBQ0ZILDRCQUFDQTtJQUFEQSxDQXZEQWQsQUF1RENjLEVBdkQwQ2QsVUFBVUEsQ0FBQ0EsWUFBWUEsRUF1RGpFQTtJQXZEWUEsd0JBQXFCQSx3QkF1RGpDQSxDQUFBQTtBQUNGQSxDQUFDQSxFQXpEUyxFQUFFLEtBQUYsRUFBRSxRQXlEWDtBQzVEQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBVVg7QUFWRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBLHdCQUErQkEsT0FBMEJBO1FBQ3hEa0IsTUFBTUEsQ0FBQ0E7WUFDTkEsQ0FBQ0EsRUFBUUEsT0FBUUEsQ0FBQ0EsTUFBTUE7U0FDeEJBLENBQUFBO0lBQ0ZBLENBQUNBO0lBSmVsQixpQkFBY0EsaUJBSTdCQSxDQUFBQTtJQUVEQSxjQUFjQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUVsQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO0FBQ2hGQSxDQUFDQSxFQVZTLEVBQUUsS0FBRixFQUFFLFFBVVg7QUNaQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBcUJYO0FBckJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVkE7UUFRRm1CLGtCQUNTQSxNQUE0QkEsRUFDNUJBLEtBQXNCQSxFQUN0QkEsT0FBMEJBLEVBQzFCQSxRQUE0QkE7WUFINUJDLFdBQU1BLEdBQU5BLE1BQU1BLENBQXNCQTtZQUM1QkEsVUFBS0EsR0FBTEEsS0FBS0EsQ0FBaUJBO1lBQ3RCQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFtQkE7WUFDMUJBLGFBQVFBLEdBQVJBLFFBQVFBLENBQW9CQTtZQUUzQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFM0JBLENBQUNBO1FBZllELGdCQUFPQSxHQUFHQTtZQUN0QkEsUUFBUUE7WUFDQ0EsT0FBT0E7WUFDUEEsU0FBU0E7WUFDbEJBLFVBQVVBO1NBQ0pBLENBQUNBO1FBV05BLGVBQUNBO0lBQURBLENBakJBbkIsQUFpQkNtQixJQUFBbkI7SUFqQllBLFdBQVFBLFdBaUJwQkEsQ0FBQUE7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtBQUMxRUEsQ0FBQ0EsRUFyQlMsRUFBRSxLQUFGLEVBQUUsUUFxQlg7QUN2QkEsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQXlCWDtBQXpCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1ZBO1FBV0lxQix1QkFDR0EsTUFBaUNBLEVBQ2pDQSxPQUF1QkEsRUFDdkJBLFFBQTRCQTtZQUY1QkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBMkJBO1lBQ2pDQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFnQkE7WUFDdkJBLGFBQVFBLEdBQVJBLFFBQVFBLENBQW9CQTtZQUUzQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDMUJBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBO1lBQ3BDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDbkNBLENBQUNBO1FBbkJNRCxxQkFBT0EsR0FBR0E7WUFDdEJBLFFBQVFBO1lBQ1JBLGdCQUFnQkE7WUFDaEJBLFVBQVVBO1NBQ0pBLENBQUNBO1FBZ0JOQSxvQkFBQ0E7SUFBREEsQ0FyQkFyQixBQXFCQ3FCLElBQUFyQjtJQXJCWUEsZ0JBQWFBLGdCQXFCekJBLENBQUFBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsZUFBZUEsRUFBRUEsYUFBYUEsQ0FBQ0EsQ0FBQ0E7QUFDcEZBLENBQUNBLEVBekJTLEVBQUUsS0FBRixFQUFFLFFBeUJYO0FDM0JBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0FxQlg7QUFyQkQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWQTtRQVNJdUIscUJBQW9CQSxNQUErQkEsRUFBVUEsYUFBa0JBLEVBQVVBLE9BQXVCQTtZQUE1RkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBeUJBO1lBQVVBLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFLQTtZQUFVQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFnQkE7WUFFNUdBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1lBQzFCQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSwwQkFBMEJBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLEdBQUdBLGVBQWVBLENBQUNBO1lBQ2hHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSx5QkFBeUJBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLEdBQUdBLDRCQUE0QkEsQ0FBQ0E7WUFDNUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBO1lBQ25FQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQTtRQUNoRUEsQ0FBQ0E7UUFmTUQsbUJBQU9BLEdBQUdBO1lBQ3RCQSxRQUFRQTtZQUNDQSxlQUFlQTtZQUN4QkEsZ0JBQWdCQTtTQUNWQSxDQUFDQTtRQVlOQSxrQkFBQ0E7SUFBREEsQ0FqQkF2QixBQWlCQ3VCLElBQUF2QjtJQWpCWUEsY0FBV0EsY0FpQnZCQSxDQUFBQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO0FBQ2hGQSxDQUFDQSxFQXJCUyxFQUFFLEtBQUYsRUFBRSxRQXFCWDtBQ3ZCQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBb0pYO0FBcEpELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFFYkEsSUFBS0EsVUFHSkE7SUFIREEsV0FBS0EsVUFBVUE7UUFDZHlCLDZEQUFhQSxDQUFBQTtRQUNiQSxtRUFBZ0JBLENBQUFBO0lBQ2pCQSxDQUFDQSxFQUhJekIsVUFBVUEsS0FBVkEsVUFBVUEsUUFHZEE7SUFJRUE7UUF5QkYwQixxQkFDU0EsTUFBK0JBLEVBQy9CQSxZQUE0QkEsRUFDNUJBLFVBQTZCQSxFQUM3QkEsU0FBb0JBLEVBQ3BCQSxJQUFvQkEsRUFDcEJBLE1BQWNBLEVBQ2RBLE1BQWlCQSxFQUNqQkEsS0FBc0JBLEVBQ3RCQSxFQUFnQkEsRUFDaEJBLE9BQXVCQSxFQUN2QkEsTUFBZ0NBO1lBcEN2Q0MsaUJBd0lDQTtZQTlHTUEsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBeUJBO1lBQy9CQSxpQkFBWUEsR0FBWkEsWUFBWUEsQ0FBZ0JBO1lBQzVCQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFtQkE7WUFDN0JBLGNBQVNBLEdBQVRBLFNBQVNBLENBQVdBO1lBQ3BCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUFDcEJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVFBO1lBQ2RBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVdBO1lBQ2pCQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFpQkE7WUFDdEJBLE9BQUVBLEdBQUZBLEVBQUVBLENBQWNBO1lBQ2hCQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFnQkE7WUFDdkJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQTBCQTtZQXJCekNBLG1CQUFjQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUN2QkEsc0JBQWlCQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUMxQkEsaUJBQVlBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3JCQSxlQUFVQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNuQkEsb0JBQWVBLEdBQUdBLEtBQUtBLENBQUNBO1lBQ3hCQSxhQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNqQkEsYUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFTEEsc0JBQWlCQSxHQUFHQSxFQUFFQSxDQUFDQTtZQWVyQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFFMUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLFlBQVlBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDNURBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0E7WUFFckNBLFNBQVNBLENBQUNBLHVCQUF1QkEsRUFBRUE7aUJBQ2pDQSxJQUFJQSxDQUFDQSxVQUFBQSxjQUFjQTtnQkFDbkJBLEtBQUlBLENBQUNBLGNBQWNBLEdBQUdBLGNBQWNBLENBQUNBO2dCQUNyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JCQSxJQUFJQSxHQUFHQSxHQUFHQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtvQkFDMUJBLEdBQUdBLENBQUNBLE1BQU1BLENBQVNBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBO29CQUMxRUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQTtnQkFDREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUN6RUEsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLElBQUlBLENBQUNBLFVBQUNBLFdBQVdBO2dCQUVqQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3pCQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxpQkFBaUJBLEVBQUVBLENBQUNBO2dCQUUzQ0EsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNQQSxJQUFJQSxHQUFHQSxHQUFHQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtvQkFDMUJBLEdBQUdBLENBQUNBLE1BQU1BLENBQVNBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7b0JBQzdFQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQTtnQkFDcEJBLENBQUNBO1lBQ0ZBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQSxVQUFBQSxPQUFPQTtnQkFDWkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDN0RBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQTtnQkFDTEEsSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsb0JBQWlCQSxFQUFFQSxDQUFDQTtnQkFDdkNBLFFBQVFBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBO2dCQUN4Q0EsUUFBUUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQzFCQSxRQUFRQSxDQUFDQSxjQUFjQSxHQUFHQSxLQUFLQSxDQUFDQTtnQkFDaENBLFFBQVFBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBO2dCQUN0QkEsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxJQUFJQSxFQUFFQSxDQUFDQTtnQkFDdkNBLElBQUlBLGdCQUFnQkEsR0FBR0EsSUFBSUEsc0JBQW1CQSxFQUFFQSxDQUFDQTtnQkFDakRBLGdCQUFnQkEsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7Z0JBQ3JEQSxnQkFBZ0JBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hGQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7WUFDdEZBLENBQUNBLENBQUNBO2lCQUNEQSxLQUFLQSxDQUFDQSxVQUFBQSxHQUFHQTtnQkFDVEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsWUFBWUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzVDQSxLQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDbkJBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDN0JBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNuQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLE9BQU9BLENBQUNBO2dCQUNSQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtnQkFDeEJBLEtBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsSUFBSUEsQ0FBQ0E7Z0JBRTlCQSxLQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUNwQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUFFREQsd0JBQUVBLEdBQUZBLFVBQUdBLEtBQWFBO1lBQ2ZFLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQ3ZCQSxDQUFDQTtRQUVPRixpQ0FBV0EsR0FBbkJBO1lBQUFHLGlCQXVCQ0E7WUF0QkFBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFlBQVlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7aUJBQ25FQSxJQUFJQSxDQUFDQSxVQUFBQSxRQUFRQTtnQkFDYkEsSUFBSUEsV0FBV0EsR0FBc0JBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xHQSxLQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxXQUFXQSxDQUFDQSxjQUFjQSxDQUFDQTtnQkFDbERBLEtBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBO2dCQUNwQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsV0FBV0EsQ0FBQ0EsUUFBUUEsQ0FBQ0E7Z0JBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDdkJBLElBQUlBLE9BQU9BLEdBQUdBLE1BQU1BLEVBQUVBLENBQUNBO29CQUV2QkEsSUFBSUEsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtvQkFFekVBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLEdBQUdBLEtBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3RDQSxLQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDekJBLEtBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEtBQUtBLENBQUNBO29CQUN6QkEsQ0FBQ0E7b0JBQUNBLElBQUlBLENBQUNBLENBQUNBO3dCQUNQQSxLQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTt3QkFDdkJBLEtBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsT0FBT0EsQ0FBQ0E7b0JBQ2xEQSxDQUFDQTtnQkFDRkEsQ0FBQ0E7Z0JBRURBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBQ3RCQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVPSCw2QkFBT0EsR0FBZkEsVUFBZ0JBLEdBQWtDQTtZQUNqREksRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsWUFBWUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUNoQ0EsRUFBRUEsQ0FBQ0EsQ0FBMkJBLEdBQUlBLENBQUNBLFNBQVNBLEtBQUtBLG9DQUFvQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZGQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxzQkFBc0JBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEVBQU9BLEVBQUVBLE9BQU9BLEVBQUVBLENBQUNBLEVBQUVBLFdBQVdBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLGVBQWVBLEVBQUVBLENBQUNBLEVBQUVBLFlBQVlBLEVBQUVBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBO29CQUMvS0EsTUFBTUEsQ0FBQ0E7Z0JBQ1JBLENBQUNBO1lBQ0ZBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDbEZBLENBQUNBO1FBdElZSixtQkFBT0EsR0FBR0E7WUFDdEJBLFFBQVFBO1lBQ1JBLGdCQUFnQkE7WUFDaEJBLG1CQUFtQkE7WUFDbkJBLFdBQVdBO1lBQ1hBLE1BQU1BO1lBQ05BLFFBQVFBO1lBQ1JBLFFBQVFBO1lBQ1JBLE9BQU9BO1lBQ1BBLElBQUlBO1lBQ0pBLGdCQUFnQkE7WUFDaEJBLFFBQVFBO1NBQ0ZBLENBQUNBO1FBMkhOQSxrQkFBQ0E7SUFBREEsQ0F4SUExQixBQXdJQzBCLElBQUExQjtJQXhJWUEsY0FBV0EsY0F3SXZCQSxDQUFBQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO0FBQ2hGQSxDQUFDQSxFQXBKUyxFQUFFLEtBQUYsRUFBRSxRQW9KWDtBQ3RKQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBZ0RYO0FBaERELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFnQkMrQixtQkFDU0EsTUFBNkJBLEVBQzdCQSxTQUFvQkEsRUFDcEJBLElBQW9CQSxFQUNwQkEsTUFBY0EsRUFDZEEsTUFBaUJBLEVBQ2pCQSxPQUF1QkE7WUF0QmpDQyxpQkEyQ0NBO1lBMUJTQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUF1QkE7WUFDN0JBLGNBQVNBLEdBQVRBLFNBQVNBLENBQVdBO1lBQ3BCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUFDcEJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVFBO1lBQ2RBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVdBO1lBQ2pCQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFnQkE7WUFYeEJBLGFBQVFBLEdBQUdBLGlCQUFpQkEsQ0FBQ0E7WUFDN0JBLGNBQVNBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7WUFZdENBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1lBRWpCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLEdBQUdBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGFBQWFBLEdBQUdBLE9BQU9BLENBQUNBO1lBRS9KQSxTQUFTQSxDQUFDQSwwQkFBMEJBLEVBQUVBO2lCQUNwQ0EsSUFBSUEsQ0FBQ0EsVUFBQUEsVUFBVUE7Z0JBQ2ZBLEtBQUlBLENBQUNBLE1BQU1BLEdBQUdBLFVBQVVBLEdBQUdBLEtBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBO1lBQzNEQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUFFT0QsMkJBQU9BLEdBQWZBLFVBQWdCQSxHQUFrQ0E7WUFDakRFLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLFlBQVlBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1Q0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RCQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFFQSxFQUFFQSxPQUFPQSxFQUFFQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUN0RkEsQ0FBQ0E7UUF4Q01GLGlCQUFPQSxHQUFHQTtZQUNoQkEsUUFBUUE7WUFDUkEsV0FBV0E7WUFDWEEsTUFBTUE7WUFDTkEsUUFBUUE7WUFDUkEsUUFBUUE7WUFDUkEsZ0JBQWdCQTtTQUNWQSxDQUFDQTtRQWtDVEEsZ0JBQUNBO0lBQURBLENBM0NBL0IsQUEyQ0MrQixJQUFBL0I7SUEzQ1lBLFlBQVNBLFlBMkNyQkEsQ0FBQUE7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtBQUV6RUEsQ0FBQ0EsRUFoRFMsRUFBRSxLQUFGLEVBQUUsUUFnRFg7QUNsREEsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQXFCWDtBQXJCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1ZBO1FBUUZrQyx3QkFDU0EsTUFBa0NBLEVBQ2xDQSxLQUFzQkEsRUFDdEJBLE9BQTBCQSxFQUMxQkEsUUFBNEJBO1lBSDVCQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUE0QkE7WUFDbENBLFVBQUtBLEdBQUxBLEtBQUtBLENBQWlCQTtZQUN0QkEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBbUJBO1lBQzFCQSxhQUFRQSxHQUFSQSxRQUFRQSxDQUFvQkE7WUFFM0JBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1FBRTNCQSxDQUFDQTtRQWZZRCxzQkFBT0EsR0FBR0E7WUFDdEJBLFFBQVFBO1lBQ0NBLE9BQU9BO1lBQ1BBLFNBQVNBO1lBQ2xCQSxVQUFVQTtTQUNKQSxDQUFDQTtRQVdOQSxxQkFBQ0E7SUFBREEsQ0FqQkFsQyxBQWlCQ2tDLElBQUFsQztJQWpCWUEsaUJBQWNBLGlCQWlCMUJBLENBQUFBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxjQUFjQSxDQUFDQSxDQUFDQTtBQUN0RkEsQ0FBQ0EsRUFyQlMsRUFBRSxLQUFGLEVBQUUsUUFxQlg7QUN2QkEsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQThEWDtBQTlERCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1ZBO1FBY0ZvQyxzQkFDU0EsTUFBZ0NBLEVBQ2hDQSxTQUFvQkEsRUFDcEJBLE1BQWlCQSxFQUNqQkEsTUFBY0EsRUFDZEEsUUFBNEJBLEVBQzVCQSxPQUEwQkEsRUFDMUJBLElBQW9CQTtZQU5wQkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBMEJBO1lBQ2hDQSxjQUFTQSxHQUFUQSxTQUFTQSxDQUFXQTtZQUNwQkEsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7WUFDakJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVFBO1lBQ2RBLGFBQVFBLEdBQVJBLFFBQVFBLENBQW9CQTtZQUM1QkEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBbUJBO1lBQzFCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUFUckJBLGNBQVNBLEdBQUdBLDBDQUEwQ0EsQ0FBQ0E7WUFXOURBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1FBQ2xCQSxDQUFDQTtRQUVERCwrQkFBUUEsR0FBUkE7WUFBQUUsaUJBK0JDQTtZQTlCQUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQUNBLE1BQU1BLENBQUNBO1lBQzdCQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxZQUFZQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBO2lCQUNuRUEsSUFBSUEsQ0FBQ0EsVUFBQUEsUUFBUUE7Z0JBQ2JBLElBQUlBLFdBQVdBLEdBQXNCQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxvQkFBb0JBLENBQUNBLFFBQVFBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2dCQUVsR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsS0FBS0EsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hDQSxXQUFXQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDNUJBLFdBQVdBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBLGNBQWNBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUN4REEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNQQSxXQUFXQSxDQUFDQSxjQUFjQSxHQUFHQSxJQUFJQSxDQUFDQTtvQkFDbENBLFdBQVdBLENBQUNBLEtBQUtBLEdBQUdBLFdBQVdBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO2dCQUNsREEsQ0FBQ0E7Z0JBQ0RBLFFBQVFBLENBQUNBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzNFQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO1lBQzlFQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0E7Z0JBQ0xBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLEVBQUVBLGlCQUFpQkEsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzlEQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtvQkFDYkEsS0FBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQ2hDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNWQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQ0EsR0FBa0NBO2dCQUN6Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsWUFBWUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzVDQSxLQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtvQkFDN0JBLEtBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUNqQ0EsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNQQSxLQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdEJBLENBQUNBO2dCQUNEQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxFQUFFQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFFQSxFQUFFQSxPQUFPQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNsRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDTEEsQ0FBQ0E7UUF4RFlGLG9CQUFPQSxHQUFHQTtZQUN0QkEsUUFBUUE7WUFDQ0EsV0FBV0E7WUFDcEJBLFFBQVFBO1lBQ1JBLFFBQVFBO1lBQ1JBLFVBQVVBO1lBQ1ZBLFNBQVNBO1lBQ1RBLE1BQU1BO1NBQ0FBLENBQUNBO1FBaUROQSxtQkFBQ0E7SUFBREEsQ0ExREFwQyxBQTBEQ29DLElBQUFwQztJQTFEWUEsZUFBWUEsZUEwRHhCQSxDQUFBQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLGNBQWNBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO0FBQ2xGQSxDQUFDQSxFQTlEUyxFQUFFLEtBQUYsRUFBRSxRQThEWDtBQ2hFQSwwQ0FBMEM7QUNBMUMsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQXFDWDtBQXJDRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQW9DdUMsa0NBQU9BO1FBTTFDQSx3QkFBb0JBLE9BQTBCQSxFQUFVQSxTQUE4QkE7WUFDckZDLGlCQUFPQSxDQUFDQTtZQURXQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFtQkE7WUFBVUEsY0FBU0EsR0FBVEEsU0FBU0EsQ0FBcUJBO1lBR3JGQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDOUNBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQy9IQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQ3REQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQ3BEQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFRQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUMzQ0EsQ0FBQ0E7UUFFT0QsMkNBQWtCQSxHQUExQkEsVUFBMkJBLElBQVlBO1lBQ3RDRSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUMxREEsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsR0FBR0EsV0FBV0EsQ0FBQ0EsRUFDcERBLE9BQU9BLEdBQUdBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3ZDQSxNQUFNQSxDQUFDQSxPQUFPQSxLQUFLQSxJQUFJQSxHQUFHQSxFQUFFQSxHQUFHQSxrQkFBa0JBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQ25GQSxDQUFDQTtRQUVPRixrQ0FBU0EsR0FBakJBLFVBQWtCQSxHQUFXQTtZQUM1QkcsSUFBSUEsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMxQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBR0EsTUFBTUEsR0FBR0EsR0FBR0EsQ0FBQ0E7UUFDM0RBLENBQUNBO1FBRU9ILGlDQUFRQSxHQUFoQkEsVUFBaUJBLEdBQVdBLEVBQUVBLE1BQWNBO1lBQzNDSSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxHQUFHQSxDQUFDQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMvREEsQ0FBQ0E7UUE5Qk1KLHNCQUFPQSxHQUFHQTtZQUNQQSxTQUFTQTtZQUNsQkEsV0FBV0E7U0FDTEEsQ0FBQ0E7UUE2QlRBLHFCQUFDQTtJQUFEQSxDQWpDQXZDLEFBaUNDdUMsRUFqQ21DdkMsVUFBT0EsRUFpQzFDQTtJQWpDWUEsaUJBQWNBLGlCQWlDMUJBLENBQUFBO0lBRUVBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZ0JBQWdCQSxFQUFFQSxjQUFjQSxDQUFDQSxDQUFDQTtBQUNoRkEsQ0FBQ0EsRUFyQ1MsRUFBRSxLQUFGLEVBQUUsUUFxQ1g7QUN2Q0EsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQWlDWDtBQWpDRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1ZBO1FBT0Y0QywyQkFDU0EsT0FBMEJBO1lBQTFCQyxZQUFPQSxHQUFQQSxPQUFPQSxDQUFtQkE7WUFIM0JBLFNBQUlBLEdBQVFBLElBQUlBLENBQUNBO1FBSXpCQSxDQUFDQTtRQUVNRCxpQ0FBS0EsR0FBWkEsVUFBYUEsS0FBYUE7WUFDekJFLElBQUlBLENBQUNBLElBQUlBLEdBQVNBLElBQUlBLENBQUNBLE9BQVFBLENBQUNBLFVBQVVBLENBQUNBO2dCQUMxQ0EsSUFBSUEsRUFBRUEsdUJBQXVCQTtnQkFDN0JBLGVBQWVBLEVBQUVBLEtBQUtBO2dCQUN0QkEsV0FBV0EsRUFBRUEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsOERBQThEQTtvQkFDekZBLHVCQUF1QkE7b0JBQ3ZCQSx1Q0FBdUNBO29CQUN2Q0EsdUNBQXVDQTtvQkFDdkNBLHVDQUF1Q0E7b0JBQ3ZDQSxRQUFRQSxDQUFDQTthQUNUQSxDQUFDQSxDQUFDQTtRQUNKQSxDQUFDQTtRQUVNRixpQ0FBS0EsR0FBWkE7WUFDQ0csRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUNwQkEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUEzQllILHlCQUFPQSxHQUFHQTtZQUNiQSxTQUFTQTtTQUNaQSxDQUFDQTtRQTBCTkEsd0JBQUNBO0lBQURBLENBN0JBNUMsQUE2QkM0QyxJQUFBNUM7SUE3QllBLG9CQUFpQkEsb0JBNkI3QkEsQ0FBQUE7SUFFSkEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxtQkFBbUJBLEVBQUVBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7QUFDbkZBLENBQUNBLEVBakNTLEVBQUUsS0FBRixFQUFFLFFBaUNYO0FDbkNBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0F3Q1g7QUF4Q0QsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWQTtRQVFGZ0Qsd0JBQ0NBLGNBQW1DQTtZQUo1QkMsU0FBSUEsR0FBUUEsSUFBSUEsQ0FBQ0E7WUFLeEJBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBO1FBQzNCQSxDQUFDQTtRQUVPRCx3Q0FBZUEsR0FBdkJBLFVBQXdCQSxRQUFnQkE7WUFDdkNFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBQ3RDQSxDQUFDQTtRQUVVRiw2Q0FBb0JBLEdBQTVCQSxVQUE2QkEsUUFBZUE7WUFDOUNHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7UUFDOUNBLENBQUNBO1FBRU1ILDhDQUFxQkEsR0FBNUJBO1lBQ0NJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7UUFDbkRBLENBQUNBO1FBRUdKLHlDQUFnQkEsR0FBdkJBO1lBQ0NLLElBQUlBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsMENBQTBDQSxDQUFDQSxDQUFDQTtZQUN2RkEsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxDQUFDQTtZQUNoRUEsSUFBSUEsZUFBZUEsR0FBR0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSw2QkFBNkJBLENBQUNBLENBQUNBO1lBQy9FQSxJQUFJQSxvQkFBb0JBLEdBQUdBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxDQUFDQTtZQUNuRkEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EseUJBQXlCQTtnQkFDNURBLHdDQUF3Q0E7Z0JBQ3hDQSx3REFBd0RBO2dCQUN4REEsdUVBQXVFQTtnQkFDdkVBLFVBQVVBLEVBQUVBLFVBQVVBLEVBQUVBLFVBQVVBLEVBQUVBLGVBQWVBLEVBQUVBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUVBLENBQUNBO1FBbENZTCxzQkFBT0EsR0FBR0E7WUFDYkEsZ0JBQWdCQTtTQUNuQkEsQ0FBQ0E7UUFpQ05BLHFCQUFDQTtJQUFEQSxDQXBDQWhELEFBb0NDZ0QsSUFBQWhEO0lBcENZQSxpQkFBY0EsaUJBb0MxQkEsQ0FBQUE7SUFFSkEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO0FBQzdFQSxDQUFDQSxFQXhDUyxFQUFFLEtBQUYsRUFBRSxRQXdDWDtBQzFDQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBd09YO0FBeE9ELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVkE7UUEwQkZzRCxtQkFDQ0EsY0FBbUNBLEVBQzNCQSxPQUF1QkEsRUFDdkJBLE1BQWlCQSxFQUNqQkEsRUFBZ0JBLEVBQ2hCQSxLQUFzQkE7WUFIdEJDLFlBQU9BLEdBQVBBLE9BQU9BLENBQWdCQTtZQUN2QkEsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7WUFDakJBLE9BQUVBLEdBQUZBLEVBQUVBLENBQWNBO1lBQ2hCQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFpQkE7WUF0QnZCQSxTQUFJQSxHQUFRQSxJQUFJQSxDQUFDQTtZQUlqQkEsYUFBUUEsR0FBR0E7Z0JBQ2xCQSxzQ0FBc0NBO2dCQUN0Q0EsbUNBQW1DQTtnQkFDbkNBLGlDQUFpQ0E7Z0JBQ2pDQSx3Q0FBd0NBO2dCQUN4Q0EscUNBQXFDQTtnQkFDckNBLCtCQUErQkE7Z0JBQy9CQSxzQ0FBc0NBO2dCQUN0Q0EscUNBQXFDQSxDQUFDQSxDQUFDQTtZQUVoQ0EsZ0JBQVdBLEdBQUdBO2dCQUNyQkEsaUNBQWlDQSxDQUFDQSxDQUFDQTtZQVFuQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLHdCQUFxQkEsRUFBRUEsQ0FBQ0E7UUFFakRBLENBQUNBO1FBRURELHNDQUFrQkEsR0FBbEJBLFVBQW1CQSxHQUFXQSxFQUFFQSxPQUFlQSxFQUFFQSxNQUFpQkEsRUFBRUEsU0FBeUJBO1lBQXpCRSx5QkFBeUJBLEdBQXpCQSxnQkFBeUJBO1lBQzVGQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFXQSxDQUFDQTtZQUNuQ0EsSUFBSUEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFFN0NBLElBQUlBLGNBQWNBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLHVCQUF1QkEsRUFBRUEsQ0FBQ0E7WUFFdERBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzVCQSxjQUFjQSxDQUFDQSxhQUFhQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUN4Q0EsY0FBY0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0Esc0JBQXNCQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUU1REEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7Z0JBQ3pDQSxjQUFjQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1REEsQ0FBQ0E7WUFFREEsSUFBSUEsT0FBT0EsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7WUFFckRBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBRXRCQSxLQUFFQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBO2lCQUM3QkEsSUFBSUEsQ0FBQ0E7Z0JBQ0xBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQ3RCQSxDQUFDQSxFQUFFQSxVQUFBQSxDQUFDQTtnQkFDSEEsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBLENBQUNBLENBQUNBO1lBRUpBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3BCQSxDQUFDQTtRQUVERixxQ0FBaUJBLEdBQWpCQTtZQUFBRyxpQkE4Q0NBO1lBN0NBQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFXQSxDQUFDQTtZQUVuQ0EsSUFBSUEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFDN0NBLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQ3ZFQSxJQUFJQSxPQUFPQSxHQUFHQSxXQUFXQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUVwQ0EsSUFBSUEsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtZQUMzRUEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsWUFBWUEsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFFN0NBLEtBQUVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7aUJBQzdCQSxJQUFJQSxDQUFDQTtnQkFDSkEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDdkJBLENBQUNBLEVBQUVBLFVBQUFBLENBQUNBO2dCQUNIQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxpQkFBaUJBLEVBQUVBLEtBQUtBLDBCQUEwQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFEQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxFQUFFQSxDQUFDQSx1QkFBdUJBLEVBQUVBLENBQUNBO29CQUNoREEsUUFBUUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxFQUFFQSxDQUFDQSxrQkFBa0JBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUMxREEsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7b0JBQzdDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO29CQUNqREEsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDL0JBLFFBQVFBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esc0NBQXNDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDcEZBLElBQUlBLFVBQVVBLEdBQUdBLE9BQU9BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO29CQUNuREEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsWUFBWUEsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7b0JBRWhEQSxLQUFFQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBO3lCQUM3QkEsSUFBSUEsQ0FBQ0E7d0JBQ0xBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFDQSxDQUFDQSxDQUFDQTt5QkFDREEsSUFBSUEsQ0FBQ0E7d0JBQ0xBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO29CQUN0QkEsQ0FBQ0EsQ0FBQ0E7eUJBQ0RBLEtBQUtBLENBQUNBLFVBQUFBLENBQUNBO3dCQUNQQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDNUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNKQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtnQkFDYkEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNQQSxJQUFJQSxRQUFRQSxHQUFHQSxLQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtvQkFDL0JBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNuQkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ3pCQSxDQUFDQTtZQUNGQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ1BBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVKQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFFREgsK0JBQVdBLEdBQVhBLFVBQVlBLE1BQWlCQTtZQUE3QkksaUJBdUJDQTtZQXRCQUEsSUFBSUEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFFMUJBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLFVBQUFBLElBQUlBO2dCQUNqQ0EsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBU0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDckNBLENBQUNBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQSxVQUFBQSxJQUFJQTtnQkFDVEEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBQ0EsSUFBSUEsRUFBRUEsSUFBSUE7b0JBQy9DQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxrQkFBa0JBLENBQUNBLEtBQUlBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLEVBQVFBLElBQUlBLENBQUNBLElBQUlBLENBQUVBLENBQUNBLElBQUlBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO2dCQUN4RkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDTEEsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLElBQUlBLENBQUNBO2dCQUNMQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtZQUNmQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQ0EsQ0FBd0NBO2dCQUMvQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbERBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNQQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDZkEsQ0FBQ0E7WUFDRkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFSkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDcEJBLENBQUNBO1FBRURKLDJDQUF1QkEsR0FBdkJBO1lBQ0NLLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLEVBQVdBLENBQUNBO1lBQ25DQSxJQUFJQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUU3Q0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsRUFBRUEsMEJBQTBCQSxDQUFDQSxDQUFDQTtZQUU1REEsS0FBRUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQTtpQkFDN0JBLElBQUlBLENBQUNBO2dCQUNMQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSw0QkFBNEJBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUN2RkEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1BBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLEtBQUtBLENBQUNBLFVBQUFBLENBQUNBO2dCQUNQQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDSkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDcEJBLENBQUNBO1FBRURMLDhDQUEwQkEsR0FBMUJBO1lBQUFNLGlCQTRCQ0E7WUEzQkFBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLEVBQVdBLENBQUNBO1lBRW5DQSxJQUFJQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUM3Q0EsSUFBSUEsV0FBV0EsR0FBR0EsSUFBSUEsRUFBRUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDdkVBLElBQUlBLFdBQVdBLEdBQUdBLFdBQVdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0E7WUFDaEVBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBRTFCQSxLQUFFQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBO2lCQUM3QkEsSUFBSUEsQ0FBQ0E7Z0JBQ0xBLElBQUlBLFVBQVVBLEdBQUdBLFdBQVdBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO2dCQUM3Q0EsSUFBSUEsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ3JCQSxPQUFPQSxVQUFVQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDOUJBLElBQUlBLE1BQU1BLEdBQUdBLFVBQVVBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO29CQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BEQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDbEJBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO29CQUNqQkEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBO2dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDZkEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQTtZQUNGQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ1BBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNKQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFFT04sK0JBQVdBLEdBQW5CQSxVQUFvQkEsS0FBYUE7WUFDaENPLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1FBQ3ZDQSxDQUFDQTtRQUVPUCx1Q0FBbUJBLEdBQTNCQSxVQUE0QkEsT0FBZ0JBO1lBQTVDUSxpQkFtQ0NBO1lBbENBQSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFPQSxDQUFDQTtZQUUvQkEsSUFBSUEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFDN0NBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLHVCQUF1QkEsRUFBRUEsQ0FBQ0E7WUFDaERBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQzlDQSxRQUFRQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzVDQSxJQUFJQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUM3Q0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7WUFFckRBLEtBQUVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7aUJBQzdCQSxJQUFJQSxDQUFDQTtnQkFDTEEsSUFBSUEsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsMEJBQTBCQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNoR0EsSUFBSUEsYUFBYUEsR0FBR0EsUUFBUUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxvQkFBb0JBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUUvRkEsSUFBSUEsaUJBQWlCQSxHQUFHQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pHQSxJQUFJQSxVQUFVQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSx1QkFBdUJBLEVBQUVBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQzNFQSxJQUFJQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSwwQkFBMEJBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUM3RUEsSUFBSUEsVUFBVUEsR0FBR0EsT0FBT0EsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxvQkFBb0JBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUUzRkEsSUFBSUEsaUJBQWlCQSxHQUFHQSxVQUFVQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtnQkFDOUVBLElBQUlBLE9BQU9BLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7Z0JBQzlDQSxhQUFhQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFekNBLE1BQU1BLENBQUNBLEtBQUVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQTtnQkFDTEEsR0FBR0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7WUFDZkEsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLEtBQUtBLENBQUNBLFVBQUFBLENBQUNBO2dCQUNQQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNmQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVKQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFsT1lSLGlCQUFPQSxHQUFHQTtZQUNiQSxnQkFBZ0JBO1lBQ3pCQSxnQkFBZ0JBO1lBQ2hCQSxRQUFRQTtZQUNSQSxJQUFJQTtZQUNKQSxPQUFPQTtTQUNEQSxDQUFDQTtRQTZOTkEsZ0JBQUNBO0lBQURBLENBcE9BdEQsQUFvT0NzRCxJQUFBdEQ7SUFwT1lBLFlBQVNBLFlBb09yQkEsQ0FBQUE7SUFFSkEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtBQUNuRUEsQ0FBQ0EsRUF4T1MsRUFBRSxLQUFGLEVBQUUsUUF3T1g7QUMxT0EsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQXVFWDtBQXZFRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQUErRDtRQW1FQUMsQ0FBQ0E7UUFsRUFELHNCQUFXQSxvQkFBT0E7aUJBQWxCQTtnQkFDQ0UsTUFBTUEsQ0FBQ0E7b0JBQ05BLGNBQWNBLEVBQUVBLDBCQUEwQkE7b0JBQzFDQSxnQkFBZ0JBLEVBQUVBLDRCQUE0QkE7b0JBQzlDQSxjQUFjQSxFQUFFQSxhQUFhQTtvQkFDN0JBLFNBQVNBLEVBQUVBLDBCQUEwQkE7b0JBQ3JDQSxVQUFVQSxFQUFFQSxpRUFBaUVBO29CQUM3RUEsV0FBV0EsRUFBRUEsYUFBYUE7b0JBQzFCQSxZQUFZQSxFQUFFQSxRQUFRQTtvQkFDdEJBLGlCQUFpQkEsRUFBRUEsd0JBQXdCQTtvQkFDM0NBLGFBQWFBLEVBQUVBLFdBQVdBO29CQUMxQkEsc0JBQXNCQSxFQUFFQSxrY0FHb05BO29CQUM1T0EsZUFBZUEsRUFBRUEsNENBQTRDQTt3QkFDN0RBLHFLQUFxS0E7d0JBQ3BLQSwyQ0FBMkNBO3dCQUMzQ0EsaUNBQWlDQTt3QkFDakNBLHVEQUF1REE7d0JBQ3ZEQSwrQkFBK0JBO3dCQUMvQkEsbUJBQW1CQTt3QkFDbkJBLDBCQUEwQkE7d0JBQzFCQSxpQ0FBaUNBO3dCQUNqQ0EsWUFBWUE7d0JBQ1pBLFdBQVdBO3dCQUNYQSxpQ0FBaUNBO3dCQUNqQ0EseUNBQXlDQTt3QkFDekNBLHFDQUFxQ0E7d0JBQ3JDQSxtQ0FBbUNBO3dCQUNuQ0EsNkJBQTZCQTt3QkFDN0JBLDZCQUE2QkE7d0JBQzdCQSw2QkFBNkJBO3dCQUM3QkEsZ0JBQWdCQTt3QkFDaEJBLGNBQWNBO3dCQUNkQSwrQkFBK0JBO3dCQUMvQkEsb0JBQW9CQTt3QkFDcEJBLG9CQUFvQkE7d0JBQ3BCQSxpRUFBaUVBO3dCQUNqRUEsa0VBQWtFQTt3QkFDbEVBLHNCQUFzQkE7d0JBQ3RCQSwrR0FBK0dBO3dCQUMvR0EsNkVBQTZFQTt3QkFDN0VBLGlGQUFpRkE7d0JBQ2pGQSw0RUFBNEVBO3dCQUM1RUEsWUFBWUE7d0JBQ1ZBLGdJQUFnSUE7d0JBQ2hJQSxnR0FBZ0dBO3dCQUNoR0EseUVBQXlFQTt3QkFDMUVBLGVBQWVBO3dCQUNoQkEsaUZBQWlGQTt3QkFDbEZBLFlBQVlBO2lCQUNaQSxDQUFBQTtZQUNGQSxDQUFDQTs7O1dBQUFGO1FBYUZBLGdCQUFDQTtJQUFEQSxDQW5FQS9ELEFBbUVDK0QsSUFBQS9EO0lBbkVZQSxZQUFTQSxZQW1FckJBLENBQUFBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsRUFBRUEsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7QUFDekVBLENBQUNBLEVBdkVTLEVBQUUsS0FBRixFQUFFLFFBdUVYO0FDekVBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0F1Qlg7QUF2QkQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNiQTtRQUFBa0U7UUFtQkFDLENBQUNBO1FBbEJBRCxzQkFBSUEsR0FBSkEsVUFBS0EsR0FBVUEsRUFBRUEsSUFBV0EsRUFBRUEsZUFBc0JBO1lBQ25ERSxJQUFJQSxZQUFZQSxHQUFHQSxlQUFlQSxHQUFHQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUUvQ0EsSUFBSUEsTUFBTUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUEsR0FBR0EsWUFBWUEsRUFBRUEsQ0FBQ0E7WUFDN0ZBLElBQUlBLFdBQVdBLEdBQUdBLFFBQVFBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ25FQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUV2Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDYkEsQ0FBQ0E7UUFDREYsc0JBQUlBLEdBQUpBLFVBQU1BLEdBQVVBO1lBQ2ZHLElBQUlBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2dCQUNmQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUNEQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUVsQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUEsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUVBLENBQUNBO1FBQ0ZILGNBQUNBO0lBQURBLENBbkJBbEUsQUFtQkNrRSxJQUFBbEU7SUFuQllBLFVBQU9BLFVBbUJuQkEsQ0FBQUE7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtBQUMvREEsQ0FBQ0EsRUF2QlMsRUFBRSxLQUFGLEVBQUUsUUF1Qlg7QUN6QkEsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQWNYO0FBZEQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNiQTtRQUFBc0U7UUFZQUMsQ0FBQ0E7UUFYT0Qsc0JBQW1CQSxHQUExQkEsVUFBOEJBLEdBQXFCQSxFQUFFQSxJQUFRQTtZQUM1REUsSUFBSUEsRUFBRUEsR0FBR0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBZUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLElBQUlBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBQ3JCQSxHQUFHQSxDQUFDQSxpQkFBaUJBLENBQUNBO2dCQUNyQkEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLENBQUNBLEVBQUVBLFVBQUNBLE1BQU1BLEVBQUVBLElBQUlBO2dCQUNmQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNsQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFSEEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDcEJBLENBQUNBO1FBQ0ZGLFNBQUNBO0lBQURBLENBWkF0RSxBQVlDc0UsSUFBQXRFO0lBWllBLEtBQUVBLEtBWWRBLENBQUFBO0FBQ0ZBLENBQUNBLEVBZFMsRUFBRSxLQUFGLEVBQUUsUUFjWDtBQ2hCQywrQ0FBK0M7QUFHakQsOERBQThEO0FBRzlELHlDQUF5QztBQUd6QywrQkFBK0I7QUFHL0IseUNBQXlDO0FBQ3pDLHFEQUFxRDtBQUNyRCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBRy9DLG9EQUFvRDtBQUlwRCxnREFBZ0Q7QUFDaEQscURBQXFEO0FBQ3JELG1EQUFtRDtBQUNuRCxtREFBbUQ7QUFDbkQsaURBQWlEO0FBQ2pELHNEQUFzRDtBQUN0RCxvREFBb0Q7QUFHcEQsaURBQWlEO0FBR2pELG1EQUFtRDtBQUNuRCxzREFBc0Q7QUFDdEQsbURBQW1EO0FBQ25ELDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsNENBQTRDO0FBQzVDLCtDQUErQyIsImZpbGUiOiJzbi5hcHAuanMiLCJzb3VyY2VSb290IjoiLi4vbmcifQ==
