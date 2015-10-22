/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var SPService = (function () {
        function SPService(vendorsFactory, context, consts, $q) {
            this.context = context;
            this.consts = consts;
            this.$q = $q;
            this.wait = null;
            this.$ = vendorsFactory.$;
        }
        SPService.prototype.getSettings = function () {
            var dfd = this.$q.defer();
            var appSettingsRepo = new SN.AppSettingsRepository();
            appSettingsRepo.getSettingsByKey("")
                .done(function (data) {
                dfd.resolve(data);
            })
                .fail(function (err) {
                dfd.reject(err);
            });
            return dfd.promise;
        };
        SPService.prototype.createLibrary = function () {
            var _this = this;
            var dfd = this.$q.defer();
            var context = SP.ClientContext.get_current();
            var factory = new SP.ProxyWebRequestExecutorFactory(this.context.appUrl);
            context.set_webRequestExecutorFactory(factory);
            var hostContext = new SP.AppContextSite(context, this.context.hostUrl);
            var hostWeb = hostContext.get_web();
            var library = hostWeb.get_lists().getByTitle(this.consts.HostLibraryTitle);
            context.load(library);
            context.executeQueryAsync(function () {
                dfd.resolve(library);
            }, function (sender, args) {
                if (args.get_errorTypeName() === "System.ArgumentException") {
                    var listInfo = new SP.ListCreationInformation();
                    listInfo.set_quickLaunchOption(SP.QuickLaunchOptions.off);
                    listInfo.set_url(_this.consts.HostLibraryUrl);
                    listInfo.set_title(_this.consts.HostLibraryTitle);
                    listInfo.set_templateType(101);
                    listInfo.set_templateFeatureId(new SP.Guid("00bfea71-e717-4e80-aa17-d0c71b360101"));
                    var newLibrary = hostWeb.get_lists().add(listInfo);
                    context.load(newLibrary);
                    context.executeQueryAsync(function () {
                        dfd.resolve(newLibrary);
                    }, function (sender, args) {
                        dfd.reject(new SPListRepo.RequestError(args));
                    });
                }
                else {
                    dfd.reject(args.get_message());
                }
            });
            return dfd.promise;
        };
        SPService.$inject = [
            "VendorsFactory",
            "ContextService",
            "Consts",
            "$q"
        ];
        return SPService;
    })();
    SN.SPService = SPService;
    angular.module("SN.app.services").service("SPService", SPService);
})(SN || (SN = {}));
