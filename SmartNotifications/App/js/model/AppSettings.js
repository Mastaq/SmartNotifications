/// <reference path="../_references.ts" />
/// <reference path="../../lib/sp-list-repository/build/sp.list.repository.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SN;
(function (SN) {
    var AppSettingsBaseItem = (function (_super) {
        __extends(AppSettingsBaseItem, _super);
        function AppSettingsBaseItem(item) {
            _super.call(this, item);
            if (item) {
                this.mapFromListItem(item);
            }
        }
        AppSettingsBaseItem.prototype.mapFromListItem = function (item) {
            _super.prototype.mapFromListItem.call(this, item);
            this.value_SN = this.getFieldValue("Value_SN");
            this.key_SN = this.getFieldValue("Key_SN");
            this.contentType = this.getFieldValue("ContentType");
            this._UIVersionString = this.getFieldValue("_UIVersionString");
            this.edit = this.getFieldValue("Edit");
            this.linkTitleNoMenu = this.getFieldValue("LinkTitleNoMenu");
            this.linkTitle = this.getFieldValue("LinkTitle");
            this.docIcon = this.getFieldValue("DocIcon");
            this.itemChildCount = this.getFieldValue("ItemChildCount");
            this.folderChildCount = this.getFieldValue("FolderChildCount");
            this.appAuthor = this.getFieldValue("AppAuthor");
            this.appEditor = this.getFieldValue("AppEditor");
        };
        AppSettingsBaseItem.prototype.mapToListItem = function (item) {
            _super.prototype.mapToListItem.call(this, item);
            this.setFieldValue(item, "Value_SN", this.value_SN);
            this.setFieldValue(item, "Key_SN", this.key_SN);
        };
        return AppSettingsBaseItem;
    })(SPListRepo.BaseListItem);
    SN.AppSettingsBaseItem = AppSettingsBaseItem;
})(SN || (SN = {}));
