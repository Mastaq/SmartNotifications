/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    function VendorsFactory($window) {
        return {
            $: $window.jQuery
        };
    }
    SN.VendorsFactory = VendorsFactory;
    VendorsFactory.$inject = ["$window"];
    angular.module("SN.app.services").factory("VendorsFactory", VendorsFactory);
})(SN || (SN = {}));
