/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var AppLoadCtrl = (function () {
        function AppLoadCtrl($scope, $http, $window, $timeout, colorService, pleaseWait, spservice, $log) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            this.$timeout = $timeout;
            this.colorService = colorService;
            this.pleaseWait = pleaseWait;
            this.spservice = spservice;
            this.$log = $log;
            $scope.vm = this;
            this.pleaseWait.start(colorService.getSuiteBarBackground());
            this.colorService.applyBackgrounds();
            spservice.getSettings().then(function (appSettings) {
                //first run, the app is not inited yet
                if (appSettings == null) {
                    _this.spservice.createLibrary().then(null, function (err) {
                        $log.error(err.message);
                        $log.error(err.stackTrace);
                    });
                }
                else {
                }
            }, function (err) {
                $log.error(err.message);
                $log.error(err.stackTrace);
            });
            $timeout(function () {
                _this.pleaseWait.close();
            }, 3000);
        }
        AppLoadCtrl.$inject = [
            "$scope",
            "$http",
            "$window",
            "$timeout",
            "SPColorService",
            "PleaseWaitService",
            "SPService",
            "$log"
        ];
        return AppLoadCtrl;
    })();
    SN.AppLoadCtrl = AppLoadCtrl;
    angular.module("SN.app.controllers").controller("AppLoadCtrl", AppLoadCtrl);
})(SN || (SN = {}));
