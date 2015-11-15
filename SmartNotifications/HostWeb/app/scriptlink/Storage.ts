/// <reference path="_references.ts" />

namespace SNScriptLink {
	export class Storage {
		static save(key: string, data: Object) {
			localStorage.setItem(key, JSON.stringify(data));
		}

		static load<T>(key: string) {
			var data = localStorage.getItem(key);

			if (!data) {
				return null;
			}

			return <T>JSON.parse(data);
		}
	}
}