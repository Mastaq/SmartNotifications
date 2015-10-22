/// <reference path="../_references.ts" />

namespace SN {
    export class SPService {
        static $inject = [
            "VendorsFactory",
			"ContextService",
			"Consts",
			"$q"
        ];

		private wait: any = null;
		private $: JQueryStatic;

		constructor(
			vendorsFactory: { $: JQueryStatic },
			private context: ContextService,
			private consts: Constants,
			private $q: ng.IQService) {
			this.$ = vendorsFactory.$;
		}

		public getSettings(): ng.IPromise<AppSettingsBaseItem> {
			var dfd = this.$q.defer<AppSettingsBaseItem>();

			var appSettingsRepo = new AppSettingsRepository();

			appSettingsRepo.getSettingsByKey("")
				.done(data => {
					dfd.resolve(data);
				})
				.fail((err) => {
					dfd.reject(err);
				});

			return dfd.promise;
		}

		public uploadFileToHostLibrary(url: string, content: string, folder: SP.Folder, overwrite: boolean = true) {
			var dfd = this.$q.defer();

			var context = SP.ClientContext.get_current();
			var factory = new SP.ProxyWebRequestExecutorFactory(this.context.appUrl);
			context.set_webRequestExecutorFactory(factory);
			var hostContext = new SP.AppContextSite(context, this.context.hostUrl);

			var fileCreateInfo = new SP.FileCreationInformation();

			fileCreateInfo.set_url(url);
			fileCreateInfo.set_overwrite(overwrite);
			fileCreateInfo.set_content(new SP.Base64EncodedByteArray());

			for (var i = 0; i < content.length; i++) {
				fileCreateInfo.get_content().append(content.charCodeAt(i));
			}

			var newFile = hostContext.get_web().getFolderByServerRelativeUrl(folder.get_serverRelativeUrl()).get_files().add(fileCreateInfo);

			context.load(newFile);
			context.executeQueryAsync(() => {
				dfd.resolve();
			}, (sender, args) => {
				dfd.reject(new SPListRepo.RequestError(args));
			});

			return dfd.promise;
		}

		public createHostLibrary(): ng.IPromise<SP.List> {
			var dfd = this.$q.defer<SP.List>();

			var context = SP.ClientContext.get_current();
			var factory = new SP.ProxyWebRequestExecutorFactory(this.context.appUrl);
			context.set_webRequestExecutorFactory(factory);
			var hostContext = new SP.AppContextSite(context, this.context.hostUrl);

			var hostWeb = hostContext.get_web();

			var library = hostWeb.get_lists().getByTitle(this.consts.HostLibraryTitle);
			context.load(library, "RootFolder", "Title");
			context.executeQueryAsync(() => {
				dfd.resolve(library);
			}, (sender, args) => {
				if (args.get_errorTypeName() === "System.ArgumentException") {
					var listInfo = new SP.ListCreationInformation();
					listInfo.set_quickLaunchOption(SP.QuickLaunchOptions.off);
					listInfo.set_url(this.consts.HostLibraryUrl);
					listInfo.set_title(this.consts.HostLibraryTitle);
					listInfo.set_templateType(101);
					listInfo.set_templateFeatureId(new SP.Guid("00bfea71-e717-4e80-aa17-d0c71b360101"));
					var newLibrary = hostWeb.get_lists().add(listInfo);
					context.load(newLibrary, "RootFolder", "Title");
					context.executeQueryAsync(() => {
						dfd.resolve(newLibrary);
					}, (sender, args) => {
						dfd.reject(new SPListRepo.RequestError(args));
					});

				} else {
					dfd.reject(args.get_message());
				}
				});

			return dfd.promise;
		}
    }

	angular.module("SN.app.services").service("SPService", SPService);
}