/// <reference path="../_references.ts" />

namespace SN {
	export class Ex {
		static executeQueryPromise<T>(ctx: SP.ClientContext, data?: T): ng.IPromise<T> {
			var $q = angular.injector(["ng"]).get<ng.IQService>("$q");
			var dfd = $q.defer();
			ctx.executeQueryAsync(() => {
				dfd.resolve(data);
			}, (sender, args) => {
				dfd.reject(args);
				});

			return dfd.promise;
		}
	}
}