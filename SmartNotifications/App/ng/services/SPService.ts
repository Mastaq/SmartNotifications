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
			"./../HostWeb/template/templates.html",
			"./../HostWeb/template/cewp.html",
			"./../HostWeb/External/knockout.js",
			"./../HostWeb/External/jquery.js",
			"./../HostWeb/External/lz-string.min.js",
			"./../HostWeb/External/bootstrap.css",
			"./../HostWeb/build/styles.css",
			"./../HostWeb/build/sn.manage.host.js",
			"./../HostWeb/build/sn.scriptlink.js"];

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
						dfd.resolve(library);
				}, e => {
					if (e.get_errorTypeName() === "System.ArgumentException") {
						var listInfo = new SP.ListCreationInformation();
						listInfo.set_quickLaunchOption(SP.QuickLaunchOptions.off);
						listInfo.set_url(this.consts.HostLibraryUrl);
						listInfo.set_title(this.consts.HostLibraryTitle);
						listInfo.set_templateType(101);
						listInfo.set_templateFeatureId(new SP.Guid("00bfea71-e717-4e80-aa17-d0c71b360101"));
						var newLibrary = hostWeb.get_lists().add(listInfo);
						context.load(newLibrary, "RootFolder", "Title");
						context.load(hostWeb, "ServerRelativeUrl");

						Ex.executeQueryPromise(context)
							.then(() => {
								return this.createManageAppPage(library, hostWeb);
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
				.catch(e => {
					dfd.reject(new SPListRepo.RequestError(e));
				});

			return dfd.promise;
		}

		uploadFiles(folder: SP.Folder): ng.IPromise<any> {
			var dfd = this.$q.defer();

			this.$q.all(this.fileList.map(file => {
				return this.$http.get<string>(file);
			}))
				.then(data => {
					return this.$q.all(this.fileList.map((file, indx) => {
						return this.uploadFileToFolder(this.getFileName(file), (<any>data[indx]).data, folder);
					}));
				})
				.then(() => {
					dfd.resolve();
				})
				.catch((e: SP.ClientRequestFailedEventArgs | any) => {
					if (e instanceof SP.ClientRequestFailedEventArgs) {
						dfd.reject(new SPListRepo.RequestError(e));
					} else {
						dfd.reject(e);
					}
				});

			return dfd.promise;
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

		private createManageAppPage(library: SP.List, hostWeb: SP.Web): ng.IPromise<any> {
			var dfd = this.$q.defer<any>();

			var context = SP.ClientContext.get_current();
			var hostRelativeUrl = SPListRepo.Helper.ensureTrailingSlash(hostWeb.get_serverRelativeUrl());
			var file = library.get_rootFolder().get_files().addTemplateFile(hostRelativeUrl + this.consts.HostLibraryUrl +
				"/" + this.consts.ManageAppPage, SP.TemplateFileType.standardPage);
			context.load(file);
			context.load(context.get_web(), "ServerRelativeUrl");

			Ex.executeQueryPromise(context)
				.then(() => {
					var manageAppFile = library.get_parentWeb().getFileByServerRelativeUrl(file.get_serverRelativeUrl());
					var hostWpManager = manageAppFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);

					var appWebRelativeUrl = SPListRepo.Helper.ensureTrailingSlash(context.get_web().get_serverRelativeUrl());
					var appFileUrl = String.format("{0}Pages/Default.aspx", appWebRelativeUrl);
					var appFile = library.get_parentWeb().getFileByServerRelativeUrl(appFileUrl);
					var appManager = appFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);

					var webPartDefinition = appManager.importWebPart(this.consts.WebPartTemplate);
					var webPart = webPartDefinition.get_webPart();
					hostWpManager.addWebPart(webPart, "", 1);

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