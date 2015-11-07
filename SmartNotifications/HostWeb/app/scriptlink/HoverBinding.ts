/// <reference path="_references.ts" />

interface KnockoutBindingHandlers {
	hover: KnockoutBindingHandler;
}

namespace SN {

	SP.SOD.executeOrDelayUntilScriptLoaded(() => {
		ko.bindingHandlers.hover = {
			init: (element, valueAccessor) => {
				var value = valueAccessor();
				ko.applyBindingsToNode(element, {
					event: {
						mouseenter: () => { value(true) },
						mouseleave: () => { value(false) }
					}
				});
			}
		}
	}, "snknockout");
}