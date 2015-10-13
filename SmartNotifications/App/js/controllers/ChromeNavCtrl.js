/// <reference path="../../_references.ts" />
var SN;
(function (SN) {
    var ChromeNavCtrl = (function () {
        function ChromeNavCtrl($scope, context) {
            this.$scope = $scope;
            this.context = context;
            $scope.vm = this;
            this.hostUrl = this.context.hostUrl;
            this.hostTitle = this.context.hostTitle;
            this.appUrl = this.context.appUrl;
        }
        ChromeNavCtrl.$inject = [
            "$scope",
            "ContextService"
        ];
        return ChromeNavCtrl;
    })();
    SN.ChromeNavCtrl = ChromeNavCtrl;
    angular.module("SN.app.controllers").controller("ChromeNavCtrl", ChromeNavCtrl);
})(SN || (SN = {}));
