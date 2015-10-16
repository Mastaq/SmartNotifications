/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../build/sp.list.repository.d.ts" />

namespace SN{
	export class AppSettingsBaseItem extends SPListRepo.BaseListItem{
		sN_Value: SP.FieldMultiLineText;
		sN_Key: string;
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

			this.sN_Value = this.getFieldValue("SN_Value");
			this.sN_Key = this.getFieldValue("SN_Key");
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

			this.setFieldValue(item, "SN_Value", this.sN_Value);
			this.setFieldValue(item, "SN_Key", this.sN_Key);
		}
	}
}