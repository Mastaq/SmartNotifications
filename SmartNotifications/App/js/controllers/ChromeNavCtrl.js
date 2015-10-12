/// <reference path="../../_references.ts" />
var SN;
(function (SN) {
    var ChromeNavCtrl = (function () {
        function ChromeNavCtrl($scope, $http, $window) {
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            $scope.vm = this;
            this.hostUrl = "http://host.url";
            this.hostTitle = "COOL";
            this.appUrl = "http://app.url";
        }
        ChromeNavCtrl.$inject = [
            "$scope",
            "$http",
            "$window"
        ];
        return ChromeNavCtrl;
    })();
    SN.ChromeNavCtrl = ChromeNavCtrl;
    angular.module("SN.app.controllers").controller("ChromeNavCtrl", ChromeNavCtrl);
})(SN || (SN = {}));
