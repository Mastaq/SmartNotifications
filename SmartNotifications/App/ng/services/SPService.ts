/// <reference path="../_references.ts" />

namespace SN {
    export class SPService {
        static $inject = [
            "VendorsFactory",
			"ContextService",
			"Consts",
			"$q",
			"$http"
        ];

		private wait: any = null;
		private $: JQueryStatic;
		settingsRepo: AppSettingsRepository;

		private fileList = [
			"./../HostWeb/knockout.js",
			"./../HostWeb/sn.scriptlink.js"];
		private pageUrl = "./../HostWeb/JSInject.tmpl";

		constructor(
			vendorsFactory: { $: JQueryStatic },
			private context: ContextService,
			private consts: Constants,
			private $q: ng.IQService,
			private $http: ng.IHttpService) {
			this.$ = vendorsFactory.$;
			this.settingsRepo = new AppSettingsRepository();
		}

		uploadFileToFolder(url: string, content: string, folder: SP.Folder, overwrite: boolean = true): ng.IPromise<SP.File> {
			var dfd = this.$q.defer<SP.File>();
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

			Ex.executeQueryPromise(context)
				.then(() => {
					dfd.resolve(newFile);
				}, e => {
					dfd.reject(new SPListRepo.RequestError(e));
				});

			return dfd.promise;
		}

		createHostLibrary(): ng.IPromise<SP.List> {
			var dfd = this.$q.defer<SP.List>();

			var context = SP.ClientContext.get_current();
			var hostContext = new SP.AppContextSite(context, this.context.hostUrl);
			var hostWeb = hostContext.get_web();

			var library = hostWeb.get_lists().getByTitle(this.consts.HostLibraryTitle);
			context.load(library, "RootFolder", "Title");

			Ex.executeQueryPromise(context)
				.then(() => {
					return this.createManageAppView(library);
				})
				.catch(e => {
					if (e.get_errorTypeName() === "System.ArgumentException") {
						var listInfo = new SP.ListCreationInformation();
						listInfo.set_quickLaunchOption(SP.QuickLaunchOptions.off);
						listInfo.set_url(this.consts.HostLibraryUrl);
						listInfo.set_title(this.consts.HostLibraryTitle);
						listInfo.set_templateType(101);
						listInfo.set_templateFeatureId(new SP.Guid("00bfea71-e717-4e80-aa17-d0c71b360101"));
						var newLibrary = hostWeb.get_lists().add(listInfo);
						context.load(newLibrary, "RootFolder", "Title");

						Ex.executeQueryPromise(context)
							.then(() => {
								return this.createManageAppView(library);
							})
							.then(() => {
								dfd.resolve(library);
							})
							.catch(e => {
								dfd.reject(new SPListRepo.RequestError(e));
							});
						return null;
					} else {
						var deferred = this.$q.defer();
						deferred.reject(e);
						return deferred.promise;
					}
				})
				.then(() => {
					dfd.resolve(library);
				})
				.catch(e => {
					dfd.reject(new SPListRepo.RequestError(e));
				});

			return dfd.promise;
		}

		uploadFiles(folder: SP.Folder): ng.IPromise<any> {
			var defList: ng.IPromise<any>[] = [];

			for (var i = 0; i < this.fileList.length; i++) {
				var file = this.fileList[i];
				((file) => {
					defList.push(this.$http.get<string>(file)
						.success(data => {
							defList.push(this.uploadFileToFolder(this.getFileName(file), data, folder));
						}));
				})(file);
			}

			return this.$q.all(defList);
		}

		doesUserHaveFullControl(): ng.IPromise<boolean> {
			var dfd = this.$q.defer<boolean>();
			var context = SP.ClientContext.get_current();

			context.load(context.get_web(), "EffectiveBasePermissions");

			Ex.executeQueryPromise(context)
				.then(() => {
					if (context.get_web().get_effectiveBasePermissions().has(SP.PermissionKind.manageWeb)) {
						dfd.resolve(true);
					} else {
						dfd.resolve(false);
					}
				})
				.catch(e => {
					dfd.reject(new SPListRepo.RequestError(e));
				});
			return dfd.promise;
		}

		getHostCustomizationStatus(): ng.IPromise<boolean> {
			var dfd = this.$q.defer<boolean>();

			var context = SP.ClientContext.get_current();
			var hostContext = new SP.AppContextSite(context, this.context.hostUrl);
			var hostActions = hostContext.get_web().get_userCustomActions();
			context.load(hostActions);

			Ex.executeQueryPromise(context)
				.then(() => {
					var enumerator = hostActions.getEnumerator();
					var resolved = false;
					while (enumerator.moveNext()) {
						var action = enumerator.get_current();
						if (action.get_name() === this.consts.ScriptLinkId) {
							dfd.resolve(true);
							resolved = true;
						}
					}

					if (!resolved) {
						dfd.resolve(false);
					}
				})
				.catch(e => {
					dfd.reject(new SPListRepo.RequestError(e));
				});
			return dfd.promise;
		}

		private getFileName(input: string): string {
			return input.replace(/^.*[\\\/]/, '');
		}

		private createManageAppView(library: SP.List): ng.IPromise<any> {
			var dfd = this.$q.defer<any>();

			var wpstr = "<webParts>  <webPart xmlns=\"http://schemas.microsoft.com/WebPart/v3\">    <metaData>      <type name=\"Microsoft.SharePoint.WebPartPages.ScriptEditorWebPart, Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c\" />      <importErrorMessage>Cannot import this Web Part.</importErrorMessage>    </metaData>    <data>      <properties>        <property name=\"ExportMode\" type=\"exportmode\">All</property>        <property name=\"HelpUrl\" type=\"string\" />        <property name=\"Hidden\" type=\"bool\">False</property>        <property name=\"Description\" type=\"string\">Allows authors to insert HTML snippets or scripts.</property>        <property name=\"Content\" type=\"string\">&lt;div&gt;hello!&lt;/div&gt;</property>        <property name=\"CatalogIconImageUrl\" type=\"string\" />        <property name=\"Title\" type=\"string\">Script Editor</property>        <property name=\"AllowHide\" type=\"bool\">True</property>        <property name=\"AllowMinimize\" type=\"bool\">True</property>        <property name=\"AllowZoneChange\" type=\"bool\">True</property>        <property name=\"TitleUrl\" type=\"string\" />        <property name=\"ChromeType\" type=\"chrometype\">None</property>        <property name=\"AllowConnect\" type=\"bool\">True</property>        <property name=\"Width\" type=\"unit\" />        <property name=\"Height\" type=\"unit\" />        <property name=\"HelpMode\" type=\"helpmode\">Navigate</property>        <property name=\"AllowEdit\" type=\"bool\">True</property>        <property name=\"TitleIconImageUrl\" type=\"string\" />        <property name=\"Direction\" type=\"direction\">NotSet</property>        <property name=\"AllowClose\" type=\"bool\">True</property>        <property name=\"ChromeState\" type=\"chromestate\">Normal</property>      </properties>    </data>  </webPart></webParts>";
			//var wpstr = "<webParts>  <webPart xmlns=\"http://schemas.microsoft.com/WebPart/v3\">    <metaData>      <type name=\"Microsoft.SharePoint.WebPartPages.ScriptEditorWebPart, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c\" />      <importErrorMessage>Cannot import this Web Part.</importErrorMessage>    </metaData>    <data>      <properties>        <property name=\"ExportMode\" type=\"exportmode\">All</property>        <property name=\"HelpUrl\" type=\"string\" />        <property name=\"Hidden\" type=\"bool\">False</property>        <property name=\"Description\" type=\"string\">Allows authors to insert HTML snippets or scripts.</property>        <property name=\"Content\" type=\"string\">&lt;div&gt;hellloooo!!!&lt;/div&gt;</property>        <property name=\"CatalogIconImageUrl\" type=\"string\" />        <property name=\"Title\" type=\"string\">Script Editor</property>        <property name=\"AllowHide\" type=\"bool\">True</property>        <property name=\"AllowMinimize\" type=\"bool\">True</property>        <property name=\"AllowZoneChange\" type=\"bool\">True</property>        <property name=\"TitleUrl\" type=\"string\" />        <property name=\"ChromeType\" type=\"chrometype\">None</property>        <property name=\"AllowConnect\" type=\"bool\">True</property>        <property name=\"Width\" type=\"unit\" />        <property name=\"Height\" type=\"unit\" />        <property name=\"HelpMode\" type=\"helpmode\">Navigate</property>        <property name=\"AllowEdit\" type=\"bool\">True</property>        <property name=\"TitleIconImageUrl\" type=\"string\" />        <property name=\"Direction\" type=\"direction\">NotSet</property>        <property name=\"AllowClose\" type=\"bool\">True</property>        <property name=\"ChromeState\" type=\"chromestate\">Normal</property>      </properties>    </data>  </webPart></webParts>";

			var context = SP.ClientContext.get_current();
			var viewInfo = new SP.ViewCreationInformation();
			viewInfo.set_title(this.consts.ManageAppView);
			viewInfo.set_viewTypeKind(SP.ViewType.html);
			var view = library.get_views().add(viewInfo);
			context.load(view);
			context.load(context.get_web(), "ServerRelativeUrl");

			Ex.executeQueryPromise(context)
				.then(() => {
					var viewFile = library.get_parentWeb().getFileByServerRelativeUrl(view.get_serverRelativeUrl());
					var hostWPManager = viewFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
					var viewWebParts = hostWPManager.get_webParts();
					context.load(viewWebParts);

					return Ex.executeQueryPromise(context, { viewWebParts: viewWebParts, hostWPManager: hostWPManager });
				})
				.then((data) => {
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

					return Ex.executeQueryPromise(context);
				})
				.then(() => {
					dfd.resolve();
				})
				.catch(e => {
					dfd.reject(e);
				});

			return dfd.promise;
		}
    }

	angular.module("SN.app.services").service("SPService", SPService);
}