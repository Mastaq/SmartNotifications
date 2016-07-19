/// <reference path="_references.ts" />

namespace SN {
	export class ColorValidator implements SPClientForms.ClientValidation.IValidator {
		Validate(value: any): SPClientForms.ClientValidation.ValidationResult {
			var result = <any>SPClientForms.ClientValidation.RequiredValidator.prototype.Validate(value);

			if (result.validationError) {
				result.errorMessage = "Select a color";
			}

			return result;
		}
	}
}