{
	"_Name": "MDKAPIHUB",
	"Version": "/MDKAPIHUB/Globals/AppDefinition_Version.global",
	"MainPage": "/MDKAPIHUB/Pages/Contacts/Contacts_List.page",
	"OnLaunch": [
		"/MDKAPIHUB/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/MDKAPIHUB/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDKAPIHUB/Actions/Service/InitializeOnline.action",
	"Styles": "/MDKAPIHUB/Styles/Styles.less",
	"Localization": "/MDKAPIHUB/i18n/i18n.properties",
	"_SchemaVersion": "6.3"
}