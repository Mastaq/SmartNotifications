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
                .menuItem("SideNav.permissions", {
                text: "[Permissions]",
                iconClass: "glyphicon-th-list",
                target: "_blank",
                href: "#"
            })
                .menuItem("SideNav.updates", {
                text: "[Check for Updates]",
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
        function AppLoadCtrl($scope, colorService, pleaseWait, spservice, $log, toastr, consts, $http, $q, context) {
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
            this.hasPermissions = false;
            this.permissionChecked = false;
            $scope.vm = this;
            this.pleaseWait.start(colorService.getSuiteBarBackground());
            this.colorService.applyBackgrounds();
            spservice.doesUserHaveFullControl()
                .then(function (appSettings) {
                _this.hasPermissions = true;
                return _this.spservice.createHostLibrary();
            })
                .then(function () {
                var settings = new SN.CommonAppSettings();
                settings.version = _this.context.version;
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
            });
        }
        AppLoadCtrl.prototype.onError = function (err) {
            if (err instanceof SPListRepo.RequestError) {
                this.$log.error(err.message);
                this.$log.error(err.stackTrace);
            }
            else {
                this.$log.error(err);
            }
            this.toastr.error(this.consts.ContactDev, this.consts.WentWrong, { timeOut: 10000 });
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
            "ContextService"
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
            this.manageStatus = SPListRepo.Helper.ensureTrailingSlash(this.context.hostUrl) + "test/my.html";
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
        function SPService(vendorsFactory, context, consts, $q, $http) {
            this.context = context;
            this.consts = consts;
            this.$q = $q;
            this.$http = $http;
            this.wait = null;
            this.fileList = [
                "./../HostWeb/knockout.js",
                "./../HostWeb/sn.scriptlink.js"];
            this.pageUrl = "./../HostWeb/JSInject.tmpl";
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
                return _this.createManageAppView(library);
            })
                .catch(function (e) {
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
                .then(function () {
                dfd.resolve(library);
            })
                .catch(function (e) {
                dfd.reject(new SPListRepo.RequestError(e));
            });
            return dfd.promise;
        };
        SPService.prototype.uploadFiles = function (folder) {
            var _this = this;
            var defList = [];
            for (var i = 0; i < this.fileList.length; i++) {
                var file = this.fileList[i];
                (function (file) {
                    defList.push(_this.$http.get(file)
                        .success(function (data) {
                        defList.push(_this.uploadFileToFolder(_this.getFileName(file), data, folder));
                    }));
                })(file);
            }
            return this.$q.all(defList);
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
            var dfd = this.$q.defer();
            var wpstr = "<webParts>  <webPart xmlns=\"http://schemas.microsoft.com/WebPart/v3\">    <metaData>      <type name=\"Microsoft.SharePoint.WebPartPages.ScriptEditorWebPart, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c\" />      <importErrorMessage>Cannot import this Web Part.</importErrorMessage>    </metaData>    <data>      <properties>        <property name=\"ExportMode\" type=\"exportmode\">All</property>        <property name=\"HelpUrl\" type=\"string\" />        <property name=\"Hidden\" type=\"bool\">False</property>        <property name=\"Description\" type=\"string\">Allows authors to insert HTML snippets or scripts.</property>        <property name=\"Content\" type=\"string\">&lt;div&gt;hello!&lt;/div&gt;</property>        <property name=\"CatalogIconImageUrl\" type=\"string\" />        <property name=\"Title\" type=\"string\">Script Editor</property>        <property name=\"AllowHide\" type=\"bool\">True</property>        <property name=\"AllowMinimize\" type=\"bool\">True</property>        <property name=\"AllowZoneChange\" type=\"bool\">True</property>        <property name=\"TitleUrl\" type=\"string\" />        <property name=\"ChromeType\" type=\"chrometype\">None</property>        <property name=\"AllowConnect\" type=\"bool\">True</property>        <property name=\"Width\" type=\"unit\" />        <property name=\"Height\" type=\"unit\" />        <property name=\"HelpMode\" type=\"helpmode\">Navigate</property>        <property name=\"AllowEdit\" type=\"bool\">True</property>        <property name=\"TitleIconImageUrl\" type=\"string\" />        <property name=\"Direction\" type=\"direction\">NotSet</property>        <property name=\"AllowClose\" type=\"bool\">True</property>        <property name=\"ChromeState\" type=\"chromestate\">Normal</property>      </properties>    </data>  </webPart></webParts>";
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
                var hostWPManager = viewFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                var viewWebParts = hostWPManager.get_webParts();
                context.load(viewWebParts);
                return SN.Ex.executeQueryPromise(context, { viewWebParts: viewWebParts, hostWPManager: hostWPManager });
            })
                .then(function (data) {
                var wpEnumerator = data.viewWebParts.getEnumerator();
                while (wpEnumerator.moveNext()) {
                    var currentWp = wpEnumerator.get_current();
                    currentWp.deleteWebPart();
                }
                var appWebRelativeUrl = SPListRepo.Helper.ensureTrailingSlash(context.get_web().get_serverRelativeUrl());
                var appFileUrl = String.format("{0}Pages/Default.aspx", appWebRelativeUrl);
                var appFile = library.get_parentWeb().getFileByServerRelativeUrl(appFileUrl);
                var appManager = appFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                var webPartDefinition = appManager.importWebPart(wpstr);
                var webPart = webPartDefinition.get_webPart();
                data.hostWPManager.addWebPart(webPart, "Main", 1);
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
                    HostPageName: "sn.html",
                    HostPageFolderUrl: "SmartNotificationsHost",
                    ManageAppView: "ManageApp"
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
/// <reference path="interfaces/ICtrlScope.ts" />
/// <reference path="services/ContextService.ts" />
/// <reference path="services/PleaseWaitService.ts" />
/// <reference path="services/SPColorService.ts" />
/// <reference path="services/SPService.ts" />
/// <reference path="services/Constants.ts" />
/// <reference path="services/Storage.ts" />
/// <reference path="services/Extensions.ts" />

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcG9zaXRvcmllcy9BcHBTZXR0aW5nc1JlcG9zaXRvcnkudHMiLCJjb21tb24vRmllbGRzLnRzIiwiYXBwLnRzIiwibW9kZWwvQ29udGV4dC50cyIsIm1vZGVsL0FwcFNldHRpbmdzQmFzZUl0ZW0udHMiLCJtb2RlbC9Db21tb25BcHBTZXR0aW5ncy50cyIsIm1vZGVsL05vdGlmaWNhdGlvbnMudHMiLCJmYWN0b3JpZXMvVmVuZG9yc0ZhY3RvcnkudHMiLCJjb250cm9sbGVycy9Ib21lQ3RybC50cyIsImNvbnRyb2xsZXJzL0Nocm9tZU5hdkN0cmwudHMiLCJjb250cm9sbGVycy9TaWRlTmF2Q3RybC50cyIsImNvbnRyb2xsZXJzL0FwcExvYWRDdHJsLnRzIiwiY29udHJvbGxlcnMvT25PZmZDdHJsLnRzIiwiaW50ZXJmYWNlcy9JQ3RybFNjb3BlLnRzIiwic2VydmljZXMvQ29udGV4dFNlcnZpY2UudHMiLCJzZXJ2aWNlcy9QbGVhc2VXYWl0U2VydmljZS50cyIsInNlcnZpY2VzL1NQQ29sb3JTZXJ2aWNlLnRzIiwic2VydmljZXMvU1BTZXJ2aWNlLnRzIiwic2VydmljZXMvQ29uc3RhbnRzLnRzIiwic2VydmljZXMvU3RvcmFnZS50cyIsInNlcnZpY2VzL0V4dGVuc2lvbnMudHMiLCJfcmVmZXJlbmNlcy50cyJdLCJuYW1lcyI6WyJTTiIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeSIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeS5jb25zdHJ1Y3RvciIsIlNOLkFwcFNldHRpbmdzUmVwb3NpdG9yeS5fY3JlYXRlRGVmZXJyZWQiLCJTTi5BcHBTZXR0aW5nc1JlcG9zaXRvcnkuZ2V0U2V0dGluZ3NCeUtleSIsIlNOLkZpZWxkcyIsIlNOLkNvbnRleHQiLCJTTi5Db250ZXh0LmNvbnN0cnVjdG9yIiwiU04uQXBwU2V0dGluZ3NCYXNlSXRlbSIsIlNOLkFwcFNldHRpbmdzQmFzZUl0ZW0uY29uc3RydWN0b3IiLCJTTi5BcHBTZXR0aW5nc0Jhc2VJdGVtLm1hcEZyb21MaXN0SXRlbSIsIlNOLkFwcFNldHRpbmdzQmFzZUl0ZW0ubWFwVG9MaXN0SXRlbSIsIlNOLkNvbW1vbkFwcFNldHRpbmdzIiwiU04uQ29tbW9uQXBwU2V0dGluZ3MuY29uc3RydWN0b3IiLCJTTi5Ob3RpZmljYXRpb25zQmFzZUl0ZW0iLCJTTi5Ob3RpZmljYXRpb25zQmFzZUl0ZW0uY29uc3RydWN0b3IiLCJTTi5Ob3RpZmljYXRpb25zQmFzZUl0ZW0ubWFwRnJvbUxpc3RJdGVtIiwiU04uTm90aWZpY2F0aW9uc0Jhc2VJdGVtLm1hcFRvTGlzdEl0ZW0iLCJTTi5WZW5kb3JzRmFjdG9yeSIsIlNOLkhvbWVDdHJsIiwiU04uSG9tZUN0cmwuY29uc3RydWN0b3IiLCJTTi5DaHJvbWVOYXZDdHJsIiwiU04uQ2hyb21lTmF2Q3RybC5jb25zdHJ1Y3RvciIsIlNOLlNpZGVOYXZDdHJsIiwiU04uU2lkZU5hdkN0cmwuY29uc3RydWN0b3IiLCJTTi5FcnJvclR5cGVzIiwiU04uQXBwTG9hZEN0cmwiLCJTTi5BcHBMb2FkQ3RybC5jb25zdHJ1Y3RvciIsIlNOLkFwcExvYWRDdHJsLm9uRXJyb3IiLCJTTi5Pbk9mZkN0cmwiLCJTTi5Pbk9mZkN0cmwuY29uc3RydWN0b3IiLCJTTi5Pbk9mZkN0cmwub25FcnJvciIsIlNOLkNvbnRleHRTZXJ2aWNlIiwiU04uQ29udGV4dFNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5Db250ZXh0U2VydmljZS5nZXRQYXJhbWV0ZXJCeU5hbWUiLCJTTi5Db250ZXh0U2VydmljZS5nZXRXZWJVcmwiLCJTTi5Db250ZXh0U2VydmljZS5lbmRzV2l0aCIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlIiwiU04uUGxlYXNlV2FpdFNlcnZpY2UuY29uc3RydWN0b3IiLCJTTi5QbGVhc2VXYWl0U2VydmljZS5zdGFydCIsIlNOLlBsZWFzZVdhaXRTZXJ2aWNlLmNsb3NlIiwiU04uU1BDb2xvclNlcnZpY2UiLCJTTi5TUENvbG9yU2VydmljZS5jb25zdHJ1Y3RvciIsIlNOLlNQQ29sb3JTZXJ2aWNlLmdldEVsZW1lbnRCYWNrZ3JvdW5kIiwiU04uU1BDb2xvclNlcnZpY2UuZ2V0U3VpdGVCYXJCYWNrZ3JvdW5kIiwiU04uU1BDb2xvclNlcnZpY2UuYXBwbHlCYWNrZ3JvdW5kcyIsIlNOLlNQU2VydmljZSIsIlNOLlNQU2VydmljZS5jb25zdHJ1Y3RvciIsIlNOLlNQU2VydmljZS51cGxvYWRGaWxlVG9Gb2xkZXIiLCJTTi5TUFNlcnZpY2UuY3JlYXRlSG9zdExpYnJhcnkiLCJTTi5TUFNlcnZpY2UudXBsb2FkRmlsZXMiLCJTTi5TUFNlcnZpY2UuZG9lc1VzZXJIYXZlRnVsbENvbnRyb2wiLCJTTi5TUFNlcnZpY2UuZ2V0SG9zdEN1c3RvbWl6YXRpb25TdGF0dXMiLCJTTi5TUFNlcnZpY2UuZ2V0RmlsZU5hbWUiLCJTTi5TUFNlcnZpY2UuY3JlYXRlTWFuYWdlQXBwVmlldyIsIlNOLkNvbnN0YW50cyIsIlNOLkNvbnN0YW50cy5jb25zdHJ1Y3RvciIsIlNOLkNvbnN0YW50cy5EZWZhdWx0IiwiU04uU3RvcmFnZSIsIlNOLlN0b3JhZ2UuY29uc3RydWN0b3IiLCJTTi5TdG9yYWdlLnNhdmUiLCJTTi5TdG9yYWdlLmxvYWQiLCJTTi5FeCIsIlNOLkV4LmNvbnN0cnVjdG9yIiwiU04uRXguZXhlY3V0ZVF1ZXJ5UHJvbWlzZSJdLCJtYXBwaW5ncyI6IkFBQUMsMENBQTBDOzs7Ozs7QUFFM0MsSUFBVSxFQUFFLENBc0JYO0FBdEJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFBMkNDLHlDQUE4Q0E7UUFFeEZBLCtCQUFZQSxFQUFZQTtZQUN2QkMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1JBLGtCQUFNQSxFQUFFQSxFQUFFQSxzQkFBbUJBLENBQUNBLENBQUNBO1lBQ2hDQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsa0JBQU1BLGFBQWFBLEVBQUVBLHNCQUFtQkEsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRVNELCtDQUFlQSxHQUF6QkE7WUFFQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsVUFBVUEsRUFBS0EsQ0FBQ0E7UUFDdkNBLENBQUNBO1FBRU1GLGdEQUFnQkEsR0FBdkJBLFVBQXdCQSxHQUFXQTtZQUNsQ0csSUFBSUEsY0FBY0EsR0FBR0EsV0FBV0EsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFakZBLE1BQU1BLENBQW1DQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0E7UUFDM0dBLENBQUNBO1FBQ0ZILDRCQUFDQTtJQUFEQSxDQXBCQUQsQUFvQkNDLEVBcEIwQ0QsVUFBVUEsQ0FBQ0EsY0FBY0EsRUFvQm5FQTtJQXBCWUEsd0JBQXFCQSx3QkFvQmpDQSxDQUFBQTtBQUNGQSxDQUFDQSxFQXRCUyxFQUFFLEtBQUYsRUFBRSxRQXNCWDtBQ3hCQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBR1g7QUFIRCxXQUFVLEVBQUU7SUFBQ0EsSUFBQUEsTUFBTUEsQ0FHbEJBO0lBSFlBLFdBQUFBLE1BQU1BLEVBQUNBLENBQUNBO1FBQ1RLLFVBQUdBLEdBQUdBLFFBQVFBLENBQUNBO1FBQ2ZBLFlBQUtBLEdBQUdBLFVBQVVBLENBQUNBO0lBQy9CQSxDQUFDQSxFQUhZTCxNQUFNQSxHQUFOQSxTQUFNQSxLQUFOQSxTQUFNQSxRQUdsQkE7QUFBREEsQ0FBQ0EsRUFIUyxFQUFFLEtBQUYsRUFBRSxRQUdYO0FDTEEsdUNBQXVDO0FBRXhDLElBQVUsRUFBRSxDQWlGWDtBQWpGRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBLFlBQVlBLENBQUNBO0lBRWJBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLG9CQUFvQkEsRUFBRUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMxREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsbUJBQW1CQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUN4Q0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtJQUV0Q0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxtQkFBbUJBLEVBQUVBLGlCQUFpQkEsRUFBRUEsZUFBZUEsRUFBRUEsY0FBY0EsRUFBRUEsV0FBV0EsRUFBRUEsV0FBV0EsRUFBRUEsWUFBWUEsRUFBRUEsUUFBUUEsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7U0FDdExBLE1BQU1BLENBQUNBLENBQUNBLG9CQUFvQkEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxvQkFBb0JBLEVBQUVBLHVCQUF1QkE7UUFDN0ZBLFVBQUNBLGtCQUFpREEsRUFDakRBLGNBQXlDQSxFQUN6Q0Esa0JBQXdEQSxFQUN4REEscUJBQTBCQTtZQUUxQkEsa0JBQWtCQSxDQUFDQSx3QkFBd0JBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBRXhEQSxrQkFBa0JBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRWxDQSxjQUFjQTtpQkFDWkEsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUE7Z0JBQ2RBLEdBQUdBLEVBQUVBLEdBQUdBO2dCQUNSQSxXQUFXQSxFQUFFQSw0QkFBNEJBO2dCQUN6Q0EsVUFBVUEsRUFBRUEsVUFBVUE7YUFDdEJBLENBQUNBO2lCQUNEQSxLQUFLQSxDQUFDQSxPQUFPQSxFQUFFQTtnQkFDZkEsR0FBR0EsRUFBRUEsUUFBUUE7Z0JBQ2JBLFdBQVdBLEVBQUVBLDZCQUE2QkE7Z0JBQzFDQSxVQUFVQSxFQUFFQSxXQUFXQTthQUN2QkEsQ0FBQ0EsQ0FBQ0E7WUFFSkEscUJBQXFCQTtpQkFDbkJBLFFBQVFBLENBQUNBLGNBQWNBLEVBQUVBO2dCQUN6QkEsSUFBSUEsRUFBRUEsTUFBTUE7Z0JBQ1pBLFNBQVNBLEVBQUVBLGdCQUFnQkE7Z0JBQzNCQSxLQUFLQSxFQUFFQSxNQUFNQTthQUNiQSxDQUFDQTtpQkFDREEsUUFBUUEsQ0FBQ0EsY0FBY0EsRUFBRUE7Z0JBQ3pCQSxJQUFJQSxFQUFFQSxHQUFHQTtnQkFDVEEsU0FBU0EsRUFBRUEsZUFBZUE7Z0JBQzFCQSxNQUFNQSxFQUFFQSxRQUFRQTtnQkFDaEJBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBO2lCQUNEQSxRQUFRQSxDQUFDQSw2QkFBNkJBLEVBQUVBO2dCQUN4Q0EsSUFBSUEsRUFBRUEsZ0JBQWdCQTtnQkFDdEJBLFNBQVNBLEVBQUVBLFdBQVdBO2dCQUN0QkEsS0FBS0EsRUFBRUEsT0FBT0E7YUFDZEEsQ0FBQ0E7aUJBQ0RBLFFBQVFBLENBQUNBLDBCQUEwQkEsRUFBRUE7Z0JBQ3JDQSxJQUFJQSxFQUFFQSxtQkFBbUJBO2dCQUN6QkEsU0FBU0EsRUFBRUEsbUJBQW1CQTtnQkFDOUJBLE1BQU1BLEVBQUVBLFFBQVFBO2dCQUNoQkEsSUFBSUEsRUFBRUEsR0FBR0E7YUFDVEEsQ0FBQ0E7aUJBQ0RBLFFBQVFBLENBQUNBLHlCQUF5QkEsRUFBRUE7Z0JBQ3BDQSxJQUFJQSxFQUFFQSxzQkFBc0JBO2dCQUM1QkEsU0FBU0EsRUFBRUEsZ0JBQWdCQTtnQkFDM0JBLE1BQU1BLEVBQUVBLFFBQVFBO2dCQUNoQkEsSUFBSUEsRUFBRUEsR0FBR0E7YUFDVEEsQ0FBQ0E7aUJBQ0RBLFFBQVFBLENBQUNBLHFCQUFxQkEsRUFBRUE7Z0JBQ2hDQSxJQUFJQSxFQUFFQSxlQUFlQTtnQkFDckJBLFNBQVNBLEVBQUVBLG1CQUFtQkE7Z0JBQzlCQSxNQUFNQSxFQUFFQSxRQUFRQTtnQkFDaEJBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBO2lCQUNEQSxRQUFRQSxDQUFDQSxpQkFBaUJBLEVBQUVBO2dCQUM1QkEsSUFBSUEsRUFBRUEscUJBQXFCQTtnQkFDM0JBLFNBQVNBLEVBQUVBLG1CQUFtQkE7Z0JBQzlCQSxNQUFNQSxFQUFFQSxRQUFRQTtnQkFDaEJBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBO2lCQUNEQSxRQUFRQSxDQUFDQSwyQkFBMkJBLEVBQUVBO2dCQUN0Q0EsSUFBSUEsRUFBRUEsc0JBQXNCQTtnQkFDNUJBLFNBQVNBLEVBQUVBLG1CQUFtQkE7Z0JBQzlCQSxNQUFNQSxFQUFFQSxRQUFRQTtnQkFDaEJBLElBQUlBLEVBQUVBLEdBQUdBO2FBQ1RBLENBQUNBLENBQUNBO1FBQ0xBLENBQUNBLENBQUNBLENBQUNBO1NBQ0hBLE1BQU1BLENBQUNBLENBQUNBLGNBQWNBLEVBQUVBLFVBQUNBLFlBQTZCQTtZQUNyREEsWUFBWUEsQ0FBQ0EsWUFBWUEsQ0FBT0EsTUFBT0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDbkRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0FBQ1BBLENBQUNBLEVBakZTLEVBQUUsS0FBRixFQUFFLFFBaUZYO0FDbkZBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0FTWDtBQVRELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFBQU07UUFPQUMsQ0FBQ0E7UUFBREQsY0FBQ0E7SUFBREEsQ0FQQU4sQUFPQ00sSUFBQU47SUFQWUEsVUFBT0EsVUFPbkJBLENBQUFBO0FBQ0ZBLENBQUNBLEVBVFMsRUFBRSxLQUFGLEVBQUUsUUFTWDtBQ1hBLDBDQUEwQztBQUMzQyxtRkFBbUY7QUFFbkYsSUFBVSxFQUFFLENBNkNYO0FBN0NELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFBeUNRLHVDQUF1QkE7UUFhL0RBLDZCQUFZQSxJQUFrQkE7WUFDN0JDLGtCQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNaQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDVkEsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRURELDZDQUFlQSxHQUFmQSxVQUFnQkEsSUFBaUJBO1lBQ2hDRSxnQkFBS0EsQ0FBQ0EsZUFBZUEsWUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFNUJBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBQy9DQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUMzQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7WUFDckRBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtZQUMvREEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDdkNBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7WUFDN0RBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBQ2pEQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUM3Q0EsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtZQUMzREEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO1lBQy9EQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUNqREEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7UUFDbERBLENBQUNBO1FBRURGLDJDQUFhQSxHQUFiQSxVQUFjQSxJQUFpQkE7WUFDOUJHLGdCQUFLQSxDQUFDQSxhQUFhQSxZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUUxQkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFDcERBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLEVBQUVBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ2pEQSxDQUFDQTtRQUNGSCwwQkFBQ0E7SUFBREEsQ0EzQ0FSLEFBMkNDUSxFQTNDd0NSLFVBQVVBLENBQUNBLFlBQVlBLEVBMkMvREE7SUEzQ1lBLHNCQUFtQkEsc0JBMkMvQkEsQ0FBQUE7QUFDRkEsQ0FBQ0EsRUE3Q1MsRUFBRSxLQUFGLEVBQUUsUUE2Q1g7QUNoREEsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQUlYO0FBSkQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNiQTtRQUFBWTtRQUVBQyxDQUFDQTtRQUFERCx3QkFBQ0E7SUFBREEsQ0FGQVosQUFFQ1ksSUFBQVo7SUFGWUEsb0JBQWlCQSxvQkFFN0JBLENBQUFBO0FBQ0ZBLENBQUNBLEVBSlMsRUFBRSxLQUFGLEVBQUUsUUFJWDtBQ05BLDBDQUEwQztBQUMzQyxtRkFBbUY7QUFFbkYsSUFBVSxFQUFFLENBeURYO0FBekRELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFBMkNjLHlDQUF1QkE7UUFpQmpFQSwrQkFBWUEsSUFBa0JBO1lBQzdCQyxrQkFBTUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDWkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1ZBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzVCQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVERCwrQ0FBZUEsR0FBZkEsVUFBZ0JBLElBQWlCQTtZQUNoQ0UsZ0JBQUtBLENBQUNBLGVBQWVBLFlBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRTVCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtZQUNuREEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDN0NBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQ3pDQSxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQTtZQUN6REEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtZQUMzREEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDL0NBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQ3JEQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDL0RBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQ3ZDQSxJQUFJQSxDQUFDQSxlQUFlQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBO1lBQzdEQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUNqREEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDN0NBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7WUFDM0RBLElBQUlBLENBQUNBLGdCQUFnQkEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtZQUMvREEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFDakRBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBQ2xEQSxDQUFDQTtRQUVERiw2Q0FBYUEsR0FBYkEsVUFBY0EsSUFBaUJBO1lBQzlCRyxnQkFBS0EsQ0FBQ0EsYUFBYUEsWUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFFMUJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLEVBQUVBLFlBQVlBLEVBQUVBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBQ3hEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUNsREEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsRUFBRUEsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDOUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLEVBQUVBLGVBQWVBLEVBQUVBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQzlEQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBO1lBQ2hFQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUNyREEsQ0FBQ0E7UUFDRkgsNEJBQUNBO0lBQURBLENBdkRBZCxBQXVEQ2MsRUF2RDBDZCxVQUFVQSxDQUFDQSxZQUFZQSxFQXVEakVBO0lBdkRZQSx3QkFBcUJBLHdCQXVEakNBLENBQUFBO0FBQ0ZBLENBQUNBLEVBekRTLEVBQUUsS0FBRixFQUFFLFFBeURYO0FDNURBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0FVWDtBQVZELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkEsd0JBQStCQSxPQUEwQkE7UUFDeERrQixNQUFNQSxDQUFDQTtZQUNOQSxDQUFDQSxFQUFRQSxPQUFRQSxDQUFDQSxNQUFNQTtTQUN4QkEsQ0FBQUE7SUFDRkEsQ0FBQ0E7SUFKZWxCLGlCQUFjQSxpQkFJN0JBLENBQUFBO0lBRURBLGNBQWNBLENBQUNBLE9BQU9BLEdBQUdBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO0lBRWxDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLGdCQUFnQkEsRUFBRUEsY0FBY0EsQ0FBQ0EsQ0FBQ0E7QUFDaEZBLENBQUNBLEVBVlMsRUFBRSxLQUFGLEVBQUUsUUFVWDtBQ1pBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0FxQlg7QUFyQkQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWQTtRQVFGbUIsa0JBQ1NBLE1BQTRCQSxFQUM1QkEsS0FBc0JBLEVBQ3RCQSxPQUEwQkEsRUFDMUJBLFFBQTRCQTtZQUg1QkMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBc0JBO1lBQzVCQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFpQkE7WUFDdEJBLFlBQU9BLEdBQVBBLE9BQU9BLENBQW1CQTtZQUMxQkEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBb0JBO1lBRTNCQSxNQUFNQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUUzQkEsQ0FBQ0E7UUFmWUQsZ0JBQU9BLEdBQUdBO1lBQ3RCQSxRQUFRQTtZQUNDQSxPQUFPQTtZQUNQQSxTQUFTQTtZQUNsQkEsVUFBVUE7U0FDSkEsQ0FBQ0E7UUFXTkEsZUFBQ0E7SUFBREEsQ0FqQkFuQixBQWlCQ21CLElBQUFuQjtJQWpCWUEsV0FBUUEsV0FpQnBCQSxDQUFBQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLFVBQVVBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO0FBQzFFQSxDQUFDQSxFQXJCUyxFQUFFLEtBQUYsRUFBRSxRQXFCWDtBQ3ZCQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBeUJYO0FBekJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVkE7UUFXSXFCLHVCQUNHQSxNQUFpQ0EsRUFDakNBLE9BQXVCQSxFQUN2QkEsUUFBNEJBO1lBRjVCQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUEyQkE7WUFDakNBLFlBQU9BLEdBQVBBLE9BQU9BLENBQWdCQTtZQUN2QkEsYUFBUUEsR0FBUkEsUUFBUUEsQ0FBb0JBO1lBRTNCQSxNQUFNQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDcENBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBO1lBQ2xDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNuQ0EsQ0FBQ0E7UUFuQk1ELHFCQUFPQSxHQUFHQTtZQUN0QkEsUUFBUUE7WUFDUkEsZ0JBQWdCQTtZQUNoQkEsVUFBVUE7U0FDSkEsQ0FBQ0E7UUFnQk5BLG9CQUFDQTtJQUFEQSxDQXJCQXJCLEFBcUJDcUIsSUFBQXJCO0lBckJZQSxnQkFBYUEsZ0JBcUJ6QkEsQ0FBQUE7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxlQUFlQSxFQUFFQSxhQUFhQSxDQUFDQSxDQUFDQTtBQUNwRkEsQ0FBQ0EsRUF6QlMsRUFBRSxLQUFGLEVBQUUsUUF5Qlg7QUMzQkEsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQXFCWDtBQXJCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1ZBO1FBU0l1QixxQkFBb0JBLE1BQStCQSxFQUFVQSxhQUFrQkEsRUFBVUEsT0FBdUJBO1lBQTVGQyxXQUFNQSxHQUFOQSxNQUFNQSxDQUF5QkE7WUFBVUEsa0JBQWFBLEdBQWJBLGFBQWFBLENBQUtBO1lBQVVBLFlBQU9BLEdBQVBBLE9BQU9BLENBQWdCQTtZQUU1R0EsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDMUJBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLDBCQUEwQkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsR0FBR0EsZUFBZUEsQ0FBQ0E7WUFDaEdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLHlCQUF5QkEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsR0FBR0EsNEJBQTRCQSxDQUFDQTtZQUM1R0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDbkVBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBO1FBQ2hFQSxDQUFDQTtRQWZNRCxtQkFBT0EsR0FBR0E7WUFDdEJBLFFBQVFBO1lBQ0NBLGVBQWVBO1lBQ3hCQSxnQkFBZ0JBO1NBQ1ZBLENBQUNBO1FBWU5BLGtCQUFDQTtJQUFEQSxDQWpCQXZCLEFBaUJDdUIsSUFBQXZCO0lBakJZQSxjQUFXQSxjQWlCdkJBLENBQUFBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsYUFBYUEsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7QUFDaEZBLENBQUNBLEVBckJTLEVBQUUsS0FBRixFQUFFLFFBcUJYO0FDdkJBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0FxR1g7QUFyR0QsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUViQSxJQUFLQSxVQUdKQTtJQUhEQSxXQUFLQSxVQUFVQTtRQUNkeUIsNkRBQWFBLENBQUFBO1FBQ2JBLG1FQUFnQkEsQ0FBQUE7SUFDakJBLENBQUNBLEVBSEl6QixVQUFVQSxLQUFWQSxVQUFVQSxRQUdkQTtJQUlFQTtRQWlCRjBCLHFCQUNTQSxNQUErQkEsRUFDL0JBLFlBQTRCQSxFQUM1QkEsVUFBNkJBLEVBQzdCQSxTQUFvQkEsRUFDcEJBLElBQW9CQSxFQUNwQkEsTUFBY0EsRUFDZEEsTUFBaUJBLEVBQ2pCQSxLQUFzQkEsRUFDdEJBLEVBQWdCQSxFQUNoQkEsT0FBdUJBO1lBM0I5QkMsaUJBeUZDQTtZQXZFTUEsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBeUJBO1lBQy9CQSxpQkFBWUEsR0FBWkEsWUFBWUEsQ0FBZ0JBO1lBQzVCQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFtQkE7WUFDN0JBLGNBQVNBLEdBQVRBLFNBQVNBLENBQVdBO1lBQ3BCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUFDcEJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVFBO1lBQ2RBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVdBO1lBQ2pCQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFpQkE7WUFDdEJBLE9BQUVBLEdBQUZBLEVBQUVBLENBQWNBO1lBQ2hCQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFnQkE7WUFiaENBLG1CQUFjQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUN2QkEsc0JBQWlCQSxHQUFHQSxLQUFLQSxDQUFDQTtZQWNoQkEsTUFBTUEsQ0FBQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFFMUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLEtBQUtBLENBQUNBLFlBQVlBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDNURBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLGdCQUFnQkEsRUFBRUEsQ0FBQ0E7WUFFckNBLFNBQVNBLENBQUNBLHVCQUF1QkEsRUFBRUE7aUJBVWpDQSxJQUFJQSxDQUFDQSxVQUFDQSxXQUFXQTtnQkFHakJBLEtBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLENBQUNBO2dCQUMxQkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQTtZQU81Q0EsQ0FBQ0EsQ0FBQ0E7aUJBSURBLElBQUlBLENBQUNBO2dCQUNMQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSxvQkFBaUJBLEVBQUVBLENBQUNBO2dCQUN2Q0EsUUFBUUEsQ0FBQ0EsT0FBT0EsR0FBR0EsS0FBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ3hDQSxJQUFJQSxnQkFBZ0JBLEdBQUdBLElBQUlBLHNCQUFtQkEsRUFBRUEsQ0FBQ0E7Z0JBQ2pEQSxnQkFBZ0JBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBO2dCQUNyREEsZ0JBQWdCQSxDQUFDQSxRQUFRQSxHQUFHQSxRQUFRQSxDQUFDQSxnQkFBZ0JBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoRkEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQSxvQkFBb0JBLEVBQUVBLENBQUNBO1lBQ3RGQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsR0FBR0E7Z0JBQ1RBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLFlBQVlBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO29CQUM1Q0EsS0FBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzdCQSxLQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDbkJBLENBQUNBO1lBQ0ZBLENBQUNBLENBQUNBO2lCQUNEQSxPQUFPQSxDQUFDQTtnQkFDUkEsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7Z0JBQ3hCQSxLQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLENBQUNBO1lBQy9CQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVPRCw2QkFBT0EsR0FBZkEsVUFBZ0JBLEdBQWtDQTtZQUNqREUsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsWUFBWUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO1lBQ2pDQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLEVBQUVBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLEVBQUVBLE9BQU9BLEVBQUVBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBO1FBQ3RGQSxDQUFDQTtRQXZGWUYsbUJBQU9BLEdBQUdBO1lBQ3RCQSxRQUFRQTtZQUNSQSxnQkFBZ0JBO1lBQ2hCQSxtQkFBbUJBO1lBQ25CQSxXQUFXQTtZQUNYQSxNQUFNQTtZQUNOQSxRQUFRQTtZQUNSQSxRQUFRQTtZQUNSQSxPQUFPQTtZQUNQQSxJQUFJQTtZQUNKQSxnQkFBZ0JBO1NBQ1ZBLENBQUNBO1FBNkVOQSxrQkFBQ0E7SUFBREEsQ0F6RkExQixBQXlGQzBCLElBQUExQjtJQXpGWUEsY0FBV0EsY0F5RnZCQSxDQUFBQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEVBQUVBLFdBQVdBLENBQUNBLENBQUNBO0FBQ2hGQSxDQUFDQSxFQXJHUyxFQUFFLEtBQUYsRUFBRSxRQXFHWDtBQ3ZHQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBaURYO0FBakRELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDYkE7UUFnQkM2QixtQkFDU0EsTUFBNkJBLEVBQzdCQSxTQUFvQkEsRUFDcEJBLElBQW9CQSxFQUNwQkEsTUFBY0EsRUFDZEEsTUFBaUJBLEVBQ2pCQSxPQUF1QkE7WUF0QmpDQyxpQkE0Q0NBO1lBM0JTQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUF1QkE7WUFDN0JBLGNBQVNBLEdBQVRBLFNBQVNBLENBQVdBO1lBQ3BCQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFnQkE7WUFDcEJBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVFBO1lBQ2RBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVdBO1lBQ2pCQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFnQkE7WUFYeEJBLGFBQVFBLEdBQUdBLGlCQUFpQkEsQ0FBQ0E7WUFDN0JBLGNBQVNBLEdBQUdBLGtCQUFrQkEsQ0FBQ0E7WUFZdENBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1lBR2pCQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLGNBQWNBLENBQUNBO1lBRWpHQSxTQUFTQSxDQUFDQSwwQkFBMEJBLEVBQUVBO2lCQUNwQ0EsSUFBSUEsQ0FBQ0EsVUFBQUEsVUFBVUE7Z0JBQ2ZBLEtBQUlBLENBQUNBLE1BQU1BLEdBQUdBLFVBQVVBLEdBQUdBLEtBQUlBLENBQUNBLFFBQVFBLEdBQUdBLEtBQUlBLENBQUNBLFNBQVNBLENBQUNBO1lBQzNEQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUNuQkEsQ0FBQ0E7UUFFT0QsMkJBQU9BLEdBQWZBLFVBQWdCQSxHQUFrQ0E7WUFDakRFLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLFlBQVlBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1Q0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RCQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFVQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFFQSxFQUFFQSxPQUFPQSxFQUFFQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUN0RkEsQ0FBQ0E7UUF6Q01GLGlCQUFPQSxHQUFHQTtZQUNoQkEsUUFBUUE7WUFDUkEsV0FBV0E7WUFDWEEsTUFBTUE7WUFDTkEsUUFBUUE7WUFDUkEsUUFBUUE7WUFDUkEsZ0JBQWdCQTtTQUNWQSxDQUFDQTtRQW1DVEEsZ0JBQUNBO0lBQURBLENBNUNBN0IsQUE0Q0M2QixJQUFBN0I7SUE1Q1lBLFlBQVNBLFlBNENyQkEsQ0FBQUE7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxXQUFXQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtBQUV6RUEsQ0FBQ0EsRUFqRFMsRUFBRSxLQUFGLEVBQUUsUUFpRFg7QUNuREEsMENBQTBDO0FDQTFDLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0FxQ1g7QUFyQ0QsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNiQTtRQUFvQ2dDLGtDQUFPQTtRQU0xQ0Esd0JBQW9CQSxPQUEwQkEsRUFBVUEsU0FBOEJBO1lBQ3JGQyxpQkFBT0EsQ0FBQ0E7WUFEV0EsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBbUJBO1lBQVVBLGNBQVNBLEdBQVRBLFNBQVNBLENBQXFCQTtZQUdyRkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDaERBLElBQUlBLENBQUNBLE9BQU9BLEdBQVNBLElBQUlBLENBQUNBLE9BQVFBLENBQUNBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBO1lBQzlDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMvSEEsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUN0REEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUNwREEsSUFBSUEsQ0FBQ0EsS0FBS0EsR0FBU0EsSUFBSUEsQ0FBQ0EsT0FBUUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDM0NBLENBQUNBO1FBRU9ELDJDQUFrQkEsR0FBMUJBLFVBQTJCQSxJQUFZQTtZQUN0Q0UsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDMURBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLE1BQU1BLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLEdBQUdBLFdBQVdBLENBQUNBLEVBQ3BEQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUN2Q0EsTUFBTUEsQ0FBQ0EsT0FBT0EsS0FBS0EsSUFBSUEsR0FBR0EsRUFBRUEsR0FBR0Esa0JBQWtCQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNuRkEsQ0FBQ0E7UUFFT0Ysa0NBQVNBLEdBQWpCQSxVQUFrQkEsR0FBV0E7WUFDNUJHLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLE1BQU1BLEdBQUdBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBO1FBQzNEQSxDQUFDQTtRQUVPSCxpQ0FBUUEsR0FBaEJBLFVBQWlCQSxHQUFXQSxFQUFFQSxNQUFjQTtZQUMzQ0ksTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDL0RBLENBQUNBO1FBOUJNSixzQkFBT0EsR0FBR0E7WUFDUEEsU0FBU0E7WUFDbEJBLFdBQVdBO1NBQ0xBLENBQUNBO1FBNkJUQSxxQkFBQ0E7SUFBREEsQ0FqQ0FoQyxBQWlDQ2dDLEVBakNtQ2hDLFVBQU9BLEVBaUMxQ0E7SUFqQ1lBLGlCQUFjQSxpQkFpQzFCQSxDQUFBQTtJQUVFQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLGdCQUFnQkEsRUFBRUEsY0FBY0EsQ0FBQ0EsQ0FBQ0E7QUFDaEZBLENBQUNBLEVBckNTLEVBQUUsS0FBRixFQUFFLFFBcUNYO0FDdkNBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0FpQ1g7QUFqQ0QsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNWQTtRQU9GcUMsMkJBQ1NBLE9BQTBCQTtZQUExQkMsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBbUJBO1lBSDNCQSxTQUFJQSxHQUFRQSxJQUFJQSxDQUFDQTtRQUl6QkEsQ0FBQ0E7UUFFTUQsaUNBQUtBLEdBQVpBLFVBQWFBLEtBQWFBO1lBQ3pCRSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFTQSxJQUFJQSxDQUFDQSxPQUFRQSxDQUFDQSxVQUFVQSxDQUFDQTtnQkFDMUNBLElBQUlBLEVBQUVBLHVCQUF1QkE7Z0JBQzdCQSxlQUFlQSxFQUFFQSxLQUFLQTtnQkFDdEJBLFdBQVdBLEVBQUVBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLDhEQUE4REE7b0JBQ3pGQSx1QkFBdUJBO29CQUN2QkEsdUNBQXVDQTtvQkFDdkNBLHVDQUF1Q0E7b0JBQ3ZDQSx1Q0FBdUNBO29CQUN2Q0EsUUFBUUEsQ0FBQ0E7YUFDVEEsQ0FBQ0EsQ0FBQ0E7UUFDSkEsQ0FBQ0E7UUFFTUYsaUNBQUtBLEdBQVpBO1lBQ0NHLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDcEJBLENBQUNBO1FBQ0ZBLENBQUNBO1FBM0JZSCx5QkFBT0EsR0FBR0E7WUFDYkEsU0FBU0E7U0FDWkEsQ0FBQ0E7UUEwQk5BLHdCQUFDQTtJQUFEQSxDQTdCQXJDLEFBNkJDcUMsSUFBQXJDO0lBN0JZQSxvQkFBaUJBLG9CQTZCN0JBLENBQUFBO0lBRUpBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsbUJBQW1CQSxFQUFFQSxpQkFBaUJBLENBQUNBLENBQUNBO0FBQ25GQSxDQUFDQSxFQWpDUyxFQUFFLEtBQUYsRUFBRSxRQWlDWDtBQ25DQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBNkJYO0FBN0JELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVkE7UUFRRnlDLHdCQUNDQSxjQUFtQ0E7WUFKNUJDLFNBQUlBLEdBQVFBLElBQUlBLENBQUNBO1lBS3hCQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUMzQkEsQ0FBQ0E7UUFFVUQsNkNBQW9CQSxHQUE1QkEsVUFBNkJBLFFBQWVBO1lBQzlDRSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO1FBQzlDQSxDQUFDQTtRQUVNRiw4Q0FBcUJBLEdBQTVCQTtZQUNDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBO1FBQ25EQSxDQUFDQTtRQUVHSCx5Q0FBZ0JBLEdBQXZCQTtZQUNDSSxJQUFJQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLDBDQUEwQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkZBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLGlIQUFpSEEsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDcktBLENBQUNBO1FBdkJZSixzQkFBT0EsR0FBR0E7WUFDYkEsZ0JBQWdCQTtTQUNuQkEsQ0FBQ0E7UUFzQk5BLHFCQUFDQTtJQUFEQSxDQXpCQXpDLEFBeUJDeUMsSUFBQXpDO0lBekJZQSxpQkFBY0EsaUJBeUIxQkEsQ0FBQUE7SUFFSkEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO0FBQzdFQSxDQUFDQSxFQTdCUyxFQUFFLEtBQUYsRUFBRSxRQTZCWDtBQy9CQSwwQ0FBMEM7QUFFM0MsSUFBVSxFQUFFLENBdU9YO0FBdk9ELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVkE7UUFrQkY4QyxtQkFDQ0EsY0FBbUNBLEVBQzNCQSxPQUF1QkEsRUFDdkJBLE1BQWlCQSxFQUNqQkEsRUFBZ0JBLEVBQ2hCQSxLQUFzQkE7WUFIdEJDLFlBQU9BLEdBQVBBLE9BQU9BLENBQWdCQTtZQUN2QkEsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBV0E7WUFDakJBLE9BQUVBLEdBQUZBLEVBQUVBLENBQWNBO1lBQ2hCQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFpQkE7WUFkdkJBLFNBQUlBLEdBQVFBLElBQUlBLENBQUNBO1lBSWpCQSxhQUFRQSxHQUFHQTtnQkFDbEJBLDBCQUEwQkE7Z0JBQzFCQSwrQkFBK0JBLENBQUNBLENBQUNBO1lBQzFCQSxZQUFPQSxHQUFHQSw0QkFBNEJBLENBQUNBO1lBUTlDQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxjQUFjQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsd0JBQXFCQSxFQUFFQSxDQUFDQTtRQUNqREEsQ0FBQ0E7UUFFREQsc0NBQWtCQSxHQUFsQkEsVUFBbUJBLEdBQVdBLEVBQUVBLE9BQWVBLEVBQUVBLE1BQWlCQSxFQUFFQSxTQUF5QkE7WUFBekJFLHlCQUF5QkEsR0FBekJBLGdCQUF5QkE7WUFDNUZBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLEVBQVdBLENBQUNBO1lBQ25DQSxJQUFJQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUU3Q0EsSUFBSUEsY0FBY0EsR0FBR0EsSUFBSUEsRUFBRUEsQ0FBQ0EsdUJBQXVCQSxFQUFFQSxDQUFDQTtZQUV0REEsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLGNBQWNBLENBQUNBLGFBQWFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQ3hDQSxjQUFjQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxzQkFBc0JBLEVBQUVBLENBQUNBLENBQUNBO1lBRTVEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxPQUFPQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDekNBLGNBQWNBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzVEQSxDQUFDQTtZQUVEQSxJQUFJQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtZQUVyREEsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFFdEJBLEtBQUVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7aUJBQzdCQSxJQUFJQSxDQUFDQTtnQkFDTEEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLENBQUNBLEVBQUVBLFVBQUFBLENBQUNBO2dCQUNIQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFSkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDcEJBLENBQUNBO1FBRURGLHFDQUFpQkEsR0FBakJBO1lBQUFHLGlCQWtEQ0E7WUFqREFBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLEVBQVdBLENBQUNBO1lBRW5DQSxJQUFJQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUM3Q0EsSUFBSUEsV0FBV0EsR0FBR0EsSUFBSUEsRUFBRUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDdkVBLElBQUlBLE9BQU9BLEdBQUdBLFdBQVdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1lBRXBDQSxJQUFJQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBO1lBQzNFQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxZQUFZQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUU3Q0EsS0FBRUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQTtpQkFDN0JBLElBQUlBLENBQUNBO2dCQUNMQSxNQUFNQSxDQUFDQSxLQUFJQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1lBQzFDQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ1BBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLGlCQUFpQkEsRUFBRUEsS0FBS0EsMEJBQTBCQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDMURBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLHVCQUF1QkEsRUFBRUEsQ0FBQ0E7b0JBQ2hEQSxRQUFRQSxDQUFDQSxxQkFBcUJBLENBQUNBLEVBQUVBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFEQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQTtvQkFDN0NBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLEtBQUlBLENBQUNBLE1BQU1BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7b0JBQ2pEQSxRQUFRQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUMvQkEsUUFBUUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxJQUFJQSxDQUFDQSxzQ0FBc0NBLENBQUNBLENBQUNBLENBQUNBO29CQUNwRkEsSUFBSUEsVUFBVUEsR0FBR0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7b0JBQ25EQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxZQUFZQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtvQkFFaERBLEtBQUVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7eUJBQzdCQSxJQUFJQSxDQUFDQTt3QkFDTEEsTUFBTUEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtvQkFDMUNBLENBQUNBLENBQUNBO3lCQUNEQSxJQUFJQSxDQUFDQTt3QkFDTEEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3RCQSxDQUFDQSxDQUFDQTt5QkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsQ0FBQ0E7d0JBQ1BBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ0pBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO2dCQUNiQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1BBLElBQUlBLFFBQVFBLEdBQUdBLEtBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO29CQUMvQkEsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25CQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxPQUFPQSxDQUFDQTtnQkFDekJBLENBQUNBO1lBQ0ZBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQTtnQkFDTEEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLENBQUNBLENBQUNBO2lCQUNEQSxLQUFLQSxDQUFDQSxVQUFBQSxDQUFDQTtnQkFDUEEsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsVUFBVUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBLENBQUNBLENBQUNBO1lBRUpBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBO1FBQ3BCQSxDQUFDQTtRQUVESCwrQkFBV0EsR0FBWEEsVUFBWUEsTUFBaUJBO1lBQTdCSSxpQkFjQ0E7WUFiQUEsSUFBSUEsT0FBT0EsR0FBdUJBLEVBQUVBLENBQUNBO1lBRXJDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDL0NBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUM1QkEsQ0FBQ0EsVUFBQ0EsSUFBSUE7b0JBQ0xBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQVNBLElBQUlBLENBQUNBO3lCQUN2Q0EsT0FBT0EsQ0FBQ0EsVUFBQUEsSUFBSUE7d0JBQ1pBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsS0FBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzdFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDTkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLENBQUNBO1FBRURKLDJDQUF1QkEsR0FBdkJBO1lBQ0NLLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLEVBQVdBLENBQUNBO1lBQ25DQSxJQUFJQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUU3Q0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsRUFBRUEsRUFBRUEsMEJBQTBCQSxDQUFDQSxDQUFDQTtZQUU1REEsS0FBRUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQTtpQkFDN0JBLElBQUlBLENBQUNBO2dCQUNMQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSw0QkFBNEJBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLGNBQWNBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUN2RkEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ25CQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1BBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLEtBQUtBLENBQUNBLFVBQUFBLENBQUNBO2dCQUNQQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxVQUFVQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDSkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDcEJBLENBQUNBO1FBRURMLDhDQUEwQkEsR0FBMUJBO1lBQUFNLGlCQTRCQ0E7WUEzQkFBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEtBQUtBLEVBQVdBLENBQUNBO1lBRW5DQSxJQUFJQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtZQUM3Q0EsSUFBSUEsV0FBV0EsR0FBR0EsSUFBSUEsRUFBRUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsT0FBT0EsRUFBRUEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDdkVBLElBQUlBLFdBQVdBLEdBQUdBLFdBQVdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0E7WUFDaEVBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBRTFCQSxLQUFFQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBO2lCQUM3QkEsSUFBSUEsQ0FBQ0E7Z0JBQ0xBLElBQUlBLFVBQVVBLEdBQUdBLFdBQVdBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBO2dCQUM3Q0EsSUFBSUEsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7Z0JBQ3JCQSxPQUFPQSxVQUFVQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDOUJBLElBQUlBLE1BQU1BLEdBQUdBLFVBQVVBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO29CQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsRUFBRUEsS0FBS0EsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3BEQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTt3QkFDbEJBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBO29CQUNqQkEsQ0FBQ0E7Z0JBQ0ZBLENBQUNBO2dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDZkEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQTtZQUNGQSxDQUFDQSxDQUFDQTtpQkFDREEsS0FBS0EsQ0FBQ0EsVUFBQUEsQ0FBQ0E7Z0JBQ1BBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFVBQVVBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNKQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFFT04sK0JBQVdBLEdBQW5CQSxVQUFvQkEsS0FBYUE7WUFDaENPLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1FBQ3ZDQSxDQUFDQTtRQUVPUCx1Q0FBbUJBLEdBQTNCQSxVQUE0QkEsT0FBZ0JBO1lBQzNDUSxJQUFJQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxLQUFLQSxFQUFPQSxDQUFDQTtZQUUvQkEsSUFBSUEsS0FBS0EsR0FBR0EseTFEQUF5MURBLENBQUNBO1lBR3QyREEsSUFBSUEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFDN0NBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLHVCQUF1QkEsRUFBRUEsQ0FBQ0E7WUFDaERBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQzlDQSxRQUFRQSxDQUFDQSxnQkFBZ0JBLENBQUNBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQzVDQSxJQUFJQSxJQUFJQSxHQUFHQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUM3Q0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0E7WUFFckRBLEtBQUVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7aUJBQzdCQSxJQUFJQSxDQUFDQTtnQkFDTEEsSUFBSUEsUUFBUUEsR0FBR0EsT0FBT0EsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsMEJBQTBCQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNoR0EsSUFBSUEsYUFBYUEsR0FBR0EsUUFBUUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxvQkFBb0JBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUMvRkEsSUFBSUEsWUFBWUEsR0FBR0EsYUFBYUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0E7Z0JBQ2hEQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTtnQkFFM0JBLE1BQU1BLENBQUNBLEtBQUVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsWUFBWUEsRUFBRUEsYUFBYUEsRUFBRUEsYUFBYUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDdEdBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQSxVQUFDQSxJQUFJQTtnQkFDVkEsSUFBSUEsWUFBWUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7Z0JBQ3JEQSxPQUFPQSxZQUFZQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxDQUFDQTtvQkFDaENBLElBQUlBLFNBQVNBLEdBQUdBLFlBQVlBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO29CQUMzQ0EsU0FBU0EsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7Z0JBQzNCQSxDQUFDQTtnQkFDREEsSUFBSUEsaUJBQWlCQSxHQUFHQSxVQUFVQSxDQUFDQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pHQSxJQUFJQSxVQUFVQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSx1QkFBdUJBLEVBQUVBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQzNFQSxJQUFJQSxPQUFPQSxHQUFHQSxPQUFPQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSwwQkFBMEJBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUM3RUEsSUFBSUEsVUFBVUEsR0FBR0EsT0FBT0EsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxvQkFBb0JBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO2dCQUUzRkEsSUFBSUEsaUJBQWlCQSxHQUFHQSxVQUFVQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtnQkFDeERBLElBQUlBLE9BQU9BLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7Z0JBQzlDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxFQUFFQSxNQUFNQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFbERBLE1BQU1BLENBQUNBLEtBQUVBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDeENBLENBQUNBLENBQUNBO2lCQUNEQSxJQUFJQSxDQUFDQTtnQkFDTEEsR0FBR0EsQ0FBQ0EsT0FBT0EsRUFBRUEsQ0FBQ0E7WUFDZkEsQ0FBQ0EsQ0FBQ0E7aUJBQ0RBLEtBQUtBLENBQUNBLFVBQUFBLENBQUNBO2dCQUNQQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNmQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVKQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNwQkEsQ0FBQ0E7UUFqT1lSLGlCQUFPQSxHQUFHQTtZQUNiQSxnQkFBZ0JBO1lBQ3pCQSxnQkFBZ0JBO1lBQ2hCQSxRQUFRQTtZQUNSQSxJQUFJQTtZQUNKQSxPQUFPQTtTQUNEQSxDQUFDQTtRQTROTkEsZ0JBQUNBO0lBQURBLENBbk9BOUMsQUFtT0M4QyxJQUFBOUM7SUFuT1lBLFlBQVNBLFlBbU9yQkEsQ0FBQUE7SUFFSkEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxXQUFXQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtBQUNuRUEsQ0FBQ0EsRUF2T1MsRUFBRSxLQUFGLEVBQUUsUUF1T1g7QUN6T0EsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQThCWDtBQTlCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQUF1RDtRQTBCQUMsQ0FBQ0E7UUF6QkFELHNCQUFXQSxvQkFBT0E7aUJBQWxCQTtnQkFDQ0UsTUFBTUEsQ0FBQ0E7b0JBQ05BLGNBQWNBLEVBQUVBLDBCQUEwQkE7b0JBQzFDQSxnQkFBZ0JBLEVBQUVBLDRCQUE0QkE7b0JBQzlDQSxjQUFjQSxFQUFFQSxhQUFhQTtvQkFDN0JBLFNBQVNBLEVBQUVBLDBCQUEwQkE7b0JBQ3JDQSxVQUFVQSxFQUFFQSxpRUFBaUVBO29CQUM3RUEsV0FBV0EsRUFBRUEsYUFBYUE7b0JBQzFCQSxZQUFZQSxFQUFFQSxRQUFRQTtvQkFDdEJBLFlBQVlBLEVBQUVBLFNBQVNBO29CQUN2QkEsaUJBQWlCQSxFQUFFQSx3QkFBd0JBO29CQUMzQ0EsYUFBYUEsRUFBRUEsV0FBV0E7aUJBQzFCQSxDQUFBQTtZQUNGQSxDQUFDQTs7O1dBQUFGO1FBWUZBLGdCQUFDQTtJQUFEQSxDQTFCQXZELEFBMEJDdUQsSUFBQXZEO0lBMUJZQSxZQUFTQSxZQTBCckJBLENBQUFBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsRUFBRUEsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7QUFDekVBLENBQUNBLEVBOUJTLEVBQUUsS0FBRixFQUFFLFFBOEJYO0FDaENBLDBDQUEwQztBQUUzQyxJQUFVLEVBQUUsQ0F1Qlg7QUF2QkQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNiQTtRQUFBMEQ7UUFtQkFDLENBQUNBO1FBbEJBRCxzQkFBSUEsR0FBSkEsVUFBS0EsR0FBVUEsRUFBRUEsSUFBV0EsRUFBRUEsZUFBc0JBO1lBQ25ERSxJQUFJQSxZQUFZQSxHQUFHQSxlQUFlQSxHQUFHQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUUvQ0EsSUFBSUEsTUFBTUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUEsR0FBR0EsWUFBWUEsRUFBRUEsQ0FBQ0E7WUFDN0ZBLElBQUlBLFdBQVdBLEdBQUdBLFFBQVFBLENBQUNBLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ25FQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxXQUFXQSxDQUFDQSxDQUFDQTtZQUV2Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDYkEsQ0FBQ0E7UUFDREYsc0JBQUlBLEdBQUpBLFVBQU1BLEdBQVVBO1lBQ2ZHLElBQUlBLFFBQVFBLEdBQUdBLFFBQVFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDdkVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2dCQUNmQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNkQSxDQUFDQTtZQUNEQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUVsQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsRUFBRUEsQ0FBQ0EsT0FBT0EsRUFBRUEsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsSUFBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDOUVBLENBQUNBO1FBQ0ZILGNBQUNBO0lBQURBLENBbkJBMUQsQUFtQkMwRCxJQUFBMUQ7SUFuQllBLFVBQU9BLFVBbUJuQkEsQ0FBQUE7SUFFREEsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtBQUMvREEsQ0FBQ0EsRUF2QlMsRUFBRSxLQUFGLEVBQUUsUUF1Qlg7QUN6QkEsMENBQTBDO0FBRTNDLElBQVUsRUFBRSxDQWNYO0FBZEQsV0FBVSxFQUFFLEVBQUMsQ0FBQztJQUNiQTtRQUFBOEQ7UUFZQUMsQ0FBQ0E7UUFYT0Qsc0JBQW1CQSxHQUExQkEsVUFBOEJBLEdBQXFCQSxFQUFFQSxJQUFRQTtZQUM1REUsSUFBSUEsRUFBRUEsR0FBR0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBZUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDMURBLElBQUlBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO1lBQ3JCQSxHQUFHQSxDQUFDQSxpQkFBaUJBLENBQUNBO2dCQUNyQkEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLENBQUNBLEVBQUVBLFVBQUNBLE1BQU1BLEVBQUVBLElBQUlBO2dCQUNmQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNqQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFSkEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDcEJBLENBQUNBO1FBQ0ZGLFNBQUNBO0lBQURBLENBWkE5RCxBQVlDOEQsSUFBQTlEO0lBWllBLEtBQUVBLEtBWWRBLENBQUFBO0FBQ0ZBLENBQUNBLEVBZFMsRUFBRSxLQUFGLEVBQUUsUUFjWDtBQ2hCQywrQ0FBK0M7QUFHakQsOERBQThEO0FBRzlELHlDQUF5QztBQUd6QywrQkFBK0I7QUFHL0IseUNBQXlDO0FBQ3pDLHFEQUFxRDtBQUNyRCxtREFBbUQ7QUFDbkQsK0NBQStDO0FBRy9DLG9EQUFvRDtBQUlwRCxnREFBZ0Q7QUFDaEQscURBQXFEO0FBQ3JELG1EQUFtRDtBQUNuRCxtREFBbUQ7QUFDbkQsaURBQWlEO0FBR2pELGlEQUFpRDtBQUdqRCxtREFBbUQ7QUFDbkQsc0RBQXNEO0FBQ3RELG1EQUFtRDtBQUNuRCw4Q0FBOEM7QUFDOUMsOENBQThDO0FBQzlDLDRDQUE0QztBQUM1QywrQ0FBK0MiLCJmaWxlIjoic24uYXBwLmpzIiwic291cmNlUm9vdCI6Ii4uL25nIn0=
