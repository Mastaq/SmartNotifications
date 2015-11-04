/// <reference path="../_references.ts" />

namespace SN {
	export class Storage {
		save(key:string, data:string, expirationInMin:number) {
			var expirationMS = expirationInMin * 60 * 1000;

			var record = { value: JSON.stringify(data), timestamp: new Date().getTime() + expirationMS };
			var dataToStore = LZString.compressToUTF16(JSON.stringify(record));
			localStorage.setItem(key, dataToStore);

			return data;
		}
		load (key:string) {
			var jsonData = LZString.decompressFromUTF16(localStorage.getItem(key));
			if (!jsonData) {
				return false;
			}
			var record = JSON.parse(jsonData);

			return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
		}
	}

	angular.module("SN.app.services").service("Storage", Storage);
}