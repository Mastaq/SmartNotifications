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
            this.getNotifications()
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
                }, function (s, e) {
                    _this.onError(e);
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
            jQuery.get(_spPageContextInfo.webAbsoluteUrl + "/SmartNotificationsAssets/templates.html")
                .then(function (data) {
                jQuery("body").append("<div style=\"display:none\">" + data + "<\/div>");
                jQuery("#RibbonContainer-TabRowRight").prepend("<div class=\"sn-app-bootstrap\" id=\"sn-app-scriptlink\" data-bind=\"template: {name: 'sn-app-scriptlink-tmpl'}\">hello</div>");
                ko.applyBindings(new SNScriptLink.ScriptLinkViewModel(), document.getElementById("sn-app-scriptlink"));
            });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNQQXN5bmNTY3JpcHQudHMiLCJTdG9yYWdlLnRzIiwiQ29uc3RzLnRzIiwiU2NyaXB0TGlua1ZpZXdNb2RlbC50cyIsIk5vdGlmaWNhdGlvbkl0ZW1zLnRzIiwiSG92ZXJCaW5kaW5nLnRzIiwiTm90aWZpY2F0aW9uLnRzIiwiTG9hZGVyLnRzIiwiX3JlZmVyZW5jZXMudHMiXSwibmFtZXMiOlsiU05TY3JpcHRMaW5rIiwiU05TY3JpcHRMaW5rLlNQQXN5bmNTY3JpcHQiLCJTTlNjcmlwdExpbmsuU1BBc3luY1NjcmlwdC5jb25zdHJ1Y3RvciIsIlNOU2NyaXB0TGluay5TdG9yYWdlIiwiU05TY3JpcHRMaW5rLlN0b3JhZ2UuY29uc3RydWN0b3IiLCJTTlNjcmlwdExpbmsuU3RvcmFnZS5zYXZlIiwiU05TY3JpcHRMaW5rLlN0b3JhZ2UubG9hZCIsIlNOU2NyaXB0TGluay5Db25zdHMiLCJTTlNjcmlwdExpbmsuQ29uc3RzLmNvbnN0cnVjdG9yIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwiLCJTTlNjcmlwdExpbmsuU2NyaXB0TGlua1ZpZXdNb2RlbC5jb25zdHJ1Y3RvciIsIlNOU2NyaXB0TGluay5TY3JpcHRMaW5rVmlld01vZGVsLnNob3dOb3RpZmljYXRpb25zIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwub25FcnJvciIsIlNOU2NyaXB0TGluay5TY3JpcHRMaW5rVmlld01vZGVsLmdldE5vdGlmaWNhdGlvbnNCeUNvbG9yIiwiU05TY3JpcHRMaW5rLlNjcmlwdExpbmtWaWV3TW9kZWwuaGV4VG9SZ2IiLCJTTlNjcmlwdExpbmsuU2NyaXB0TGlua1ZpZXdNb2RlbC5nZXROb3RpZmljYXRpb25zIiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zIiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLmNvbnN0cnVjdG9yIiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLm9uQWZ0ZXJSZW5kZXIiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMuZGlzbWlzcyIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb25JdGVtcy5nbyIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb25JdGVtcy51cGRhdGVEaXNzbWlzc2VkSXRlbXMiLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uSXRlbXMuZ29OZXh0IiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbkl0ZW1zLmdvUHJldiIsIlNOU2NyaXB0TGluay5Ob3RpZmljYXRpb25JdGVtcy5nZXRBY3RpdmVOb3RpZmljYXRpb24iLCJTTlNjcmlwdExpbmsuTm90aWZpY2F0aW9uIiwiU05TY3JpcHRMaW5rLk5vdGlmaWNhdGlvbi5jb25zdHJ1Y3RvciIsIlNOU2NyaXB0TGluay5vbmtvTG9hZGVkIiwiU05TY3JpcHRMaW5rLm9ualF1ZXJ5TG9hZGVkIl0sIm1hcHBpbmdzIjoiQUFBRyx1Q0FBdUM7QUFFMUMsSUFBVSxZQUFZLENBeUNyQjtBQXpDRCxXQUFVLFlBQVksRUFBQyxDQUFDO0lBRXZCQSxJQUFPQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQTtJQVFwQkE7UUFDQ0MsdUJBQW9CQSxHQUFXQSxFQUFVQSxHQUFXQSxFQUFVQSxNQUFrQkE7WUFEakZDLGlCQThCQ0E7WUE3Qm9CQSxRQUFHQSxHQUFIQSxHQUFHQSxDQUFRQTtZQUFVQSxRQUFHQSxHQUFIQSxHQUFHQSxDQUFRQTtZQUFVQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFZQTtZQUl4RUEsbUJBQWNBLEdBQUdBO2dCQUN4QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsR0FBR0EsQ0FBQ0EsdUNBQXVDQSxLQUFLQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDdkVBLEdBQUdBLENBQUNBLHVDQUF1Q0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3ZEQSxDQUFDQTtnQkFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsTUFBTUEs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
