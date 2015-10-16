/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var ChromeNavCtrl = (function () {
        function ChromeNavCtrl($scope, context, pleaseWait, colorService, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.context = context;
            this.pleaseWait = pleaseWait;
            this.colorService = colorService;
            this.$timeout = $timeout;
            $scope.vm = this;
            this.hostUrl = this.context.hostUrl;
            this.hostTitle = this.context.hostTitle;
            this.appUrl = this.context.appUrl;
            this.pleaseWait.start(colorService.getSuiteBarBackground());
            this.colorService.applyBackgrounds();
            $timeout(function () {
                _this.pleaseWait.close();
            }, 3000);
        }
        ChromeNavCtrl.$inject = [
            "$scope",
            "ContextService",
            "PleaseWaitService",
            "SPColorService",
            "$timeout"
        ];
        return ChromeNavCtrl;
    })();
    SN.ChromeNavCtrl = ChromeNavCtrl;
    angular.module("SN.app.controllers").controller("ChromeNavCtrl", ChromeNavCtrl);
})(SN || (SN = {}));
