/// <reference path="_references.ts" />
var SN;
(function (SN) {
    var ColorValidator = (function () {
        function ColorValidator() {
        }
        ColorValidator.prototype.Validate = function (value) {
            var result = SPClientForms.ClientValidation.RequiredValidator.prototype.Validate(value);
            if (result.validationError) {
                result.errorMessage = "Select a color";
            }
            return result;
        };
        return ColorValidator;
    })();
    SN.ColorValidator = ColorValidator;
})(SN || (SN = {}));
/// <reference path="_references.ts" />
var SN;
(function (SN) {
    (function (ko, $) {
        ko.bindingHandlers.spectrum = {
            init: function (element, valueAccessor) {
                var options = ko.utils.unwrapObservable(valueAccessor() || {});
                var $element = $(element);
                $element.spectrum(options);
            }
        };
    })(window.ko, window.jQuery);
})(SN || (SN = {}));
/// <reference path="_references.ts" />
var SN;
(function (SN) {
    var ColorFieldViewModel = (function () {
        function ColorFieldViewModel(dataDeffered) {
            var _this = this;
            this.dataDeffered = dataDeffered;
            this.spectrumOptions = ko.observable({});
            this.colorValue = ko.observable("");
            var intialOptions = {
                showPalette: true,
                showInput: true,
                showInitial: true,
                hideAfterPaletteSelect: true,
                togglePaletteMoreText: "more",
                togglePaletteLessText: "less",
                color: "blanchedalmond",
                preferredFormat: "hex",
                palette: [
                    ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                    ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                    ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                    ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                    ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                    ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                    ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                    ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
                ]
            };
            dataDeffered.done(function (data) {
                switch (data.controlMode) {
                    case SPClientTemplates.ClientControlMode.EditForm:
                        {
                            _this.colorValue(data.fieldValue);
                            intialOptions.color = data.fieldValue;
                            break;
                        }
                    case SPClientTemplates.ClientControlMode.NewForm:
                        {
                            _this.colorValue(tinycolor(intialOptions.color).toHexString());
                            break;
                        }
                    case SPClientTemplates.ClientControlMode.DisplayForm:
                        {
                            intialOptions.disabled = true;
                            intialOptions.color = data.fieldValue;
                            _this.colorValue(data.fieldValue);
                            break;
                        }
                }
                _this.spectrumOptions(intialOptions);
            });
        }
        ColorFieldViewModel.prototype.getColorCode = function () {
            return this.colorValue();
        };
        return ColorFieldViewModel;
    })();
    SN.ColorFieldViewModel = ColorFieldViewModel;
})(SN || (SN = {}));
/// <reference path="_references.ts" />
var SN;
(function (SN) {
    "user strict";
    (function ($, ko, window) {
        var colorFieldName = "Color_SN", cssUrl = "/App/jslink/color-field/build/color.field.external.css", templatesUrl = "/App/jslink/color-field/templates.html";
        var overrideCtx = {};
        overrideCtx.Templates = {};
        overrideCtx.Templates.Fields = {};
        overrideCtx.Templates.Fields[colorFieldName] = {
            NewForm: myf,
            EditForm: myf,
            DisplayForm: myf,
            View: myview
        };
        var investorsFieldRender = $.Deferred();
        var colorFieldViewModel = new SN.ColorFieldViewModel(investorsFieldRender);
        overrideCtx.OnPostRender = function (ctx) {
            var currentField = ctx.ListSchema.Field[0];
            if (currentField.Name === colorFieldName) {
                SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                    window.registerCssLink(_spPageContextInfo.webAbsoluteUrl + cssUrl);
                    $.get(_spPageContextInfo.webAbsoluteUrl + templatesUrl, function (templates) {
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
        };
        function myview(ctx) {
            var colorValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
            return String.format("<span style='background-color: {0};display:inline-block;width:40px;height: 15px;'></span>" +
                "&nbsp;&nbsp;<span style='vertical-align:top'>{0}</span>", colorValue);
        }
        function myf(ctx) {
            var formCtx = SPClientTemplates.Utility.GetFormContextForCurrentField(ctx);
            var validators = new SPClientForms.ClientValidation.ValidatorSet();
            validators.RegisterValidator(new SN.ColorValidator());
            formCtx.registerClientValidator(formCtx.fieldName, validators);
            formCtx.registerValidationErrorCallback(formCtx.fieldName, function (errorResult) {
                $("#color-error").text(errorResult.errorMessage).show();
            });
            formCtx.registerGetValueCallback(formCtx.fieldName, function () {
                return colorFieldViewModel.getColorCode();
            });
            var html = "<div id='colorFieldContainer' data-bind=\"template: { name: 'color-template' }\"><div>";
            return html;
        }
        SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
    })(window.jQuery, window.ko, window);
})(SN || (SN = {}));
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="Validator.ts" />
/// <reference path="SpectrumBinding.ts" />
/// <reference path="ColorFieldViewModel.ts" />
/// <reference path="ColorField.ts" />

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZhbGlkYXRvci50cyIsIlNwZWN0cnVtQmluZGluZy50cyIsIkNvbG9yRmllbGRWaWV3TW9kZWwudHMiLCJDb2xvckZpZWxkLnRzIiwiX3JlZmVyZW5jZXMudHMiXSwibmFtZXMiOlsiU04iLCJTTi5Db2xvclZhbGlkYXRvciIsIlNOLkNvbG9yVmFsaWRhdG9yLmNvbnN0cnVjdG9yIiwiU04uQ29sb3JWYWxpZGF0b3IuVmFsaWRhdGUiLCJTTi5Db2xvckZpZWxkVmlld01vZGVsIiwiU04uQ29sb3JGaWVsZFZpZXdNb2RlbC5jb25zdHJ1Y3RvciIsIlNOLkNvbG9yRmllbGRWaWV3TW9kZWwuZ2V0Q29sb3JDb2RlIiwiU04ubXl2aWV3IiwiU04ubXlmIl0sIm1hcHBpbmdzIjoiQUFBQyx1Q0FBdUM7QUFFeEMsSUFBVSxFQUFFLENBWVg7QUFaRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBQUFDO1FBVUFDLENBQUNBO1FBVEFELGlDQUFRQSxHQUFSQSxVQUFTQSxLQUFVQTtZQUNsQkUsSUFBSUEsTUFBTUEsR0FBUUEsYUFBYUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxpQkFBaUJBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRTdGQSxFQUFFQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNUJBLE1BQU1BLENBQUNBLFlBQVlBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7WUFDeENBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO1FBQ2ZBLENBQUNBO1FBQ0ZGLHFCQUFDQTtJQUFEQSxDQVZBRCxBQVVDQyxJQUFBRDtJQVZZQSxpQkFBY0EsaUJBVTFCQSxDQUFBQTtBQUNGQSxDQUFDQSxFQVpTLEVBQUUsS0FBRixFQUFFLFFBWVg7QUNkQSx1Q0FBdUM7QUFNeEMsSUFBVSxFQUFFLENBVVg7QUFWRCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBLENBQUNBLFVBQUNBLEVBQWtCQSxFQUFFQSxDQUFlQTtRQUNwQ0EsRUFBRUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsUUFBUUEsR0FBR0E7WUFDN0JBLElBQUlBLEVBQUVBLFVBQUNBLE9BQU9BLEVBQUVBLGFBQWFBO2dCQUM1QkEsSUFBSUEsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxFQUFFQSxJQUFJQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDL0RBLElBQUlBLFFBQVFBLEdBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO2dCQUMxQkEsUUFBUUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLENBQUNBO1NBQ0RBLENBQUFBO0lBQ0ZBLENBQUNBLENBQUNBLENBQU9BLE1BQU9BLENBQUNBLEVBQUVBLEVBQVFBLE1BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO0FBQzVDQSxDQUFDQSxFQVZTLEVBQUUsS0FBRixFQUFFLFFBVVg7QUNoQkEsdUNBQXVDO0FBRXhDLElBQVUsRUFBRSxDQTBEWDtBQTFERCxXQUFVLEVBQUUsRUFBQyxDQUFDO0lBQ2JBO1FBS0NJLDZCQUFvQkEsWUFBZ0pBO1lBTHJLQyxpQkF3RENBO1lBbkRvQkEsaUJBQVlBLEdBQVpBLFlBQVlBLENBQW9JQTtZQUhwS0Esb0JBQWVBLEdBQXlDQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMxRUEsZUFBVUEsR0FBK0JBLEVBQUVBLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBRzFEQSxJQUFJQSxhQUFhQSxHQUFxQkE7Z0JBQ3JDQSxXQUFXQSxFQUFFQSxJQUFJQTtnQkFDakJBLFNBQVNBLEVBQUVBLElBQUlBO2dCQUNmQSxXQUFXQSxFQUFFQSxJQUFJQTtnQkFDakJBLHNCQUFzQkEsRUFBRUEsSUFBSUE7Z0JBQzVCQSxxQkFBcUJBLEVBQUVBLE1BQU1BO2dCQUM3QkEscUJBQXFCQSxFQUFFQSxNQUFNQTtnQkFDN0JBLEtBQUtBLEVBQUVBLGdCQUFnQkE7Z0JBQ3ZCQSxlQUFlQSxFQUFFQSxLQUFLQTtnQkFDdEJBLE9BQU9BLEVBQUVBO29CQUNSQSxDQUFDQSxNQUFNQSxFQUFFQSxNQUFNQSxFQUFFQSxNQUFNQSxFQUFFQSxNQUFNQSxFQUFFQSxNQUFNQSxFQUFFQSxNQUFNQSxFQUFFQSxTQUFTQSxFQUFFQSxNQUFNQSxDQUFDQTtvQkFDbkVBLENBQUNBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLEVBQUVBLE1BQU1BLENBQUNBO29CQUNoRUEsQ0FBQ0EsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsQ0FBQ0E7b0JBQ3hGQSxDQUFDQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxDQUFDQTtvQkFDeEZBLENBQUNBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLENBQUNBO29CQUN4RkEsQ0FBQ0EsTUFBTUEsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsQ0FBQ0E7b0JBQ3JGQSxDQUFDQSxNQUFNQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxDQUFDQTtvQkFDckZBLENBQUNBLE1BQU1BLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVB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Q0EsQ0FBQUE7UUFFREEsZ0JBQWdCQSxHQUFnREE7WUFDL0RPLElBQUlBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDOURBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLDJGQUEyRkE7Z0JBQy9HQSx5REFBeURBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO1FBQ3pFQSxDQUFDQTtRQUVEUCxhQUFhQSxHQUFnREE7WUFFNURRLElBQUlBLE9BQU9BLEdBQUdBLGlCQUFpQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsNkJBQTZCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMzRUEsSUFBSUEsVUFBVUEsR0FBR0EsSUFBSUEsYUFBYUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxZQUFZQSxFQUFFQSxDQUFDQTtZQUVuRUEsVUFBVUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxJQUFJQSxpQkFBY0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDbkRBLE9BQU9BLENBQUNBLHVCQUF1QkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7WUFDL0RBLE9BQU9BLENBQUNBLCtCQUErQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsRUFBRUEsVUFBQ0EsV0FBV0E7Z0JBQ3RFQSxDQUFDQSxDQUFDQSxjQUFjQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtZQUN6REEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFSEEsT0FBT0EsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxPQUFPQSxDQUFDQSxTQUFTQSxFQUFFQTtnQkFDbkRBLE1BQU1BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0E7WUFDM0NBLENBQUNBLENBQUNBLENBQUNBO1lBRUhBLElBQUlBLElBQUlBLEdBQUdBLHdGQUF3RkEsQ0FBQ0E7WUFDcEdBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2JBLENBQUNBO1FBRURSLGlCQUFpQkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EseUJBQXlCQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtJQUUxRUEsQ0FBQ0EsQ0FBQ0EsQ0FBT0EsTUFBT0EsQ0FBQ0EsTUFBTUEsRUFBUUEsTUFBT0EsQ0FBQ0EsRUFBRUEsRUFBRUEsTUFBTUEsQ0FBQ0EsQ0FBQ0E7QUFDcERBLENBQUNBLEVBM0VTLEVBQUUsS0FBRixFQUFFLFFBMkVYO0FDN0VDLGtEQUFrRDtBQUVwRCxxQ0FBcUM7QUFDckMsMkNBQTJDO0FBQzNDLCtDQUErQztBQUMvQyxzQ0FBc0MiLCJmaWxlIjoiY29sb3IuZmllbGQuanMiLCJzb3VyY2VSb290IjoiLi4vIn0=
