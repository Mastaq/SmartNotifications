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
                _this.toastr.success("", "Licensed applied", { timeOut: 2000 });
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
        SPColorService.prototype.getElementBackground = function (selector) {
            return this.$(selector).css("background-color");
        };
        SPColorService.prototype.getSuiteBarBackground = function () {
            return this.getElementBackground("#suiteBarLeft");
        };
        SPColorService.prototype.applyBackgrounds = function () {
            var background = this.getElementBackground(".ms-rteTable-1 tr.ms-rteTableHeaderRow-1");
            this.$("head").append(String.format("<style type='text/css'>#sn-view {{background-color:{0};}} </style>", background));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy9BcHBTZXR0aW5nc1JlcG9zaXRvcnkudHMiLCJjb21tb24vRmllbGRzLnRzIiwiYXBwLnRzIiwibW9kZWwvQ29udGV4dC50cyIsIm1vZGVsL0FwcFNldHRpbmdzQmFzZUl0ZW0udHMiLCJtb2RlbC9Db21tb25BcHBTZXR0aW5ncy50cyIsIm1vZGVsL05vdGlmaWNhdGlvbnMudHMiLCJmYWN0b3JpZXMvVmVuZG9yc0ZhY3RvcnkudHMiLCJjb250cm9sbGVycy9Ib21lQ3RybC50cyIsImNvbnRyb2xsZXJzL0Nocm9tZU5hdkN0cmwudHMiLCJjb250cm9sbGVycy9TaWRlTmF2Q3RybC50cyIsImNvbnRyb2xsZXJzL0FwcExvYWRDdHJsLnRzIiwiY29udHJvbGxlcnMvT25PZmZDdHJsLnRzIiwiY29udHJvbGxlcnMvQ29udGFjdERldkN0cmwudHMiLCJjb250cm9sbGVycy9BY3RpdmF0ZUN0cmwudHMiLCJpbnRlcmZhY2VzL0lDdHJsU2NvcGUudHMiLCJzZXJ2aWNlcy9Db250ZXh0U2VydmljZS50cyIsInNlcnZpY2VzL1BsZWFzZVdhaXRTZXJ2aWNlLnRzIiwic2VydmljZXMvU1BDb2xvclNlcnZpY2UudHMiLCJzZXJ2aWNlcy9TUFNlcnZpY2UudHMiLCJzZXJ2aWNlcy9Db25zdGFudHMudHMiLCJzZXJ2aWNlcy9TdG9yYWdlLnRzIiwic2VydmljZXMvRXh0ZW5zaW9ucy50cyIsIl9yZWZlcmVuY2VzLnRzIl0sIm5hbWVzIjpbIlNOIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5IiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5LmNvbnN0cnVjdG9yIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5Ll9jcmVhdGVEZWZlcnJlZCIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeS5nZXRTZXR0aW5nc0J5S2V5IiwiU04uRmllbGRzIiwiU04uQ29udGV4dCIsIlNOLkNvbnRleHQuY29uc3RydWN0b3IiLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5jb25zdHJ1Y3RvciIsIlNOLkFwcFNldHRpbmdzQmFzZUl0ZW0ubWFwRnJvbUxpc3RJdGVtIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5tYXBUb0xpc3RJdGVtIiwiU04uQ29tbW9uQXBwU2V0dGluZ3MiLCJTTi5Db21tb25BcHBTZXR0aW5ncy5jb25zdHJ1Y3RvciIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbSIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbS5jb25zdHJ1Y3RvciIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbS5tYXBGcm9tTGlzdEl0ZW0iLCJTTi5Ob3RpZmljYXRpb25zQmFzZUl0ZW0ubWFwVG9MaXN0SXRlbSIsIlNOLlZlbmRvcnNGYWN0b3J5IiwiU04uSG9tZUN0cmwiLCJTTi5Ib21lQ3RybC5jb25zdHJ1Y3RvciIsIlNOLkNocm9tZU5hdkN0cmwiLCJTTi5DaHJvbWVOYXZDdHJsLmNvbnN0cnVjdG9yIiwiU04uU2lkZU5hdkN0cmwiLCJTTi5TaWRlTmF2Q3RybC5jb25zdHJ1Y3RvciIsIlNOLkVycm9yVHlwZXMiLCJTTi5BcHBMb2FkQ3RybCIsIlNOLkFwcExvYWRDdHJsLmNvbnN0cnVjdG9yIiwiU04uQXBwTG9hZEN0cmwuZ28iLCJTTi5BcHBMb2FkQ3RybC5sb2FkTGljZW5zZSIsIlNOLkFwcExvYWRDdHJsLm9uRXJyb3IiLCJTTi5Pbk9mZkN0cmwiLCJTTi5Pbk9mZkN0cmwuY29uc3RydWN0b3IiLCJTTi5Pbk9mZkN0cmwub25FcnJvciIsIlNOLkNvbnRhY3REZXZDdHJsIiwiU04uQ29udGFjdERldkN0cmwuY29uc3RydWN0b3IiLCJTTi5BY3RpdmF0ZUN0cmwiLCJTTi5BY3RpdmF0ZUN0cmwuY29uc3RydWN0b3IiLCJTTi5BY3RpdmF0ZUN0cmwuYWN0aXZhdGUiLCJTTi5Db250ZXh0U2VydmljZSIsIlNOLkNvbnRleHRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0UGFyYW1ldGVyQnlOYW1lIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0V2ViVXJsIiwiU04uQ29udGV4dFNlcnZpY2UuZW5kc1dpdGgiLCJTTi5QbGVhc2VXYWl0U2VydmljZSIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uUGxlYXNlV2FpdFNlcnZpY2Uuc3RhcnQiLCJTTi5QbGVhc2VXYWl0U2VydmljZS5jbG9zZSIsIlNOLlNQQ29sb3JTZXJ2aWNlIiwiU04uU1BDb2xvclNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5TUENvbG9yU2VydmljZS5nZXRFbGVtZW50QmFja2dyb3VuZCIsIlNOLlNQQ29sb3JTZXJ2aWNlLmdldFN1aXRlQmFyQmFja2dyb3VuZCIsIlNOLlNQQ29sb3JTZXJ2aWNlLmFwcGx5QmFja2dyb3VuZHMiLCJTTi5TUFNlcnZpY2UiLCJTTi5TUFNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5TUFNlcnZpY2UudXBsb2FkRmlsZVRvRm9sZGVyIiwiU04uU1BTZXJ2aWNlLmNyZWF0ZUhvc3RMaWJyYXJ5IiwiU04uU1BTZXJ2aWNlLnVwbG9hZEZpbGVzIiwiU04uU1BTZXJ2aWNlLmRvZXNVc2VySGF2ZUZ1bGxDb250cm9sIiwiU04uU1BTZXJ2aWNlLmdldEhvc3RDdXN0b21pemF0aW9uU3RhdHVzIiwiU04uU1BTZXJ2aWNlLmdldEZpbGVOYW1lIiwiU04uU1BTZXJ2aWNlLmNyZWF0ZU1hbmFnZUFwcFZpZXciLCJTTi5Db25zdGFudHMiLCJTTi5Db25zdGFudHMuY29uc3RydWN0b3IiLCJTTi5Db25zdGFudHMuRGVmYXVsdCIsIlNOLlN0b3JhZ2UiLCJTTi5TdG9yYWdlLmNvbnN0cnVjdG9yIiwiU04uU3RvcmFnZS5zYXZlIiwiU04uU3RvcmFnZS5sb2FkIiwiU04uRXgiLCJTTi5FeC5jb25zdHJ1Y3RvciIsIlNOLkV4LmV4ZWN1dGVRdWVyeVByb21pc2UiXSwibWFwcGluZ3MiOiJBQUFDLDBDQUEwQzs7Ozs7O0FBRTNDLElBQVUsRUFBRSxDQXNCWDtBQXRCRCxXQUFVLEVBQUUsRUFBQyxDQUFD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QUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBRTFCQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFBQSxJQUFJQTtnQkFDakNBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQVNBLElBQUlBLENBQUNBLENBQUNBO1lBQ3JDQSxDQUFDQSxDQUFDQSxDQUFDQTtpQkFDREEsSUFBSUEsQ0FBQ0EsVUFBQUEsSUFBSUE7Z0JBQ1RBLE1BQU1BLENBQUNBLEtBQUlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLFVBQUNBLElBQUlBLEVBQUVBLElBQUlBO29CQUMvQ0EsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFRQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFFQSxDQUFDQSxJQUFJQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDeEZBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ0xBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQTtnQkFDTEEsR0FBR0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7WUFDZkEsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLEtBQUtBLENBQUNBLFVBQUNBLENBQXdDQTtnQkFDL0NBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLEVBQUVBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ2xEQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDUEEsR0FBR0Es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
