/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../build/sp.list.repository.d.ts" />

namespace SN{
	export class NotificationsBaseItem extends SPListRepo.BaseListItem{
		sN_Message: SP.FieldMultiLineText;
		sN_From: Date;
		sN_To: Date;
		sN_AssignedTo: SP.FieldUserValue[];
		sN_Dismissable: boolean;
		sN_Color: string;
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

			this.sN_Message = this.getFieldValue("SN_Message");
			this.sN_From = this.getFieldValue("SN_From");
			this.sN_To = this.getFieldValue("SN_To");
			this.sN_AssignedTo = this.getFieldValue("SN_AssignedTo");
			this.sN_Dismissable = this.getFieldValue("SN_Dismissable");
			this.sN_Color = this.getFieldValue("SN_Color");
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

			this.setFieldValue(item, "SN_Message", this.sN_Message);
			this.setFieldValue(item, "SN_From", this.sN_From);
			this.setFieldValue(item, "SN_To", this.sN_To);
			this.setFieldValue(item, "SN_AssignedTo", this.sN_AssignedTo);
			this.setFieldValue(item, "SN_Dismissable", this.sN_Dismissable);
			this.setFieldValue(item, "SN_Color", this.sN_Color);
		}
	}
}