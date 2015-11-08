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
			"./../HostWeb/External/knockout.js",
			"./../HostWeb/External/jquery.js",
			"./../HostWeb/External/bootstrap.css",
			"./../HostWeb/build/styles.css",
			"./../HostWeb/build/sn.manage.host.js",
			"./../HostWeb/build/sn.scriptlink.js"];

		private newFileList = [
			"HostWeb/template/templates.html"];

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

		uploadFileToFolder2(url: string, content: SP.Base64EncodedByteArray, folder: SP.Folder, overwrite: boolean = true): ng.IPromise<SP.File> {
			var dfd = this.$q.defer<SP.File>();
			var context = SP.ClientContext.get_current();

			var fileCreateInfo = new SP.FileCreationInformation();

			fileCreateInfo.set_url(url);
			fileCreateInfo.set_overwrite(overwrite);
			fileCreateInfo.set_content(content);

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
					this.createManageAppView(library)
						.then(() => {
							dfd.resolve(library);
						})
						.catch(e => {
							dfd.reject(new SPListRepo.RequestError(e));
						});
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

		uploadFiles2(folder: SP.Folder): ng.IPromise<any> {
			var dfd = this.$q.defer();
			var fileList: SP.File[] = [];

			var context = SP.ClientContext.get_current();
			var web = context.get_web();
			context.load(web, "ServerRelativeUrl");

			Ex.executeQueryPromise(context)
				.then(() => {
					var webRelativeUrl = SPListRepo.Helper.ensureTrailingSlash(web.get_serverRelativeUrl());
					for (var i = 0; i < this.newFileList.length; i++) {
						var file = context.get_web().getFileByServerRelativeUrl(webRelativeUrl + this.newFileList[i]);
						fileList.push(file);
						context.load(file);
					}

					return Ex.executeQueryPromise(context);
				})
				.then(() => {
					return this.$q.all(this.newFileList.map((file, indx) => {
						var spFile = fileList[indx];
						var binaryInfo = new SP.FileSaveBinaryInformation();
						spFile.saveBinary(binaryInfo);
						return this.uploadFileToFolder2(this.getFileName(file), binaryInfo.get_content(), folder);
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

		private createManageAppView(library: SP.List): ng.IPromise<any> {
			var dfd = this.$q.defer<any>();

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
					var hostWpManager = viewFile.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);

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