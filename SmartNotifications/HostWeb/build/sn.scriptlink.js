/// <reference path="_references.ts" />
var SNScriptLink;
(function (SNScriptLink) {
    var sod = SP.SOD;
    var SPAsyncScript = (function () {
        function SPAsyncScript(key, src, onLoad) {
            var _this = this;
            this.key = key;
            this.src = src;
            this.onLoad = onLoad;
            this.onLoadFunction = function () {
                if (typeof sod.notifyScriptLoadedAndExecuteWaitingJobs === "function") {
                    sod.notifyScriptLoadedAndExecuteWaitingJobs(_this.key);
                }
                if (_this.onLoad && typeof _this.onLoad === "function") {
                    _this.onLoad();
                }
            };
            this.load = function (sync) {
                if (sync === void 0) { sync = false; }
                sod.loadMultiple([_this.key], _this.onLoadFunction, sync);
            };
            this.registerDependency = function (asyncScripts) {
                asyncScripts.forEach(function (asyncScript) {
                    sod.registerSodDep(_this.key, asyncScript.key);
                });
            };
            this.registerDependencyByName = function (kies) {
                kies.forEach(function (key) {
                    sod.registerSodDep(_this.key, key);
                });
            };
            sod.registerSod(this.key, this.src);
        }
        return SPAsyncScript;
    })();
    SNScriptLink.SPAsyncScript = SPAsyncScript;
})(SNScriptLink || (SNScriptLink = {}));
/// <reference path="_references.ts" />
var SNScriptLink;
(function (SNScriptLink) {
    var Storage = (function () {
        function Storage() {
        }
        Storage.save = function (key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        };
        Storage.load = function (key) {
            var data = localStorage.getItem(key);
            if (!data) {
                return null;
            }
            return JSON.parse(data);
        };
        return Storage;
    })();
    SNScriptLink.Storage = Storage;
})(SNScriptLink || (SNScriptLink = {}));
/// <reference path="_references.ts" />
var SNScriptLink;
(function (SNScriptLink) {
    var Consts = (function () {
        function Consts() {
        }
        Consts.StorageKey = "sn_dismissed_items";
        Consts.WebRelUrl = "SmartNotifications";
        Consts.NotificationsListTitle = "Notifications";
        Consts.AppSettingsListTitle = "AppSettings";
        Consts.SettingsKey = "appsettings";
        Consts.AppSettingsCaml = "\n\t\t\t<Where>\n\t\t\t\t<Eq>\n\t\t\t\t\t<FieldRef Name='Key_SN' /> \n\t\t\t\t\t<Value Type='Text'>appsettings</Value> \n\t\t\t\t</Eq>\n\t\t\t</Where>";
        Consts.CamlString = "\n\t\t\t<Where>\n\t\t\t\t<And>\n\t\t\t\t\t<Or>\n\t\t\t\t\t\t<Or>\n\t\t\t\t\t\t\t<Or>\n\t\t\t\t\t\t\t\t<And>\n\t\t\t\t\t\t\t\t\t<Leq> \n\t\t\t\t\t\t\t\t\t\t<FieldRef Name='From_SN' /> \n\t\t\t\t\t\t\t\t\t\t<Value IncludeTimeValue='TRUE' Type='DateTime'><Today /></Value> \n\t\t\t\t\t\t\t\t\t</Leq> \n\t\t\t\t\t\t\t\t\t<Geq> \n\t\t\t\t\t\t\t\t\t\t<FieldRef Name='To_SN' /> \n\t\t\t\t\t\t\t\t\t\t<Value IncludeTimeValue='TRUE' Type='DateTime'><Today /></Value> \n\t\t\t\t\t\t\t\t\t</Geq> \n\t\t\t\t\t\t\t\t</And>\n\t\t\t\t\t\t\t\t<And>\n\t\t\t\t\t\t\t\t\t<Leq> \n\t\t\t\t\t\t\t\t\t\t<FieldRef Name='From_SN' /> \n\t\t\t\t\t\t\t\t\t\t<Value IncludeTimeValue='TRUE' Type='DateTime'><Today /></Value> \n\t\t\t\t\t\t\t\t\t</Leq> \n\t\t\t\t\t\t\t\t\t<IsNull> \n\t\t\t\t\t\t\t\t\t\t<FieldRef Name='To_SN' />\n\t\t\t\t\t\t\t\t\t</IsNull> \n\t\t\t\t\t\t\t\t</And>\n\t\t\t\t\t\t\t</Or>\n\t\t\t\t\t\t\t<And>\n\t\t\t\t\t\t\t\t<IsNull> \n\t\t\t\t\t\t\t\t\t<FieldRef Name='From_SN' />\n\t\t\t\t\t\t\t\t</IsNull> \n\t\t\t\t\t\t\t\t<Geq> \n\t\t\t\t\t\t\t\t\t<FieldRef Name='To_SN' /> \n\t\t\t\t\t\t\t\t\t<Value IncludeTimeValue='TRUE' Type='DateTime'><Today /></Value> \n\t\t\t\t\t\t\t\t</Geq> \n\t\t\t\t\t\t\t</And>\n\t\t\t\t\t\t</Or>\n\t\t\t\t\t\t<And>\n\t\t\t\t\t\t\t<IsNull> \n\t\t\t\t\t\t\t\t<FieldRef Name='From_SN' />\n\t\t\t\t\t\t\t</IsNull> \n\t\t\t\t\t\t\t<IsNull> \n\t\t\t\t\t\t\t\t<FieldRef Name='To_SN' />\n\t\t\t\t\t\t\t</IsNull> \n\t\t\t\t\t\t</And>\n\t\t\t\t\t</Or>\n\t\t\t\t\t<Or>\n\t\t\t\t\t\t<Membership Type='CurrentUserGroups'>\n\t\t\t\t\t\t\t<FieldRef Name='AssignedTo_SN'/>\n\t\t\t\t\t\t</Membership>\n\t\t\t\t\t\t<Includes>\n\t\t\t\t\t\t\t<FieldRef Name='AssignedTo_SN'/>\n\t\t\t\t\t\t\t<Value Type='Integer'><UserID /></Value>\n\t\t\t\t\t\t</Includes>\n\t\t\t\t\t</Or>\n\t\t\t\t</And>\n\t\t\t</Where>";
        return Consts;
    })();
    SNScriptLink.Consts = Consts;
})(SNScriptLink || (SNScriptLink = {}));
/// <reference path="_references.ts" />
var SNScriptLink;
(function (SNScriptLink) {
    var ScriptLinkViewModel = (function () {
        function ScriptLinkViewModel() {
            var _this = this;
            this.grouppedNotifications = ko.observableArray([]);
            this.getAppSettings()
                .then(function (settingItem) {
                var appSettings = JSON.parse(LZString.decompressFromBase64(settingItem.get_item("Value_SN")));
                if (appSettings.invalidLicense) {
                    return;
                }
                if (appSettings.trial) {
                    var dateNow = new Date();
                    var dateInstalled = new Date(appSettings.installationDate);
                    var timeDiff = Math.abs(dateNow.getTime() - dateInstalled.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    if (diffDays > 30) {
                        return;
                    }
                }
                _this.getNotifications()
                    .then(function (data) {
                    var ctx = SP.ClientContext.get_current();
                    ctx.load(ctx.get_web(), "Id");
                    ctx.executeQueryAsync(function () {
                        var id = ctx.get_web().get_id().toString();
                        var dissmissed = SNScriptLink.Storage.load(SNScriptLink.Consts.StorageKey);
                        if (dissmissed == null) {
                            dissmissed = {};
                            dissmissed[id] = [];
                        }
                        var dissmissedItems = dissmissed[id];
                        var enumerator = data.getEnumerator();
                        var notifications = [];
                        while (enumerator.moveNext()) {
                            var item = enumerator.get_current();
                            var notification = new SNScriptLink.Notification();
                            notification.color = item.get_item("Color_SN");
                            notification.dismissable = item.get_item("Dismissable_SN");
                            notification.title = item.get_item("Title");
                            notification.text = item.get_item("Message_SN");
                            notification.id = item.get_id();
                            if (dissmissedItems && dissmissedItems.length > 0) {
                                if (dissmissedItems.indexOf(notification.id.toString()) !== -1) {
                                    continue;
                                }
                            }
                            notifications.push(notification);
                        }
                        var uniqueColors = [];
                        for (var i = 0; i < notifications.length; i++) {
                            if (uniqueColors.indexOf(notifications[i].color) === -1) {
                                uniqueColors.push(notifications[i].color);
                            }
                        }
                        for (var i = 0; i < uniqueColors.length; i++) {
                            var notificationItem = new SNScriptLink.NotificationItems();
                            ko.utils.arrayPushAll(notificationItem.notifications, _this.getNotificationsByColor(uniqueColors[i], notifications));
                            notificationItem.notifications.valueHasMutated();
                            notificationItem.key = uniqueColors[i];
                            notificationItem.rgba = _this.hexToRgb(uniqueColors[i]);
                            notificationItem.boxShadow = String.format("0 0 5px {0}", uniqueColors[i]);
                            _this.grouppedNotifications().push(notificationItem);
                        }
                        _this.grouppedNotifications.valueHasMutated();
                    });
                });
            });
        }
        ScriptLinkViewModel.prototype.showNotifications = function (notification) {
            var el = jQuery("#sn-notify-modal").clone().appendTo("#sn-notify-modal");
            SP.UI.ModalDialog.showModalDialog({
                title: "Notifications",
                html: el[0],
                autoSize: true
            });
            el.show();
            ko.applyBindings(notification, el[0]);
            var dlg = SP.UI.ModalDialog.get_childDialog();
            if (dlg) {
                dlg.autoSize();
            }
        };
        ScriptLinkViewModel.prototype.onError = function (e) {
            if (console.log) {
                console.log(e);
                console.log(e.get_message());
            }
        };
        ScriptLinkViewModel.prototype.getNotificationsByColor = function (color, notifications) {
            return notifications.filter(function (notification) {
                return notification.color === color;
            });
        };
        ScriptLinkViewModel.prototype.hexToRgb = function (hex) {
            var bigint = parseInt(hex.substring(1, hex.length), 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;
            return String.format("rgba({0},{1},{2},0.7)", r, g, b);
        };
        ScriptLinkViewModel.prototype.getAppSettings = function () {
            var _this = this;
            var dfd = jQuery.Deferred();
            var context = SP.ClientContext.get_current();
            var appWeb = context.get_site().openWeb(SNScriptLink.Consts.WebRelUrl);
            var list = appWeb.get_lists().getByTitle(SNScriptLink.Consts.AppSettingsListTitle);
            context.load(list);
            context.executeQueryAsync(function () {
                var caml = new SP.CamlQuery();
                caml.set_viewXml(String.format("<View><Query>{0}</View></Query>", SNScriptLink.Consts.AppSettingsCaml));
                var items = list.getItems(caml);
                context.load(items);
                context.executeQueryAsync(function () {
                    dfd.resolve(items.get_item(0));
                }, function (s, e) {
                    _this.onError(e);
                });
            }, function (s, e) {
                _this.onError(e);
            });
            return dfd.promise();
        };
        ScriptLinkViewModel.prototype.getNotifications = function () {
            var _this = this;
            var dfd = jQuery.Deferred();
            var context = SP.ClientContext.get_current();
            var subWeburl = _spPageContextInfo.webServerRelativeUrl.replace(_spPageContextInfo.siteServerRelativeUrl, "");
            if (subWeburl !== "") {
                subWeburl = subWeburl + "/";
            }
            var appWeb = context.get_site().openWeb(subWeburl + SNScriptLink.Consts.WebRelUrl);
            var list = appWeb.get_lists().getByTitle(SNScriptLink.Consts.NotificationsListTitle);
            context.load(list);
            context.executeQueryAsync(function () {
                var caml = new SP.CamlQuery();
                caml.set_viewXml(String.format("<View><Query>{0}</View></Query>", SNScriptLink.Consts.CamlString));
                var items = list.getItems(caml);
                context.load(items);
                context.executeQueryAsync(function () {
                    dfd.resolve(items);
                }, function (s, e) {
                    _this.onError(e);
                });
            }, function (s, e) {
                _this.onError(e);
            });
            return dfd.promise();
        };
        return ScriptLinkViewModel;
    })();
    SNScriptLink.ScriptLinkViewModel = ScriptLinkViewModel;
})(SNScriptLink || (SNScriptLink = {}));
/// <reference path="_references.ts" />
var SNScriptLink;
(function (SNScriptLink) {
    var NotificationItems = (function () {
        function NotificationItems() {
            this.isHovering = ko.observable(false);
            this.notifications = ko.observableArray([]);
        }
        NotificationItems.prototype.onAfterRender = function (data) {
            for (var i = 0; i < data.notifications().length; i++) {
                data.notifications()[i].active(false);
            }
            var firstNotification = data.notifications()[0];
            firstNotification.active(true);
        };
        NotificationItems.prototype.dismiss = function (notification) {
            var activeNotification = this.getActiveNotification();
            var index = this.notifications.indexOf(activeNotification);
            if (this.notifications().length > 1) {
                this.go("next");
            }
            else {
                SP.UI.ModalDialog.get_childDialog().close(SP.UI.DialogResult.OK);
            }
            this.notifications.splice(index, 1);
            this.notifications.valueHasMutated();
            this.updateDissmissedItems(activeNotification);
        };
        NotificationItems.prototype.go = function (direction) {
            var activeNotification = this.getActiveNotification();
            direction === "prev" ? this.goPrev(activeNotification) : this.goNext(activeNotification);
            SP.UI.ModalDialog.get_childDialog().autoSize();
        };
        NotificationItems.prototype.updateDissmissedItems = function (notification) {
            var ctx = SP.ClientContext.get_current();
            ctx.load(ctx.get_web(), "Id");
            ctx.executeQueryAsync(function () {
                var id = ctx.get_web().get_id().toString();
                var dissmissedItems = SNScriptLink.Storage.load(SNScriptLink.Consts.StorageKey);
                if (dissmissedItems == null || !dissmissedItems[id]) {
                    dissmissedItems = dissmissedItems || {};
                    dissmissedItems[id] = [notification.id.toString()];
                }
                else {
                    dissmissedItems[id].push(notification.id.toString());
                }
                SNScriptLink.Storage.save(SNScriptLink.Consts.StorageKey, dissmissedItems);
            }, function (s, e) {
                if (console.log) {
                    console.log(e);
                    console.log(e.get_message());
                }
            });
        };
        NotificationItems.prototype.goNext = function (activeNotification) {
            var index = this.notifications.indexOf(activeNotification);
            var newIndex = 0;
            if (index !== this.notifications().length - 1) {
                newIndex = index + 1;
            }
            activeNotification.active(false);
            var nextNotification = this.notifications()[newIndex];
            nextNotification.active(true);
        };
        NotificationItems.prototype.goPrev = function (activeNotification) {
            var index = this.notifications.indexOf(activeNotification);
            var newIndex = this.notifications().length - 1;
            if (index !== 0) {
                newIndex = index - 1;
            }
            activeNotification.active(false);
            var nextNotification = this.notifications()[newIndex];
            nextNotification.active(true);
        };
        NotificationItems.prototype.getActiveNotification = function () {
            return this.notifications().filter(function (notification) {
                return notification.active();
            })[0];
        };
        return NotificationItems;
    })();
    SNScriptLink.NotificationItems = NotificationItems;
})(SNScriptLink || (SNScriptLink = {}));
/// <reference path="_references.ts" />
var SNScriptLink;
(function (SNScriptLink) {
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        ko.bindingHandlers.hover = {
            init: function (element, valueAccessor) {
                var value = valueAccessor();
                ko.applyBindingsToNode(element, {
                    event: {
                        mouseenter: function () { value(true); },
                        mouseleave: function () { value(false); }
                    }
                });
            }
        };
    }, "snknockout");
})(SNScriptLink || (SNScriptLink = {}));
/// <reference path="_references.ts" />
var SNScriptLink;
(function (SNScriptLink) {
    var Notification = (function () {
        function Notification() {
            this.title = "";
            this.active = ko.observable(false);
        }
        return Notification;
    })();
    SNScriptLink.Notification = Notification;
})(SNScriptLink || (SNScriptLink = {}));
/// <reference path="_references.ts" />
var SNScriptLink;
(function (SNScriptLink) {
    (function (window) {
        function onLzLoaded() {
            jQuery.get(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/templates.html")
                .then(function (data) {
                Type.registerNamespace("ko");
                Type.registerNamespace("LZString");
                jQuery("body").append("<div style=\"display:none\">" + data + "<\/div>");
                jQuery("#RibbonContainer-TabRowRight").prepend("<div class=\"sn-app-bootstrap\" id=\"sn-app-scriptlink\" data-bind=\"template: {name: 'sn-app-scriptlink-tmpl'}\"></div>");
                ko.applyBindings(new SNScriptLink.ScriptLinkViewModel(), document.getElementById("sn-app-scriptlink"));
            });
        }
        function onkoLoaded() {
            if (!window.LZString) {
                var lzLoader = new SNScriptLink.SPAsyncScript("snlzstring", _spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/lz-string.min.js", onLzLoaded);
                lzLoader.load();
            }
            else {
                onLzLoaded();
            }
        }
        function onjQueryLoaded() {
            if (!window.ko) {
                var koLoader = new SNScriptLink.SPAsyncScript("snknockout", _spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/knockout.js", onkoLoaded);
                koLoader.load();
            }
            else {
                onkoLoaded();
            }
        }
        var start = function () {
            SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                if (!window.jQuery) {
                    window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/styles.css");
                    var jqLoader = new SNScriptLink.SPAsyncScript("snjquery", _spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/jquery.js", onjQueryLoaded);
                    jqLoader.load();
                }
                else {
                    onjQueryLoaded();
                }
            }, "sp.js");
            SP.SOD.loadMultiple(["sp.js"], function () { });
        };
        function snstartup() {
            if (_spBodyOnLoadCalled) {
                start();
            }
            else {
                _spBodyOnLoadFunctions.push(start);
            }
        }
        snstartup();
        if (typeof RegisterModuleInit == "function") {
            function mystart() {
                var url = _spPageContextInfo.siteServerRelativeUrl;
                url = url.endsWith("/") ? url : url + "/";
                RegisterModuleInit(url + "SmartNotificationsAssets/sn.scriptlink.js", function () {
                    window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/styles.css");
                    snstartup();
                });
            }
            if (_spBodyOnLoadCalled) {
                mystart();
            }
            else {
                _spBodyOnLoadFunctions.push(mystart);
            }
        }
    })(window);
})(SNScriptLink || (SNScriptLink = {}));
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="SPAsyncScript.ts" />
/// <reference path="Storage.ts" />
/// <reference path="Consts.ts" />
/// <reference path="ScriptLinkViewModel.ts" />
/// <reference path="NotificationItems.ts" />
/// <reference path="HoverBinding.ts" />
/// <reference path="Notification.ts" />
/// <reference path="Loader.ts" /> 

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNQQXN5bmNTY3JpcHQudHMiLCJTdG9yYWdlLnRzIiwiQ29uc3RzLnRzIiwiU2NyaXB0TGlua1ZpZXdNb2RlbC50cyIsIk5vdGlmaWNhdGlvbkl0ZW1zLnRzIiwiSG92ZXJCaW5kaW5nLnRzIiwiTm90aWZpY2F0aW9uLnRzIiwiTG9hZGVyLnRzIiwiX3JlZmVyZW5jZXMudHMiXSwibmFtZXMiOlsiU05TY3JpcHRMaW5rIiwiU05TY3JpcHRMaW5rLlNQQXN5bmNTY3JpcHQiLCJTTlNjcmlwdExpbmsuU1BBc3luY1NjcmlwdC5jb25zdHJ1Y3RvciIsIlNOU2NyaXB0TGluay5TdG9yYWdlIiwiU05TY3JpcHRMaW5rLlN0b3JhZ2UuY29uc3RydWN0b3IiLCJTTlNjcmlwdExpbmsuU3RvcmFnZS5zYXZlIiwiU05TY3JpcHRMaW5rLlN0b3JhZ2UubG9hZCIsIlNOU2NyaXB0TGluay5Db25zdHMiLCJTTlNjcmlwdExpbmsuQ29uc3RzLmNvbnN0cnVjdG9yIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwiLCJTTlNjcmlwdExpbmsuU2NyaXB0TGlua1ZpZXdNb2RlbC5jb25zdHJ1Y3RvciIsIlNOU2NyaXB0TGluay5TY3JpcHRMaW5rVmlld01vZGVsLnNob3dOb3RpZmljYXRpb25zIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwub25FcnJvciIsIlNOU2NyaXB0TGluay5TY3JpcHRMaW5rVmlld01vZGVsLmdldE5vdGlmaWNhdGlvbnNCeUNvbG9yIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwuaGV4VG9SZ2IiLCJTTlNjcmlwdExpbmsuU2NyaXB0TGlua1ZpZXdNb2RlbC5nZXRBcHBTZXR0aW5ncyIsIlNOU2NyaXB0TGluay5TY3JpcHRMaW5rVmlld01vZGVsLmdldE5vdGlmaWNhdGlvbnMiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMuY29uc3RydWN0b3IiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMub25BZnRlclJlbmRlciIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb25JdGVtcy5kaXNtaXNzIiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLmdvIiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLnVwZGF0ZURpc3NtaXNzZWRJdGVtcyIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb25JdGVtcy5nb05leHQiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMuZ29QcmV2IiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLmdldEFjdGl2ZU5vdGlmaWNhdGlvbiIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb24iLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uLmNvbnN0cnVjdG9yIiwiU05TY3JpcHRMaW5rLm9uTHpMb2FkZWQiLCJTTlNjcmlwdExpbmsub25rb0xvYWRlZCIsIlNOU2NyaXB0TGluay5vbmpRdWVyeUxvYWRlZCIsIlNOU2NyaXB0TGluay5zbnN0YXJ0dXAiLCJTTlNjcmlwdExpbmsubXlzdGFydCJdLCJtYXBwaW5ncyI6IkFBQUcsdUNBQXVDO0FBRTFDLElBQVUsWUFBWSxDQXlDckI7QUF6Q0QsV0FBVSxZQUFZLEVBQUMsQ0FBQztJQUV2QkEsSUFBT0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7SUFRcEJBO1FBQ0NDLHVCQUFvQkEsR0FBV0EsRUFBVUEsR0FBV0EsRUFBVUEsTUFBa0JBO1lBRGpGQyxpQkE4QkNBO1lBN0JvQkEsUUFBR0EsR0FBSEEsR0FBR0EsQ0FBUUE7WUFBVUEsUUFBR0EsR0FBSEEsR0FBR0EsQ0FBUUE7WUFBVUEsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBWUE7WUFJeEVBLG1CQUFjQSxHQUFHQTtnQkFDeEJBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLEdBQUdBLENBQUNBLHVDQUF1Q0EsS0FBS0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZFQSxHQUFHQSxDQUFDQSx1Q0FBdUNBLENBQUNBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUN2REEsQ0FBQ0E7Z0JBRURBLEVBQUVBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLE1BQU1BLElBQUlBLE9BQU9BLEtBQUlBLENBQUNBLE1BQU1BLEtBQUtBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUN0REEsS0FBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQ2ZBLENBQUNBO1lBQ0ZBLENBQUNBLENBQUFBO1lBRURBLFNBQUlBLEdBQUdBLFVBQUNBLElBQXFCQTtnQkFBckJBLG9CQUFxQkEsR0FBckJBLFlBQXFCQTtnQkFDNUJBLEdBQUdBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEtBQUlBLENBQUNBLGNBQWNBLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO1lBQ3pEQSxDQUFDQSxDQUFBQTtZQUVEQSx1QkFBa0JBLEdBQUdBLFVBQUNBLFlBQTZCQTtnQkFDbERBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLFVBQUNBLFdBQVdBO29CQUNoQ0EsR0FBR0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9DQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNKQSxDQUFDQSxDQUFBQTtZQUVEQSw2QkFBd0JBLEdBQUdBLFVBQUNBLElBQWNBO2dCQUN6Q0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsR0FBR0E7b0JBQ2hCQSxHQUFHQSxDQUFDQSxjQUFjQSxDQUFDQSxLQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDbkNBLENBQUNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBLENBQUFBO1lBM0JBQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNyQ0EsQ0FBQ0E7UUEyQkZELG9CQUFDQTtJQUFEQSxDQTlCQUQsQUE4QkNDLElBQUFEO0lBOUJZQSwwQkFBYUEsZ0JBOEJ6QkEsQ0FBQUE7QUFDRkEsQ0FBQ0EsRUF6Q1MsWUFBWSxLQUFaLFlBQVksUUF5Q3JCO0FDM0NBLHVDQUF1QztBQUV4QyxJQUFVLFlBQVksQ0FnQnJCO0FBaEJELFdBQVUsWUFBWSxFQUFDLENBQUM7SUFDdkJBO1FBQUFHO1FBY0FDLENBQUNBO1FBYk9ELFlBQUlBLEdBQVhBLFVBQVlBLEdBQVdBLEVBQUVBLElBQVlBO1lBQ3BDRSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNqREEsQ0FBQ0E7UUFFTUYsWUFBSUEsR0FBWEEsVUFBZUEsR0FBV0E7WUFDekJHLElBQUlBLElBQUlBLEdBQUdBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRXJDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7WUFDYkEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBSUEsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDNUJBLENBQUNBO1FBQ0ZILGNBQUNBO0lBQURBLENBZEFILEFBY0NHLElBQUFIO0lBZFlBLG9CQUFPQSxVQWNuQkEsQ0FBQUE7QUFDRkEsQ0FBQ0EsRUFoQlMsWUFBWSxLQUFaLFlBQVksUUFnQnJCO0FDbEJBLHVDQUF1QztBQUV4QyxJQUFVLFlBQVksQ0F1RXJCO0FBdkVELFdBQVUsWUFBWSxFQUFDLENBQUM7SUFDdkJBO1FBQUFPO1FBcUVBQyxDQUFDQTtRQXBFT0QsaUJBQVVBLEdBQUdBLG9CQUFvQkEsQ0FBQ0E7UUFDbENBLGdCQUFTQSxHQUFHQSxvQkFBb0JBLENBQUNBO1FBQ2pDQSw2QkFBc0JBLEdBQUdBLGVBQWVBLENBQUNBO1FBQ3pDQSwyQkFBb0JBLEdBQUdBLGFBQWFBLENBQUNBO1FBQ3JDQSxrQkFBV0EsR0FBR0EsYUFBYUEsQ0FBQ0E7UUFDNUJBLHNCQUFlQSxHQUFHQSx3SkFNZkEsQ0FBQ0E7UUFDSkEsaUJBQVVBLEdBQUdBLGl4REF1RFZBLENBQUNBO1FBQ1pBLGFBQUNBO0lBQURBLENBckVBUCxBQXFFQ08sSUFBQVA7SUFyRVlBLG1CQUFNQSxTQXFFbEJBLENBQUFBO0FBQ0ZBLENBQUNBLEVBdkVTLFlBQVksS0FBWixZQUFZLFFBdUVyQjtBQ3pFQSx1Q0FBdUM7QUFFeEMsSUFBVSxZQUFZLENBbUxyQjtBQW5MRCxXQUFVLFlBQVksRUFBQyxDQUFDO0lBQ3ZCQTtRQUlDUztZQUpEQyxpQkFpTENBO1lBNUtDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLEdBQUdBLEVBQUVBLENBQUNBLGVBQWVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBRXBEQSxJQUFJQSxDQUFDQSxjQUFjQSxFQUFFQTtpQkFDbkJBLElBQUlBLENBQUNBLFVBQUNBLFdBQVdBO2dCQUNqQkEsSUFBSUEsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxXQUFXQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDOUZBLEVBQUVBLENBQUNBLENBQUNBLFdBQVdBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBO29CQUNoQ0EsTUFBTUEsQ0FBQ0E7Z0JBQ1JBLENBQUNBO2dCQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDdkJBLElBQUlBLE9BQU9BLEdBQUdBLElBQUlBLElBQUlBLEVBQUVBLENBQUNBO29CQUN6QkEsSUFBSUEsYUFBYUEsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtvQkFDM0RBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBLEdBQUdBLGFBQWFBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBO29CQUNyRUEsSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBRXhEQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDbkJBLE1BQU1BLENBQUNBO29CQUNSQSxDQUFDQTtnQkFDRkEsQ0FBQ0E7Z0JBRURBLEtBQUlBLENBQUNBLGdCQUFnQkEsRUFBRUE7cUJBQ3JCQSxJQUFJQSxDQUFDQSxVQUFDQSxJQUFJQTtvQkFFVkEsSUFBSUEsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7b0JBQ3pDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDOUJBLEdBQUdBLENBQUNBLGlCQUFpQkEsQ0FBQ0E7d0JBQ3JCQSxJQUFJQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQTt3QkFDM0NBLElBQUlBLFVBQVVBLEdBQUdBLG9CQUFPQSxDQUFDQSxJQUFJQSxDQUE4QkEsbUJBQU1BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO3dCQUU5RUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3hCQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTs0QkFDaEJBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNyQkEsQ0FBQ0E7d0JBRURBLElBQUlBLGVBQWVBLEdBQUdBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO3dCQUNyQ0EsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0E7d0JBQ3RDQSxJQUFJQSxhQUFhQSxHQUFtQkEsRUFBRUEsQ0FBQ0E7d0JBQ3ZDQSxPQUFPQSxVQUFVQSxDQUFDQSxRQUFRQSxFQUFFQSxFQUFFQSxDQUFDQTs0QkFDOUJBLElBQUlBLElBQUlBLEdBQUdBLFVBQVVBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBOzRCQUNwQ0EsSUFBSUEsWUFBWUEsR0FBR0EsSUFBSUEseUJBQVlBLEVBQUVBLENBQUNBOzRCQUN0Q0EsWUFBWUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7NEJBQy9DQSxZQUFZQSxDQUFDQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBOzRCQUMzREEsWUFBWUEsQ0FBQ0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7NEJBQzVDQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQTs0QkFDaERBLFlBQVlBLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBOzRCQUVoQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZUFBZUEsSUFBSUEsZUFBZUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBQ25EQSxFQUFFQSxDQUFDQSxDQUFDQSxlQUFlQSxDQUFDQSxPQUFPQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQ0FDaEVBLFFBQVFBLENBQUNBO2dDQUNWQSxDQUFDQTs0QkFDRkEsQ0FBQ0E7NEJBRURBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO3dCQUNsQ0EsQ0FBQ0E7d0JBRURBLElBQUlBLFlBQVlBLEdBQWFBLEVBQUVBLENBQUNBO3dCQUNoQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsYUFBYUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7NEJBQy9DQSxFQUFFQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDekRBLFlBQVlBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBOzRCQUMzQ0EsQ0FBQ0E7d0JBQ0ZBLENBQUNBO3dCQUVEQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxZQUFZQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTs0QkFDOUNBLElBQUlBLGdCQUFnQkEsR0FBR0EsSUFBSUEsOEJBQWlCQSxFQUFFQSxDQUFDQTs0QkFDL0NBLEVBQUVBLENBQUNBLEtBQUtBLENBQUNBLFlBQVlBLENBQWVBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsRUFBRUEsS0FBSUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDbElBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7NEJBQ2pEQSxnQkFBZ0JBLENBQUNBLEdBQUdBLEdBQUdBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBOzRCQUN2Q0EsZ0JBQWdCQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDdkRBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsYUFBYUEsRUFBRUEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBRTNFQSxLQUFJQSxDQUFDQSxxQkFBcUJBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7d0JBQ3JEQSxDQUFDQTt3QkFFREEsS0FBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtvQkFDOUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNKQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNMQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVERCwrQ0FBaUJBLEdBQWpCQSxVQUFrQkEsWUFBK0JBO1lBQ2hERSxJQUFJQSxFQUFFQSxHQUFHQSxNQUFNQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDekVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLFdBQVdBLENBQUNBLGVBQWVBLENBQUNBO2dCQUNqQ0EsS0FBS0EsRUFBRUEsZUFBZUE7Z0JBQ3RCQSxJQUFJQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsUUFBUUEsRUFBRUEsSUFBSUE7YUFDZEEsQ0FBQ0EsQ0FBQ0E7WUFFSEEsRUFBRUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFFVkEsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsWUFBWUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFdENBLElBQUlBLEdBQUdBLEdBQTRCQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxXQUFZQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUN4RUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1RBLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1lBQ2hCQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVPRixxQ0FBT0EsR0FBZkEsVUFBZ0JBLENBQWtDQTtZQUNqREcsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDZkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRU9ILHFEQUF1QkEsR0FBL0JBLFVBQWdDQSxLQUFhQSxFQUFFQSxhQUE2QkE7WUFDM0VJLE1BQU1BLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLFVBQUNBLFlBQVlBO2dCQUN4Q0EsTUFBTUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsS0FBS0EsS0FBS0EsQ0FBQ0E7WUFDckNBLENBQUNBLENBQUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBRU9KLHNDQUFRQSxHQUFoQkEsVUFBaUJBLEdBQVdBO1lBQzNCSyxJQUFJQSxNQUFNQSxHQUFHQSxRQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUN4REEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO1lBQzVCQSxJQUFJQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUVyQkEsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsdUJBQXVCQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUN4REEsQ0FBQ0E7UUFFT0wsNENBQWNBLEdBQXRCQTtZQUFBTSxpQkF1QkNBO1lBdEJBQSxJQUFJQSxHQUFHQSxHQUFHQSxNQUFNQSxDQUFDQSxRQUFRQSxFQUFlQSxDQUFDQTtZQUN6Q0EsSUFBSUEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7WUFDN0NBLElBQUlBLE1BQU1BLEdBQUdBLE9BQU9BLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLE9BQU9BLENBQUNBLG1CQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUMxREEsSUFBSUEsSUFBSUEsR0FBR0EsTUFBTUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsbUJBQU1BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7WUFDdEVBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRW5CQSxPQUFPQSxDQUFDQSxpQkFBaUJBLENBQUNBO2dCQUN6QkEsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsRUFBRUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7Z0JBQzlCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxpQ0FBaUNBLEVBQUVBLG1CQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDM0ZBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNoQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxPQUFPQSxDQUFDQSxpQkFBaUJBLENBQUNBO29CQUN6QkEsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxDQUFDQSxFQUFFQSxVQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDUEEsS0FBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVKQSxDQUFDQSxFQUFFQSxVQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDUEEsS0FBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakJBLENBQUNBLENBQUNBLENBQUNBO1lBRUhBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBO1FBQ3RCQSxDQUFDQTtRQUVPTiw4Q0FBZ0JBLEdBQXhCQTtZQUFBTyxpQkEyQkNBO1lBMUJBQSxJQUFJQSxHQUFHQSxHQUFHQSxNQUFNQSxDQUFDQSxRQUFRQSxFQUF5QkEsQ0FBQ0E7WUFDbkRBLElBQUlBLE9BQU9BLEdBQUdBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1lBQzdDQSxJQUFJQSxTQUFTQSxHQUFHQSxrQkFBa0JBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxxQkFBcUJBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1lBQzlHQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxLQUFLQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdEJBLFNBQVNBLEdBQUdBLFNBQVNBLEdBQUdBLEdBQUdBLENBQUNBO1lBQzdCQSxDQUFDQTtZQUNEQSxJQUFJQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxHQUFHQSxtQkFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDdEVBLElBQUlBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLFVBQVVBLENBQUNBLG1CQUFNQSxDQUFDQSxzQkFBc0JBLENBQUNBLENBQUNBO1lBQ3hFQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUVuQkEsT0FBT0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtnQkFDekJBLElBQUlBLElBQUlBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO2dCQUM5QkEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsaUNBQWlDQSxFQUFFQSxtQkFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RGQSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDaENBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUNwQkEsT0FBT0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtvQkFDekJBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsRUFBRUEsVUFBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ1BBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFSkEsQ0FBQ0EsRUFBRUEsVUFBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ1BBLEtBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2pCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVIQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7UUFDRlAsMEJBQUNBO0lBQURBLENBakxBVCxBQWlMQ1MsSUFBQVQ7SUFqTFlBLGdDQUFtQkEsc0JBaUwvQkEsQ0FBQUE7QUFDRkEsQ0FBQ0EsRUFuTFMsWUFBWSxLQUFaLFlBQVksUUFtTHJCO0FDckxBLHVDQUF1QztBQUV4QyxJQUFVLFlBQVksQ0ErRnJCO0FBL0ZELFdBQVUsWUFBWSxFQUFDLENBQUM7SUFDdkJBO1FBT0NpQjtZQUhBQyxlQUFVQSxHQUFnQ0EsRUFBRUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFJOURBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLEVBQUVBLENBQUNBLGVBQWVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1FBQzdDQSxDQUFDQTtRQUVERCx5Q0FBYUEsR0FBYkEsVUFBY0EsSUFBdUJBO1lBQ3BDRSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDdERBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3ZDQSxDQUFDQTtZQUNEQSxJQUFJQSxpQkFBaUJBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hEQSxpQkFBaUJBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ2hDQSxDQUFDQTtRQUVERixtQ0FBT0EsR0FBUEEsVUFBUUEsWUFBMEJBO1lBQ2pDRyxJQUFJQSxrQkFBa0JBLEdBQUdBLElBQUlBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0E7WUFDdERBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE9BQU9BLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDM0RBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNyQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7WUFDakJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNtQkEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsV0FBWUEsQ0FBQ0EsZUFBZUEsRUFBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDOUZBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQ3BDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQTtZQUVyQ0EsSUFBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO1FBQ2hEQSxDQUFDQTtRQUVESCw4QkFBRUEsR0FBRkEsVUFBR0EsU0FBaUJBO1lBQ25CSSxJQUFJQSxrQkFBa0JBLEdBQUdBLElBQUlBLENBQUNBLHFCQUFxQkEsRUFBRUEsQ0FBQ0E7WUFDdERBLFNBQVNBLEtBQUtBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLGtCQUFrQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtZQUUvREEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsV0FBWUEsQ0FBQ0EsZUFBZUEsRUFBR0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7UUFDNUVBLENBQUNBO1FBRU9KLGlEQUFxQkEsR0FBN0JBLFVBQThCQSxZQUEwQkE7WUFDdkRLLElBQUlBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLGFBQWFBLENBQUNBLFdBQVdBLEVBQUVBLENBQUNBO1lBQ3pDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUM5QkEsR0FBR0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtnQkFDckJBLElBQUlBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO2dCQUMzQ0EsSUFBSUEsZUFBZUEsR0FBR0Esb0JBQU9BLENBQUNBLElBQUlBLENBQThCQSxtQkFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ25GQSxFQUFFQSxDQUFDQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDckRBLGVBQWVBLEdBQUdBLGVBQWVBLElBQUlBLEVBQUVBLENBQUNBO29CQUN4Q0EsZUFBZUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BEQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1BBLGVBQWVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLENBQUNBO2dCQUN0REEsQ0FBQ0E7Z0JBRURBLG9CQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxtQkFBTUEsQ0FBQ0EsVUFBVUEsRUFBRUEsZUFBZUEsQ0FBQ0EsQ0FBQ0E7WUFDbERBLENBQUNBLEVBQUVBLFVBQUNBLENBQUNBLEVBQUVBLENBQUNBO2dCQUNQQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDakJBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNmQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDOUJBLENBQUNBO1lBQ0ZBLENBQUNBLENBQUNBLENBQUNBO1FBQ0pBLENBQUNBO1FBRU9MLGtDQUFNQSxHQUFkQSxVQUFlQSxrQkFBZ0NBO1lBQzlDTSxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO1lBQzNEQSxJQUFJQSxRQUFRQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVqQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsS0FBS0EsSUFBSUEsQ0FBQ0EsYUFBYUEsRUFBRUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9DQSxRQUFRQSxHQUFHQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7WUFFREEsa0JBQWtCQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUNqQ0EsSUFBSUEsZ0JBQWdCQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUN0REEsZ0JBQWdCQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7UUFFT04sa0NBQU1BLEdBQWRBLFVBQWVBLGtCQUFnQ0E7WUFDOUNPLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE9BQU9BLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7WUFDM0RBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO1lBRS9DQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDakJBLFFBQVFBLEdBQUdBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RCQSxDQUFDQTtZQUVEQSxrQkFBa0JBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ2pDQSxJQUFJQSxnQkFBZ0JBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1lBQ3REQSxnQkFBZ0JBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQy9CQSxDQUFDQTtRQUVPUCxpREFBcUJBLEdBQTdCQTtZQUNDUSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxFQUFFQSxDQUFDQSxNQUFNQSxDQUFDQSxVQUFDQSxZQUFZQTtnQkFDL0NBLE1BQU1BLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBQzlCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNQQSxDQUFDQTtRQUNGUix3QkFBQ0E7SUFBREEsQ0E3RkFqQixBQTZGQ2lCLElBQUFqQjtJQTdGWUEsOEJBQWlCQSxvQkE2RjdCQSxDQUFBQTtBQUNGQSxDQUFDQSxFQS9GUyxZQUFZLEtBQVosWUFBWSxRQStGckI7QUNqR0EsdUNBQXVDO0FBTXhDLElBQVUsWUFBWSxDQWVyQjtBQWZELFdBQVUsWUFBWSxFQUFDLENBQUM7SUFFdkJBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLCtCQUErQkEsQ0FBQ0E7UUFDdENBLEVBQUVBLENBQUNBLGVBQWVBLENBQUNBLEtBQUtBLEdBQUdBO1lBQzFCQSxJQUFJQSxFQUFFQSxVQUFDQSxPQUFPQSxFQUFFQSxhQUFhQTtnQkFDNUJBLElBQUlBLEtBQUtBLEdBQUdBLGFBQWFBLEVBQUVBLENBQUNBO2dCQUM1QkEsRUFBRUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxFQUFFQTtvQkFDL0JBLEtBQUtBLEVBQUVBO3dCQUNOQSxVQUFVQSxFQUFFQSxjQUFRQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFBQSxDQUFDQSxDQUFDQTt3QkFDakNBLFVBQVVBLEVBQUVBLGNBQVFBLEtBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUFBLENBQUNBLENBQUNBO3FCQUNsQ0E7aUJBQ0RBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBO1NBQ0RBLENBQUFBO0lBQ0ZBLENBQUNBLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO0FBQ2xCQSxDQUFDQSxFQWZTLFlBQVksS0FBWixZQUFZLFFBZXJCO0FDckJBLHVDQUF1QztBQUV4QyxJQUFVLFlBQVksQ0FTckI7QUFURCxXQUFVLFlBQVksRUFBQyxDQUFDO0lBQ3ZCQTtRQUFBMEI7WUFLQ0MsVUFBS0EsR0FBV0EsRUFBRUEsQ0FBQ0E7WUFDbkJBLFdBQU1BLEdBQWdDQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFVQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNyRUEsQ0FBQ0E7UUFBREQsbUJBQUNBO0lBQURBLENBUEExQixBQU9DMEIsSUFBQTFCO0lBUFlBLHlCQUFZQSxlQU94QkEsQ0FBQUE7QUFDRkEsQ0FBQ0EsRUFUUyxZQUFZLEtBQVosWUFBWSxRQVNyQjtBQ1hBLHVDQUF1QztBQUV4QyxJQUFVLFlBQVksQ0EwRXJCO0FBMUVELFdBQVUsWUFBWSxFQUFDLENBQUM7SUFFdkJBLENBQUNBLFVBQUNBLE1BQVdBO1FBQ1pBO1lBQ0M0QixNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLENBQUNBLGNBQWNBLEdBQUdBLDBDQUEwQ0EsQ0FBQ0E7aUJBQ3hGQSxJQUFJQSxDQUFDQSxVQUFBQSxJQUFJQTtnQkFDVEEsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDN0JBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBRW5DQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSw4QkFBOEJBLEdBQUdBLElBQUlBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBO2dCQUN6RUEsTUFBTUEsQ0FBQ0EsOEJBQThCQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSwwSEFBMEhBLENBQUNBLENBQUNBO2dCQUUzS0EsRUFBRUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsZ0NBQW1CQSxFQUFFQSxFQUFFQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBO1lBQzNGQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVENUI7WUFDQzZCLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0QkEsSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsMEJBQWFBLENBQUNBLFlBQVlBLEVBQUVBLGtCQUFrQkEsQ0FBQ0EsY0FBY0EsR0FBR0EsNENBQTRDQSxFQUFFQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDN0lBLFFBQVFBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO1lBQ2pCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDUEEsVUFBVUEsRUFBRUEsQ0FBQ0E7WUFDZEEsQ0FBQ0E7UUFDRkEsQ0FBQ0E7UUFFRDdCO1lBQ0M4QixFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEJBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLDBCQUFhQSxDQUFDQSxZQUFZQSxFQUFFQSxrQkFBa0JBLENBQUNBLGNBQWNBLEdBQUdBLHVDQUF1Q0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hJQSxRQUFRQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtZQUNqQkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLFVBQVVBLEVBQUVBLENBQUNBO1lBQ2RBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRUQ5QixJQUFJQSxLQUFLQSxHQUFHQTtZQUNYQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSwrQkFBK0JBLENBQUNBO2dCQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3BCQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxrQkFBa0JBLENBQUNBLGNBQWNBLEdBQUdBLHNDQUFzQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ25HQSxJQUFJQSxRQUFRQSxHQUFHQSxJQUFJQSwwQkFBYUEsQ0FBQ0EsVUFBVUEsRUFBRUEsa0JBQWtCQSxDQUFDQSxjQUFjQSxHQUFHQSxxQ0FBcUNBLEVBQUVBLGNBQWNBLENBQUNBLENBQUNBO29CQUN4SUEsUUFBUUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7Z0JBQ2pCQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ1BBLGNBQWNBLEVBQUVBLENBQUNBO2dCQUNsQkEsQ0FBQ0E7WUFDRkEsQ0FBQ0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsRUFBRUEsY0FBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDM0NBLENBQUNBLENBQUFBO1FBRURBO1lBQ0MrQixFQUFFQSxDQUFDQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBO2dCQUN6QkEsS0FBS0EsRUFBRUEsQ0FBQ0E7WUFDVEEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLHNCQUFzQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDcENBLENBQUNBO1FBQ0ZBLENBQUNBO1FBRUQvQixTQUFTQSxFQUFFQSxDQUFDQTtRQUNaQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxrQkFBa0JBLElBQUlBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO1lBRTdDQTtnQkFDQ2dDLElBQUlBLEdBQUdBLEdBQUdBLGtCQUFrQkEsQ0FBQ0EscUJBQXFCQSxDQUFDQTtnQkFDbkRBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO2dCQUMxQ0Esa0JBQWtCQSxDQUFDQSxHQUFHQSxHQUFHQSwyQ0FBMkNBLEVBQUVBO29CQUNyRUEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxjQUFjQSxHQUFHQSxzQ0FBc0NBLENBQUNBLENBQUNBO29CQUNuR0EsU0FBU0EsRUFBRUEsQ0FBQ0E7Z0JBQ2JBLENBQUNBLENBQUNBLENBQUNBO1lBQ0pBLENBQUNBO1lBRURoQyxFQUFFQSxDQUFDQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBO2dCQUN6QkEsT0FBT0EsRUFBRUEsQ0FBQ0E7WUFDWEEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ1BBLHNCQUFzQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDdENBLENBQUNBO1FBQ0ZBLENBQUNBO0lBQ0ZBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO0FBQ1pBLENBQUNBLEVBMUVTLFlBQVksS0FBWixZQUFZLFFBMEVyQjtBQzVFRCxrREFBa0Q7QUFFbEQseUNBQXlDO0FBQ3pDLG1DQUFtQztBQUNuQyxrQ0FBa0M7QUFDbEMsK0NBQStDO0FBQy9DLDZDQUE2QztBQUM3Qyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLGtDQUFrQyIsImZpbGUiOiJzbi5zY3JpcHRsaW5rLmpzIiwic291cmNlUm9vdCI6Ii4vYXBwL3NjcmlwdGxpbmsifQ==
