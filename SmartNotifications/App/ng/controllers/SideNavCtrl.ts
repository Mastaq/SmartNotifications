/// <reference path="../_references.ts" />

namespace SN {
    export class SideNavCtrl {
        static $inject = [
			"$scope",
            "eehNavigation",
			"ContextService"
        ];

        constructor(private $scope: ICtrlScope<SideNavCtrl>, private eehNavigation: any, private context: ContextService) {

            $scope.vm = this;
			this.eehNavigation.menuItem("SideNav.allNotifications").href = context.appUrl + "Notifications";
			this.eehNavigation.menuItem("SideNav.addNotification").href = context.appUrl + "Notifications/NewForm.aspx";
			this.eehNavigation.menuItem("SideNav.host").href = context.hostUrl;
			this.eehNavigation.menuItem("SideNav.host").text = context.hostTitle;

        }
    }

    angular.module("SN.app.controllers").controller("SideNavCtrl", SideNavCtrl);
}