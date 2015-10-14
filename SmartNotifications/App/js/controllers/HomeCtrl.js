/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var HomeCtrl = (function () {
        function HomeCtrl($scope, $http, $window) {
            this.$scope = $scope;
            this.$http = $http;
            this.$window = $window;
            $scope.vm = this;
            this.info = "123";
        }
        HomeCtrl.$inject = [
            "$scope",
            "$http",
            "$window"
        ];
        return HomeCtrl;
    })();
    SN.HomeCtrl = HomeCtrl;
    angular.module("SN.app.controllers").controller("HomeCtrl", HomeCtrl);
})(SN || (SN = {}));
