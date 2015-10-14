/// <reference path="../_references.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SN;
(function (SN) {
    var ContextService = (function (_super) {
        __extends(ContextService, _super);
        function ContextService($window, $location) {
            _super.call(this);
            this.$window = $window;
            this.$location = $location;
            this.appLeafUrl = this.$window.SN.appUrl;
            this.version = this.$window.SN.version;
            this.appUrl = this.$location.absUrl().substr(0, this.$location.absUrl().indexOf(this.appLeafUrl) + this.appLeafUrl.length + 1);
            this.hostTitle = this.getParameterByName("HostTitle");
            this.hostUrl = this.getParameterByName("SPHostUrl");
        }
        ContextService.prototype.getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
        ContextService.prototype.getWebUrl = function (key) {
            var webUrl = this.getParameterByName(key);
            return this.endsWith(webUrl, "/") ? webUrl : webUrl + "/";
        };
        ContextService.prototype.endsWith = function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        };
        ContextService.$inject = [
            "$window",
            "$location"
        ];
        return ContextService;
    })(SN.Context);
    SN.ContextService = ContextService;
    angular.module("SN.app.services").service("ContextService", ContextService);
})(SN || (SN = {}));
