/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var GetSpColorService = (function () {
        function GetSpColorService(vendorsFactory) {
            this.wait = null;
            this.$ = vendorsFactory.$;
        }
        GetSpColorService.prototype.getSuiteBarBackground = function () {
            return this.$("#suiteBarLeft").css("background-color");
        };
        GetSpColorService.$inject = [
            "VendorsFactory"
        ];
        return GetSpColorService;
    })();
    SN.GetSpColorService = GetSpColorService;
    angular.module("SN.app.services").service("GetSpColorService", GetSpColorService);
})(SN || (SN = {}));
