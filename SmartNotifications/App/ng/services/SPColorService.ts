﻿/// <reference path="../_references.ts" />

namespace SN {
    export class SPColorService {
        static $inject = [
            "VendorsFactory"
        ];

		private wait: any = null;
		private $: JQueryStatic;

		constructor(
			vendorsFactory: { $: JQueryStatic }) {
			this.$ = vendorsFactory.$;
		}

	    private getElementBackground(selector:string): string {
			return this.$(selector).css("background-color");
	    }

	    public getSuiteBarBackground(): string {
		    return this.getElementBackground("#suiteBarLeft");
	    }

		public applyBackgrounds() {
			var background = this.getElementBackground(".ms-rteTable-1 tr.ms-rteTableHeaderRow-1");
			this.$("head").append(String.format("<style type='text/css'>#eeh-navigation-page-wrapper {{background-color:{0};}} </style>", background));
			this.$("head").append(String.format("<style type='text/css'>.eeh-navigation-sidebar {{background-color:{0};}} </style>", background));
		}
    }

	angular.module("SN.app.services").service("SPColorService", SPColorService);
}