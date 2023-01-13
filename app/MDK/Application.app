{
	"_Name": "MDK",
	"Version": "/MDK/Globals/AppDefinition_Version.global",
	"MainPage": "/MDK/Pages/TravelagencyCollection/TravelagencyCollection_List.page",
	"OnLaunch": [
		"/MDK/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/MDK/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/MDK/Actions/Service/InitializeOnline.action",
	"Styles": "/MDK/Styles/Styles.less",
	"Localization": "/MDK/i18n/i18n.properties",
	"_SchemaVersion": "6.3"
}