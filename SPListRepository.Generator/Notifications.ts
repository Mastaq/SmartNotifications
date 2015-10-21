/// <reference path="../_references.ts" />
/// <reference path="../../lib/sp-list-repository/build/sp.list.repository.d.ts" />

namespace SN{
	export class NotificationsBaseItem extends SPListRepo.BaseListItem{
		message_SN: SP.FieldMultiLineText;
		from_SN: Date;
		to_SN: Date;
		assignedTo_SN: SP.FieldUserValue[];
		dismissable_SN: boolean;
		color_SN: string;
		contentType: string;
		_UIVersionString: string;
		edit: string;
		linkTitleNoMenu: string;
		linkTitle: string;
		docIcon: string;
		itemChildCount: SP.FieldLookupValue;
		folderChildCount: SP.FieldLookupValue;
		appAuthor: SP.FieldLookupValue;
		appEditor: SP.FieldLookupValue;
		constructor(item?: SP.ListItem){
			super(item);
			if(item){
				this.mapFromListItem(item);
			}
		}

		mapFromListItem(item: SP.ListItem): void{
			super.mapFromListItem(item);

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
		}

		mapToListItem(item: SP.ListItem): void{
			super.mapToListItem(item);

			this.setFieldValue(item, "Message_SN", this.message_SN);
			this.setFieldValue(item, "From_SN", this.from_SN);
			this.setFieldValue(item, "To_SN", this.to_SN);
			this.setFieldValue(item, "AssignedTo_SN", this.assignedTo_SN);
			this.setFieldValue(item, "Dismissable_SN", this.dismissable_SN);
			this.setFieldValue(item, "Color_SN", this.color_SN);
		}
	}
}