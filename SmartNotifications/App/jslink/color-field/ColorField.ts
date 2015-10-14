/// <reference path="_references.ts" />

namespace SN {

	"user strict";

	(($: JQueryStatic, ko: KnockoutStatic, window: any) => {
		var colorFieldName = "SN_Color",
			cssUrl = "/App/jslink/color-field/build/color.field.external.css",
			templatesUrl = "/App/jslink/color-field/templates.html";

		var overrideCtx: SPClientTemplates.TemplateOverridesOptions = {};
		overrideCtx.Templates = {};
		overrideCtx.Templates.Fields = {};
		overrideCtx.Templates.Fields[colorFieldName] = {
			NewForm: myf,
			EditForm: myf,
			DisplayForm: myf
		};

		var investorsFieldRender = $.Deferred();

		var colorFieldViewModel = new ColorFieldViewModel(investorsFieldRender);

		overrideCtx.OnPostRender = (ctx: ContextInfo) => {
			var currentField = ctx.ListSchema.Field[0];

			if (currentField.Name === colorFieldName) {
				SP.SOD.executeOrDelayUntilScriptLoaded(() => {
					window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + cssUrl);

					$.get(_spPageContextInfo.webAbsoluteUrl + templatesUrl, (templates) => {
						$("body").append("<div style=\"display:none\">" + templates + "<\/div>");
						var fieldValue = ctx.ListData.Items[0][colorFieldName];
						
						investorsFieldRender.resolve({
							colorField: currentField,
							controlMode: ctx.ControlMode,
							fieldValue: fieldValue
						});

						ko.applyBindings(colorFieldViewModel, jQuery("#colorFieldContainer")[0]);
					});

				}, "sp.js");
			}
		}

		function myview(ctx: SPClientTemplates.RenderContext_FieldInView) {

		}

		function myf(ctx: SPClientTemplates.RenderContext_FieldInForm): string
		{
			var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(ctx);
			var validators = new SPClientForms.ClientValidation.ValidatorSet();

			validators.RegisterValidator(new ColorValidator());
			formCtx.registerClientValidator(formCtx.fieldName, validators);
			formCtx.registerValidationErrorCallback(formCtx.fieldName, (errorResult) => {
				$("#color-error").text(errorResult.errorMessage).show();
			});

			formCtx.registerGetValueCallback(formCtx.fieldName, () => {
				return colorFieldViewModel.getColorCode();
			});

			var html = "<div id='colorFieldContainer' data-bind=\"template: { name: 'color-template' }\"><div>";
			return html;
		}

		SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);

	})((<any>window).jQuery, (<any>window).ko, window);
}