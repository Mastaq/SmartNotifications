/// <reference path="_references.ts" />

namespace SNScriptLink {
	export class Consts {
		static StorageKey = "sn_dismissed_items";
		static WebRelUrl = "SmartNotifications";
		static NotificationsListTitle = "Notifications";
		static AppSettingsListTitle = "AppSettings";
		static SettingsKey = "appsettings";
		static AppSettingsCaml = `
			<Where>
				<Eq>
					<FieldRef Name='Key_SN' /> 
					<Value Type='Text'>appsettings</Value> 
				</Eq>
			</Where>`;
		static CamlString = `
			<Where>
				<And>
					<Or>
						<Or>
							<Or>
								<And>
									<Leq> 
										<FieldRef Name='From_SN' /> 
										<Value IncludeTimeValue='TRUE' Type='DateTime'><Today /></Value> 
									</Leq> 
									<Geq> 
										<FieldRef Name='To_SN' /> 
										<Value IncludeTimeValue='TRUE' Type='DateTime'><Today /></Value> 
									</Geq> 
								</And>
								<And>
									<Leq> 
										<FieldRef Name='From_SN' /> 
										<Value IncludeTimeValue='TRUE' Type='DateTime'><Today /></Value> 
									</Leq> 
									<IsNull> 
										<FieldRef Name='To_SN' />
									</IsNull> 
								</And>
							</Or>
							<And>
								<IsNull> 
									<FieldRef Name='From_SN' />
								</IsNull> 
								<Geq> 
									<FieldRef Name='To_SN' /> 
									<Value IncludeTimeValue='TRUE' Type='DateTime'><Today /></Value> 
								</Geq> 
							</And>
						</Or>
						<And>
							<IsNull> 
								<FieldRef Name='From_SN' />
							</IsNull> 
							<IsNull> 
								<FieldRef Name='To_SN' />
							</IsNull> 
						</And>
					</Or>
					<Or>
						<Membership Type='CurrentUserGroups'>
							<FieldRef Name='AssignedTo_SN'/>
						</Membership>
						<Includes>
							<FieldRef Name='AssignedTo_SN'/>
							<Value Type='Integer'><UserID /></Value>
						</Includes>
					</Or>
				</And>
			</Where>`;
	}
}