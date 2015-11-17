/// <reference path="_references.ts" />

namespace SNScriptLink {
	export class ScriptLinkViewModel {

		grouppedNotifications: KnockoutObservableArray<NotificationItems>;

		constructor() {
			this.grouppedNotifications = ko.observableArray([]);

			this.getAppSettings()
				.then((settingItem) => {
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

					this.getNotifications()
						.then((data) => {

							var ctx = SP.ClientContext.get_current();
							ctx.load(ctx.get_web(), "Id");
							ctx.executeQueryAsync(() => {
								var id = ctx.get_web().get_id().toString();
								var dissmissed = Storage.load<{ [key: string]: string[] }>(Consts.StorageKey);

								if (dissmissed == null) {
									dissmissed = {};
									dissmissed[id] = [];
								}

								var dissmissedItems = dissmissed[id];
								var enumerator = data.getEnumerator();
								var notifications: Notification[] = [];
								while (enumerator.moveNext()) {
									var item = enumerator.get_current();
									var notification = new Notification();
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

								var uniqueColors: string[] = [];
								for (let i = 0; i < notifications.length; i++) {
									if (uniqueColors.indexOf(notifications[i].color) === -1) {
										uniqueColors.push(notifications[i].color);
									}
								}

								for (let i = 0; i < uniqueColors.length; i++) {
									var notificationItem = new NotificationItems();
									ko.utils.arrayPushAll<Notification>(notificationItem.notifications, this.getNotificationsByColor(uniqueColors[i], notifications));
									notificationItem.notifications.valueHasMutated();
									notificationItem.key = uniqueColors[i];
									notificationItem.rgba = this.hexToRgb(uniqueColors[i]);
									notificationItem.boxShadow = String.format("0 0 5px {0}", uniqueColors[i]);

									this.grouppedNotifications().push(notificationItem);
								}

								this.grouppedNotifications.valueHasMutated();
							});
						});
				});
		}

		showNotifications(notification: NotificationItems) {
			var el = jQuery("#sn-notify-modal").clone().appendTo("#sn-notify-modal");
			SP.UI.ModalDialog.showModalDialog({
				title: "Notifications",
				html: el[0],
				autoSize: true
			});

			el.show();

			ko.applyBindings(notification, el[0]);

			var dlg = <SP.UI.ModalDialog>(<any>SP.UI.ModalDialog).get_childDialog();
			if (dlg) {
				dlg.autoSize();
			}
		}

		private onError(e: SP.ClientRequestFailedEventArgs) {
			if (console.log) {
				console.log(e);
				console.log(e.get_message());
			}
		}

		private getNotificationsByColor(color: string, notifications: Notification[]): Notification[] {
			return notifications.filter((notification) => {
				return notification.color === color;
			});
		}

		private hexToRgb(hex: string) {
			var bigint = parseInt(hex.substring(1, hex.length), 16);
			var r = (bigint >> 16) & 255;
			var g = (bigint >> 8) & 255;
			var b = bigint & 255;

			return String.format("rgba({0},{1},{2},0.7)", r, g, b);
		}

		private getAppSettings(): JQueryPromise<SP.ListItem> {
			var dfd = jQuery.Deferred<SP.ListItem>();
			var context = SP.ClientContext.get_current();
			var appWeb = context.get_site().openWeb(this.getSubWebUrl() + Consts.WebRelUrl);
			var list = appWeb.get_lists().getByTitle(Consts.AppSettingsListTitle);
			context.load(list);

			context.executeQueryAsync(() => {
				var caml = new SP.CamlQuery();
				caml.set_viewXml(String.format("<View><Query>{0}</View></Query>", Consts.AppSettingsCaml));
				var items = list.getItems(caml);
				context.load(items);
				context.executeQueryAsync(() => {
					dfd.resolve(items.get_item(0));
				}, (s, e) => {
					this.onError(e);
				});

			}, (s, e) => {
				this.onError(e);
			});

			return dfd.promise();
		}

		private getSubWebUrl(): string {
			var subWeburl = _spPageContextInfo.webServerRelativeUrl.replace(_spPageContextInfo.siteServerRelativeUrl, "");
			if (subWeburl !== "") {
				subWeburl = subWeburl + "/";
			}

			subWeburl = subWeburl.indexOf("/") === 0 ? subWeburl.substring(1) : subWeburl;

			return subWeburl;
		}

		private getNotifications(): JQueryPromise<SP.ListItemCollection> {
			var dfd = jQuery.Deferred<SP.ListItemCollection>();
			var context = SP.ClientContext.get_current();
			var appWeb = context.get_site().openWeb(this.getSubWebUrl() + Consts.WebRelUrl);
			var list = appWeb.get_lists().getByTitle(Consts.NotificationsListTitle);
			context.load(list);

			context.executeQueryAsync(() => {
				var caml = new SP.CamlQuery();
				caml.set_viewXml(String.format("<View><Query>{0}</View></Query>", Consts.CamlString));
				var items = list.getItems(caml);
				context.load(items);
				context.executeQueryAsync(() => {
					dfd.resolve(items);
				}, (s, e) => {
					this.onError(e);
				});

			}, (s, e) => {
				this.onError(e);
			});

			return dfd.promise();
		}
	}
}