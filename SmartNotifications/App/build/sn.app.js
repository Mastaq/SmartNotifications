/// <reference path="../../_references.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./ng/controllers/HomeCtrl.ts" />
/// <reference path="./ng/interfaces/ICtrlScope.ts" />
/// <reference path="../../_references.ts" />
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
    angular.module("SN.app.controllers").controller("WelcomeCtrl", HomeCtrl);
})(SN || (SN = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nL2ludGVyZmFjZXMvSUN0cmxTY29wZS50cyIsIl9yZWZlcmVuY2VzLnRzIiwibmcvY29udHJvbGxlcnMvSG9tZUN0cmwudHMiXSwibmFtZXMiOlsiU04iLCJTTi5Ib21lQ3RybCIsIlNOLkhvbWVDdHJsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSw2Q0FBNkM7QUNBMUMsNENBQTRDO0FBSy9DLHFEQUFxRDtBQUdyRCxzREFBc0Q7QUNSdEQsNkNBQTZDO0FBRTdDLElBQVUsRUFBRSxDQW9CWDtBQXBCRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ1ZBO1FBU0lDLGtCQUFvQkEsTUFBNEJBLEVBQVVBLEtBQXNCQSxFQUFVQSxPQUEwQkE7WUFBaEdDLFdBQU1BLEdBQU5BLE1BQU1BLENBQXNCQTtZQUFVQSxVQUFLQSxHQUFMQSxLQUFLQSxDQUFpQkE7WUFBVUEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBbUJBO1lBRWhIQSxNQUFNQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUVwQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFFbkJBLENBQUNBO1FBZE1ELGdCQUFPQSxHQUFHQTtZQUN0QkEsUUFBUUE7WUFDQ0EsT0FBT0E7WUFDUEEsU0FBU0E7U0FDWkEsQ0FBQ0E7UUFXTkEsZUFBQ0E7SUFBREEsQ0FoQkFELEFBZ0JDQyxJQUFBRDtJQWhCWUEsV0FBUUEsV0FnQnBCQSxDQUFBQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLGFBQWFBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO0FBQzdFQSxDQUFDQSxFQXBCUyxFQUFFLEtBQUYsRUFBRSxRQW9CWCIsImZpbGUiOiJzbi5hcHAuanMiLCJzb3VyY2VSb290IjoiLi4vIn0=
