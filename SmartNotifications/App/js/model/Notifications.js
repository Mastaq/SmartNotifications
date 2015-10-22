/// <reference path="../_references.ts" />
/// <reference path="../../lib/sp-list-repository/build/sp.list.repository.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SN;
(function (SN) {
    var NotificationsBaseItem = (function (_super) {
        __extends(NotificationsBaseItem, _super);
        function NotificationsBaseItem(item) {
            _super.call(this, item);
            if (item) {
                this.mapFromListItem(item);
            }
        }
        NotificationsBaseItem.prototype.mapFromListItem = function (item) {
            _super.prototype.mapFromListItem.call(this, item);
            this.message_SN = this.getFieldValue("Message_SN");
            this.from_SN = this.getFieldValue("From_SN");
            this.to_SN = this.getFieldValue("To_SN");
            this.assignedTo_SN = this.getFieldValue("AssignedTo_SN");
            this.dismissable_SN = this.getFieldValue("Dismissable_SN");
            this.color_SN = this.getFieldValue("Color_SN");
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
        NotificationsBaseItem.prototype.mapToListItem = function (item) {
            _super.prototype.mapToListItem.call(this, item);
            this.setFieldValue(item, "Message_SN", this.message_SN);
            this.setFieldValue(item, "From_SN", this.from_SN);
            this.setFieldValue(item, "To_SN", this.to_SN);
            this.setFieldValue(item, "AssignedTo_SN", this.assignedTo_SN);
            this.setFieldValue(item, "Dismissable_SN", this.dismissable_SN);
            this.setFieldValue(item, "Color_SN", this.color_SN);
        };
        return NotificationsBaseItem;
    })(SPListRepo.BaseListItem);
    SN.NotificationsBaseItem = NotificationsBaseItem;
})(SN || (SN = {}));
