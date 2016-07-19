/// <reference path="_references.ts" />

interface KnockoutBindingHandlers {
	spectrum: KnockoutBindingHandler;
}

namespace SN {
	((ko: KnockoutStatic, $: JQueryStatic) => {
		ko.bindingHandlers.spectrum = {
			init: (element, valueAccessor) => {
				var options = ko.utils.unwrapObservable(valueAccessor() || {});
				var $element = $(element);
				$element.spectrum(options);
			}
		}
	})((<any>window).ko, (<any>window).jQuery);
}