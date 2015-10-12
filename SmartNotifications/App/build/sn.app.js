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
/// <reference path="../../_references.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./ng/controllers/HomeCtrl.ts" />
/// <reference path="./ng/interfaces/ICtrlScope.ts" />
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nL2NvbnRyb2xsZXJzL0hvbWVDdHJsLnRzIiwibmcvaW50ZXJmYWNlcy9JQ3RybFNjb3BlLnRzIiwiX3JlZmVyZW5jZXMudHMiLCJuZy9jb250cm9sbGVycy9DaHJvbWVOYXZDdHJsLnRzIl0sIm5hbWVzIjpbIlNOIiwiU04uSG9tZUN0cmwiLCJTTi5Ib21lQ3RybC5jb25zdHJ1Y3RvciIsIlNOLkNocm9tZU5hdkN0cmwiLCJTTi5DaHJvbWVOYXZDdHJsLmNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiQUFBQSw2Q0FBNkM7QUFFN0MsSUFBVSxFQUFFLENBb0JYO0FBcEJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVkE7UUFTSUMsa0JBQW9CQSxNQUE0QkEsRUFBVUEsS0FBc0JBLEVBQVVBLE9BQTBCQTtZQUFoR0MsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBc0JBO1lBQVVBLFVBQUtBLEdBQUxBLEtBQUtBLENBQWlCQTtZQUFVQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFtQkE7WUFFaEhBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1lBRXBCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUVuQkEsQ0FBQ0E7UUFkTUQsZ0JBQU9BLEdBQUdBO1lBQ3RCQSxRQUFRQTtZQUNDQSxPQUFPQTtZQUNQQSxTQUFTQTtTQUNaQSxDQUFDQTtRQVdOQSxlQUFDQTtJQUFEQSxDQWhCQUQsQUFnQkNDLElBQUFEO0lBaEJZQSxXQUFRQSxXQWdCcEJBLENBQUFBO0lBRURBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsYUFBYUEsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7QUFDN0VBLENBQUNBLEVBcEJTLEVBQUUsS0FBRixFQUFFLFFBb0JYO0FDdEJELDZDQUE2QztBQ0ExQyw0Q0FBNEM7QUFLL0MscURBQXFEO0FBR3JELHNEQUFzRDtBQ1J0RCw2Q0FBNkM7QUFFN0MsSUFBVSxFQUFFLENBdUJYO0FBdkJELFdBQVUsRUFBRSxFQUFDLENBQUM7SUFDVkE7UUFXSUcsdUJBQW9CQSxNQUFpQ0EsRUFBVUEsS0FBc0JBLEVBQVVBLE9BQTBCQTtZQUFyR0MsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBMkJBO1lBQVVBLFVBQUtBLEdBQUxBLEtBQUtBLENBQWlCQTtZQUFVQSxZQUFPQSxHQUFQQSxPQUFPQSxDQUFtQkE7WUFFckhBLE1BQU1BLENBQUNBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1lBQzFCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxpQkFBaUJBLENBQUNBO1lBQ2pDQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxNQUFNQSxDQUFDQTtZQUNsQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsZ0JBQWdCQSxDQUFDQTtRQUVoQ0EsQ0FBQ0E7UUFqQk1ELHFCQUFPQSxHQUFHQTtZQUN0QkEsUUFBUUE7WUFDQ0EsT0FBT0E7WUFDUEEsU0FBU0E7U0FDWkEsQ0FBQ0E7UUFjTkEsb0JBQUNBO0lBQURBLENBbkJBSCxBQW1CQ0csSUFBQUg7SUFuQllBLGdCQUFhQSxnQkFtQnpCQSxDQUFBQTtJQUVEQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBLFVBQVVBLENBQUNBLGVBQWVBLEVBQUVBLGFBQWFBLENBQUNBLENBQUNBO0FBQ3BGQSxDQUFDQSxFQXZCUyxFQUFFLEtBQUYsRUFBRSxRQXVCWCIsImZpbGUiOiJzbi5hcHAuanMiLCJzb3VyY2VSb290IjoiLi4vIn0=
