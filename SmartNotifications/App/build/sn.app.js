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
            this.$("head").append(String.format("<style type='text/css'>#sn-view, #sn-side, .navigation-menu > ul {{background-color:{0};}} </style>", background));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy9BcHBTZXR0aW5nc1JlcG9zaXRvcnkudHMiLCJjb21tb24vRmllbGRzLnRzIiwiYXBwLnRzIiwibW9kZWwvQ29udGV4dC50cyIsIm1vZGVsL0FwcFNldHRpbmdzQmFzZUl0ZW0udHMiLCJtb2RlbC9Db21tb25BcHBTZXR0aW5ncy50cyIsIm1vZGVsL05vdGlmaWNhdGlvbnMudHMiLCJmYWN0b3JpZXMvVmVuZG9yc0ZhY3RvcnkudHMiLCJjb250cm9sbGVycy9Ib21lQ3RybC50cyIsImNvbnRyb2xsZXJzL0Nocm9tZU5hdkN0cmwudHMiLCJjb250cm9sbGVycy9TaWRlTmF2Q3RybC50cyIsImNvbnRyb2xsZXJzL0FwcExvYWRDdHJsLnRzIiwiY29udHJvbGxlcnMvT25PZmZDdHJsLnRzIiwiY29udHJvbGxlcnMvQ29udGFjdERldkN0cmwudHMiLCJjb250cm9sbGVycy9BY3RpdmF0ZUN0cmwudHMiLCJpbnRlcmZhY2VzL0lDdHJsU2NvcGUudHMiLCJzZXJ2aWNlcy9Db250ZXh0U2VydmljZS50cyIsInNlcnZpY2VzL1BsZWFzZVdhaXRTZXJ2aWNlLnRzIiwic2VydmljZXMvU1BDb2xvclNlcnZpY2UudHMiLCJzZXJ2aWNlcy9TUFNlcnZpY2UudHMiLCJzZXJ2aWNlcy9Db25zdGFudHMudHMiLCJzZXJ2aWNlcy9TdG9yYWdlLnRzIiwic2VydmljZXMvRXh0ZW5zaW9ucy50cyIsIl9yZWZlcmVuY2VzLnRzIl0sIm5hbWVzIjpbIlNOIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5IiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5LmNvbnN0cnVjdG9yIiwiU04uQXBwU2V0dGluZ3NSZXBvc2l0b3J5Ll9jcmVhdGVEZWZlcnJlZCIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeS5nZXRTZXR0aW5nc0J5S2V5IiwiU04uRmllbGRzIiwiU04uQ29udGV4dCIsIlNOLkNvbnRleHQuY29uc3RydWN0b3IiLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5jb25zdHJ1Y3RvciIsIlNOLkFwcFNldHRpbmdzQmFzZUl0ZW0ubWFwRnJvbUxpc3RJdGVtIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbS5tYXBUb0xpc3RJdGVtIiwiU04uQ29tbW9uQXBwU2V0dGluZ3MiLCJTTi5Db21tb25BcHBTZXR0aW5ncy5jb25zdHJ1Y3RvciIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbSIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbS5jb25zdHJ1Y3RvciIsIlNOLk5vdGlmaWNhdGlvbnNCYXNlSXRlbS5tYXBGcm9tTGlzdEl0ZW0iLCJTTi5Ob3RpZmljYXRpb25zQmFzZUl0ZW0ubWFwVG9MaXN0SXRlbSIsIlNOLlZlbmRvcnNGYWN0b3J5IiwiU04uSG9tZUN0cmwiLCJTTi5Ib21lQ3RybC5jb25zdHJ1Y3RvciIsIlNOLkNocm9tZU5hdkN0cmwiLCJTTi5DaHJvbWVOYXZDdHJsLmNvbnN0cnVjdG9yIiwiU04uU2lkZU5hdkN0cmwiLCJTTi5TaWRlTmF2Q3RybC5jb25zdHJ1Y3RvciIsIlNOLkVycm9yVHlwZXMiLCJTTi5BcHBMb2FkQ3RybCIsIlNOLkFwcExvYWRDdHJsLmNvbnN0cnVjdG9yIiwiU04uQXBwTG9hZEN0cmwuZ28iLCJTTi5BcHBMb2FkQ3RybC5sb2FkTGljZW5zZSIsIlNOLkFwcExvYWRDdHJsLm9uRXJyb3IiLCJTTi5Pbk9mZkN0cmwiLCJTTi5Pbk9mZkN0cmwuY29uc3RydWN0b3IiLCJTTi5Pbk9mZkN0cmwub25FcnJvciIsIlNOLkNvbnRhY3REZXZDdHJsIiwiU04uQ29udGFjdERldkN0cmwuY29uc3RydWN0b3IiLCJTTi5BY3RpdmF0ZUN0cmwiLCJTTi5BY3RpdmF0ZUN0cmwuY29uc3RydWN0b3IiLCJTTi5BY3RpdmF0ZUN0cmwuYWN0aXZhdGUiLCJTTi5Db250ZXh0U2VydmljZSIsIlNOLkNvbnRleHRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0UGFyYW1ldGVyQnlOYW1lIiwiU04uQ29udGV4dFNlcnZpY2UuZ2V0V2ViVXJsIiwiU04uQ29udGV4dFNlcnZpY2UuZW5kc1dpdGgiLCJTTi5QbGVhc2VXYWl0U2VydmljZSIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlLmNvbnN0cnVjdG9yIiwiU04uUGxlYXNlV2FpdFNlcnZpY2Uuc3RhcnQiLCJTTi5QbGVhc2VXYWl0U2VydmljZS5jbG9zZSIsIlNOLlNQQ29sb3JTZXJ2aWNlIiwiU04uU1BDb2xvclNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5TUENvbG9yU2VydmljZS5nZXRFbGVtZW50QmFja2dyb3VuZCIsIlNOLlNQQ29sb3JTZXJ2aWNlLmdldFN1aXRlQmFyQmFja2dyb3VuZCIsIlNOLlNQQ29sb3JTZXJ2aWNlLmFwcGx5QmFja2dyb3VuZHMiLCJTTi5TUFNlcnZpY2UiLCJTTi5TUFNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5TUFNlcnZpY2UudXBsb2FkRmlsZVRvRm9sZGVyIiwiU04uU1BTZXJ2aWNlLmNyZWF0ZUhvc3RMaWJyYXJ5IiwiU04uU1BTZXJ2aWNlLnVwbG9hZEZpbGVzIiwiU04uU1BTZXJ2aWNlLmRvZXNVc2VySGF2ZUZ1bGxDb250cm9sIiwiU04uU1BTZXJ2aWNlLmdldEhvc3RDdXN0b21pemF0aW9uU3RhdHVzIiwiU04uU1BTZXJ2aWNlLmdldEZpbGVOYW1lIiwiU04uU1BTZXJ2aWNlLmNyZWF0ZU1hbmFnZUFwcFZpZXciLCJTTi5Db25zdGFudHMiLCJTTi5Db25zdGFudHMuY29uc3RydWN0b3IiLCJTTi5Db25zdGFudHMuRGVmYXVsdCIsIlNOLlN0b3JhZ2UiLCJTTi5TdG9yYWdlLmNvbnN0cnVjdG9yIiwiU04uU3RvcmFnZS5zYXZlIiwiU04uU3RvcmFnZS5sb2FkIiwiU04uRXgiLCJTTi5FeC5jb25zdHJ1Y3RvciIsIlNOLkV4LmV4ZWN1dGVRdWVyeVByb21pc2UiXSwibWFwcGluZ3MiOiJBQUFDLDBDQUEwQzs7Ozs7O0FBRTNDLElBQVUsRUFBRSxDQXNCWDtBQXRCRCxXQUFVLEVBQUUsRUFBQyxDQUFD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
