/// <reference path="../_references.ts" />
var SN;
(function (SN) {
    var SPColorService = (function () {
        function SPColorService(vendorsFactory) {
            this.wait = null;
            this.$ = vendorsFactory.$;
        }
        SPColorService.prototype.getElementBackground = function (selector) {
            return this.$(selector).css("background-color");
        };
        SPColorService.prototype.getSuiteBarBackground = function () {
            return this.getElementBackground("#suiteBarLeft");
        };
        SPColorService.prototype.applyBackgrounds = function () {
            var background = this.getElementBackground(".ms-rteTable-1 tr.ms-rteTableHeaderRow-1");
            this.$("head").append(String.format("<style type='text/css'>#eeh-navigation-page-wrapper, .eeh-navigation-sidebar {{background-color:{0};}} </style>", background));
        };
        SPColorService.$inject = [
            "VendorsFactory"
        ];
        return SPColorService;
    })();
    SN.SPColorService = SPColorService;
    angular.module("SN.app.services").service("SPColorService", SPColorService);
})(SN || (SN = {}));
