/// <reference path="../_references.ts" />

namespace SN {
	export interface ICtrlScope<T> extends angular.IScope {
		vm: T
	}
} 