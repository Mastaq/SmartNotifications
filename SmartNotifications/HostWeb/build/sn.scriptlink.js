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
            var appWeb = context.get_site().openWeb(SNScriptLink.Consts.WebRelUrl);
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
        function onkoLoaded() {
            var lzLoader = new SNScriptLink.SPAsyncScript("snlzstring", _spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/lz-string.min.js", function () {
                jQuery.get(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/templates.html")
                    .then(function (data) {
                    jQuery("body").append("<div style=\"display:none\">" + data + "<\/div>");
                    jQuery("#RibbonContainer-TabRowRight").prepend("<div class=\"sn-app-bootstrap\" id=\"sn-app-scriptlink\" data-bind=\"template: {name: 'sn-app-scriptlink-tmpl'}\">hello</div>");
                    ko.applyBindings(new SNScriptLink.ScriptLinkViewModel(), document.getElementById("sn-app-scriptlink"));
                });
            });
            lzLoader.load();
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
        if (_spBodyOnLoadCalled) {
            start();
        }
        else {
            _spBodyOnLoadFunctions.push(start);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNQQXN5bmNTY3JpcHQudHMiLCJTdG9yYWdlLnRzIiwiQ29uc3RzLnRzIiwiU2NyaXB0TGlua1ZpZXdNb2RlbC50cyIsIk5vdGlmaWNhdGlvbkl0ZW1zLnRzIiwiSG92ZXJCaW5kaW5nLnRzIiwiTm90aWZpY2F0aW9uLnRzIiwiTG9hZGVyLnRzIiwiX3JlZmVyZW5jZXMudHMiXSwibmFtZXMiOlsiU05TY3JpcHRMaW5rIiwiU05TY3JpcHRMaW5rLlNQQXN5bmNTY3JpcHQiLCJTTlNjcmlwdExpbmsuU1BBc3luY1NjcmlwdC5jb25zdHJ1Y3RvciIsIlNOU2NyaXB0TGluay5TdG9yYWdlIiwiU05TY3JpcHRMaW5rLlN0b3JhZ2UuY29uc3RydWN0b3IiLCJTTlNjcmlwdExpbmsuU3RvcmFnZS5zYXZlIiwiU05TY3JpcHRMaW5rLlN0b3JhZ2UubG9hZCIsIlNOU2NyaXB0TGluay5Db25zdHMiLCJTTlNjcmlwdExpbmsuQ29uc3RzLmNvbnN0cnVjdG9yIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwiLCJTTlNjcmlwdExpbmsuU2NyaXB0TGlua1ZpZXdNb2RlbC5jb25zdHJ1Y3RvciIsIlNOU2NyaXB0TGluay5TY3JpcHRMaW5rVmlld01vZGVsLnNob3dOb3RpZmljYXRpb25zIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwub25FcnJvciIsIlNOU2NyaXB0TGluay5TY3JpcHRMaW5rVmlld01vZGVsLmdldE5vdGlmaWNhdGlvbnNCeUNvbG9yIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwuaGV4VG9SZ2IiLCJTTlNjcmlwdExpbmsuU2NyaXB0TGlua1ZpZXdNb2RlbC5nZXRBcHBTZXR0aW5ncyIsIlNOU2NyaXB0TGluay5TY3JpcHRMaW5rVmlld01vZGVsLmdldE5vdGlmaWNhdGlvbnMiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMuY29uc3RydWN0b3IiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMub25BZnRlclJlbmRlciIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb25JdGVtcy5kaXNtaXNzIiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLmdvIiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLnVwZGF0ZURpc3NtaXNzZWRJdGVtcyIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb25JdGVtcy5nb05leHQiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMuZ29QcmV2IiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLmdldEFjdGl2ZU5vdGlmaWNhdGlvbiIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb24iLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uLmNvbnN0cnVjdG9yIiwiU05TY3JpcHRMaW5rLm9ua29Mb2FkZWQiLCJTTlNjcmlwdExpbmsub25qUXVlcnlMb2FkZWQiXSwibWFwcGluZ3MiOiJBQUFHLHVDQUF1QztBQUUxQyxJQUFVLFlBQVksQ0F5Q3JCO0FBekNELFdBQVUsWUFBWSxFQUFDLENBQUM7SUFFdkJBLElBQU9BLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBO0lBUXBCQTtRQUNDQyx1QkFBb0JBLEdBQVdBLEVBQVVBLEdBQVdBLEVBQVVBLE1BQWtCQTtZQURqRkMsaUJBOEJDQTtZQTdCb0JBLFFBQUdBLEdBQUhBLEdBQUdBLENBQVFBO1lBQVVBLFFBQUdBLEdBQUhBLEdBQUdBLENBQVFBO1lBQVVBLFdBQU1BLEdBQU5BLE1BQU1BLENBQVlBO1lBSXhFQSxtQkFBY0EsR0FBR0E7Z0JBQ3hCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQSxDQUFDQSx1Q0FBdUNBLEtBQUtBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBO29CQUN2RUEsR0FBR0EsQ0FBQ0EsdUNBQXVDQSxDQUFDQSxLQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDdkRB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QUFJQSxRQUFRQSxHQUFHQSxJQUFJQSwwQkFBYUEsQ0FBQ0EsWUFBWUEsRUFBRUEsa0JBQWtCQSxDQUFDQSxjQUFjQSxHQUFHQSx1Q0FBdUNBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO2dCQUN4SUEsUUFBUUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7WUFDakJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNQQSxVQUFVQSxFQUFFQSxDQUFDQTtZQUNkQSxDQUFDQTtRQUNGQSxDQUFDQTtRQUVEN0IsSUFBSUEsS0FBS0EsR0FBR0E7WUFDWEEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsK0JBQStCQSxDQUFDQTtnQkFDdENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO29CQUNwQkEsTUFBTUEsQ0FBQ0EsZUFBZUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxjQUFjQSxHQUFHQSxzQ0FBc0NBLENBQUNBLENBQUNBO29CQUNuR0EsSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsMEJBQWFBLENBQUNBLFVBQVVBLEVBQUVBLGtCQUFrQkEsQ0FBQ0EsY0FBY0EsR0FBR0EscUNBQXFDQSxFQUFFQSxjQUFjQSxDQUFDQSxDQUFDQTtvQkFDeElBLFFBQVFBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBO2dCQUNqQkEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNQQSxjQUFjQSxFQUFFQSxDQUFDQTtnQkFDbEJBLENBQUNBO1lBQ0ZBLENBQUNBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO1lBQ1pBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLEVBQUVBLGNBQVFBLENBQUNBLENBQUNBLENBQUNBO1FBQzNDQSxDQUFDQSxDQUFBQTtRQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pCQSxLQUFLQSxFQUFFQSxDQUFDQTtRQUNUQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUNQQSxzQkFBc0JBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQ3BDQSxDQUFDQTtJQUNGQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtBQUNaQSxDQUFDQSxFQTNDUyxZQUFZLEtBQVosWUFBWSxRQTJDckI7QUM3Q0Qsa0RBQWtEO0FBRWxELHlDQUF5QztBQUN6QyxtQ0FBbUM7QUFDbkMsa0NBQWtDO0FBQ2xDLCtDQUErQztBQUMvQyw2Q0FBNkM7QUFDN0Msd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4QyxrQ0FBa0MiLCJmaWxlIjoic24uc2NyaXB0bGluay5qcyIsInNvdXJjZVJvb3QiOiIuL2FwcC9zY3JpcHRsaW5rIn0=
