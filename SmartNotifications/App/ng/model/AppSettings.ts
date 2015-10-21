/// <reference path="../_references.ts" />
/// <reference path="../../lib/sp-list-repository/build/sp.list.repository.d.ts" />

namespace SN {
	export class AppSettingsBaseItem extends SPListRepo.BaseListItem {
		value_SN: SP.FieldMultiLineText;
		key_SN: string;
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
		constructor(item?: SP.ListItem) {
			super(item);
			if (item) {
				this.mapFromListItem(item);
			}
		}

		mapFromListItem(item: SP.ListItem): void {
			super.mapFromListItem(item);

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
		}

		mapToListItem(item: SP.ListItem): void {
			super.mapToListItem(item);

			this.setFieldValue(item, "Value_SN", this.value_SN);
			this.setFieldValue(item, "Key_SN", this.key_SN);
		}
	}
}