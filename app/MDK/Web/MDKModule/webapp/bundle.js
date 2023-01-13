(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MDK/i18n/i18n.properties":
/*!****************************************************!*\
  !*** ./build.definitions/MDK/i18n/i18n.properties ***!
  \****************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MDK/Rules/AppUpdateFailure.js":
/*!*********************************************************!*\
  !*** ./build.definitions/MDK/Rules/AppUpdateFailure.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDK/Rules/AppUpdateSuccess.js":
/*!*********************************************************!*\
  !*** ./build.definitions/MDK/Rules/AppUpdateSuccess.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDK/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDK/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDK/Rules/OnWillUpdate.js":
/*!*****************************************************!*\
  !*** ./build.definitions/MDK/Rules/OnWillUpdate.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MDK/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDK/Rules/ResetAppSettingsAndLogout.js":
/*!******************************************************************!*\
  !*** ./build.definitions/MDK/Rules/ResetAppSettingsAndLogout.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
    let logger = context.getLogger();
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return context.getPageProxy().executeAction('/MDK/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDK/Rules/TravelagencyCollection/NavToTravelagencyCollection_Edit.js":
/*!************************************************************************************************!*\
  !*** ./build.definitions/MDK/Rules/TravelagencyCollection/NavToTravelagencyCollection_Edit.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MDK/Services/service1.service').isDraftEnabled('TravelagencyCollection')) {
        return clientAPI.executeAction({
            'Name': '/MDK/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'TravelagencyCollection'
                },
                'OnSuccess': '/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_Cancel.js":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_Cancel.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/MDK/Services/service1.service').isDraftEnabled('TravelagencyCollection')) {
        return clientAPI.executeAction({
            'Name': '/MDK/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'TravelagencyCollection'
                },
                'OnSuccess': '/MDK/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MDK/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_CreateEntity.js":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_CreateEntity.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDK/Services/service1.service').isDraftEnabled('TravelagencyCollection')) {
        return clientAPI.executeAction({
            'Name': '/MDK/Actions/TravelagencyCollection/TravelagencyCollection_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MDK/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'TravelagencyCollection',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDK/Actions/TravelagencyCollection/TravelagencyCollection_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_DeleteConfirmation.js":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_DeleteConfirmation.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDK/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDK/Actions/TravelagencyCollection/TravelagencyCollection_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_UpdateEntity.js":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_UpdateEntity.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MDK/Services/service1.service').isDraftEnabled('TravelagencyCollection')) {
        return clientAPI.executeAction({
            'Name': '/MDK/Actions/TravelagencyCollection/TravelagencyCollection_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MDK/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'TravelagencyCollection'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MDK/Actions/TravelagencyCollection/TravelagencyCollection_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDK/Styles/Styles.json":
/*!**************************************************!*\
  !*** ./build.definitions/MDK/Styles/Styles.json ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDK/jsconfig.json":
/*!*********************************************!*\
  !*** ./build.definitions/MDK/jsconfig.json ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mdk_actions_appupdate_action = __webpack_require__(/*! ./MDK/Actions/AppUpdate.action */ "./build.definitions/MDK/Actions/AppUpdate.action")
let mdk_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDK/Actions/AppUpdateFailureMessage.action")
let mdk_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDK/Actions/AppUpdateProgressBanner.action")
let mdk_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDK/Actions/AppUpdateSuccessMessage.action")
let mdk_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDK/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDK/Actions/CloseModalPage_Cancel.action")
let mdk_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDK/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDK/Actions/CloseModalPage_Complete.action")
let mdk_actions_closepage_action = __webpack_require__(/*! ./MDK/Actions/ClosePage.action */ "./build.definitions/MDK/Actions/ClosePage.action")
let mdk_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MDK/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MDK/Actions/CreateEntityFailureMessage.action")
let mdk_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MDK/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MDK/Actions/CreateEntitySuccessMessage.action")
let mdk_actions_deleteconfirmation_action = __webpack_require__(/*! ./MDK/Actions/DeleteConfirmation.action */ "./build.definitions/MDK/Actions/DeleteConfirmation.action")
let mdk_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MDK/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MDK/Actions/DeleteEntityFailureMessage.action")
let mdk_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MDK/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MDK/Actions/DeleteEntitySuccessMessage.action")
let mdk_actions_draftdiscardentity_action = __webpack_require__(/*! ./MDK/Actions/DraftDiscardEntity.action */ "./build.definitions/MDK/Actions/DraftDiscardEntity.action")
let mdk_actions_drafteditentity_action = __webpack_require__(/*! ./MDK/Actions/DraftEditEntity.action */ "./build.definitions/MDK/Actions/DraftEditEntity.action")
let mdk_actions_draftsaveentity_action = __webpack_require__(/*! ./MDK/Actions/DraftSaveEntity.action */ "./build.definitions/MDK/Actions/DraftSaveEntity.action")
let mdk_actions_logout_action = __webpack_require__(/*! ./MDK/Actions/Logout.action */ "./build.definitions/MDK/Actions/Logout.action")
let mdk_actions_logoutmessage_action = __webpack_require__(/*! ./MDK/Actions/LogoutMessage.action */ "./build.definitions/MDK/Actions/LogoutMessage.action")
let mdk_actions_onwillupdate_action = __webpack_require__(/*! ./MDK/Actions/OnWillUpdate.action */ "./build.definitions/MDK/Actions/OnWillUpdate.action")
let mdk_actions_service_initializeonline_action = __webpack_require__(/*! ./MDK/Actions/Service/InitializeOnline.action */ "./build.definitions/MDK/Actions/Service/InitializeOnline.action")
let mdk_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./MDK/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/MDK/Actions/Service/InitializeOnlineFailureMessage.action")
let mdk_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./MDK/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/MDK/Actions/Service/InitializeOnlineSuccessMessage.action")
let mdk_actions_travelagencycollection_navtotravelagencycollection_create_action = __webpack_require__(/*! ./MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Create.action */ "./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Create.action")
let mdk_actions_travelagencycollection_navtotravelagencycollection_detail_action = __webpack_require__(/*! ./MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Detail.action */ "./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Detail.action")
let mdk_actions_travelagencycollection_navtotravelagencycollection_edit_action = __webpack_require__(/*! ./MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Edit.action */ "./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Edit.action")
let mdk_actions_travelagencycollection_navtotravelagencycollection_list_action = __webpack_require__(/*! ./MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_List.action */ "./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_List.action")
let mdk_actions_travelagencycollection_travelagencycollection_createentity_action = __webpack_require__(/*! ./MDK/Actions/TravelagencyCollection/TravelagencyCollection_CreateEntity.action */ "./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_CreateEntity.action")
let mdk_actions_travelagencycollection_travelagencycollection_deleteentity_action = __webpack_require__(/*! ./MDK/Actions/TravelagencyCollection/TravelagencyCollection_DeleteEntity.action */ "./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_DeleteEntity.action")
let mdk_actions_travelagencycollection_travelagencycollection_updateentity_action = __webpack_require__(/*! ./MDK/Actions/TravelagencyCollection/TravelagencyCollection_UpdateEntity.action */ "./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_UpdateEntity.action")
let mdk_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MDK/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MDK/Actions/UpdateEntityFailureMessage.action")
let mdk_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MDK/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MDK/Actions/UpdateEntitySuccessMessage.action")
let mdk_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK/Globals/AppDefinition_Version.global */ "./build.definitions/MDK/Globals/AppDefinition_Version.global")
let mdk_i18n_i18n_properties = __webpack_require__(/*! ./MDK/i18n/i18n.properties */ "./build.definitions/MDK/i18n/i18n.properties")
let mdk_jsconfig_json = __webpack_require__(/*! ./MDK/jsconfig.json */ "./build.definitions/MDK/jsconfig.json")
let mdk_pages_travelagencycollection_travelagencycollection_create_page = __webpack_require__(/*! ./MDK/Pages/TravelagencyCollection/TravelagencyCollection_Create.page */ "./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Create.page")
let mdk_pages_travelagencycollection_travelagencycollection_detail_page = __webpack_require__(/*! ./MDK/Pages/TravelagencyCollection/TravelagencyCollection_Detail.page */ "./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Detail.page")
let mdk_pages_travelagencycollection_travelagencycollection_edit_page = __webpack_require__(/*! ./MDK/Pages/TravelagencyCollection/TravelagencyCollection_Edit.page */ "./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Edit.page")
let mdk_pages_travelagencycollection_travelagencycollection_list_page = __webpack_require__(/*! ./MDK/Pages/TravelagencyCollection/TravelagencyCollection_List.page */ "./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_List.page")
let mdk_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK/Rules/AppUpdateFailure.js */ "./build.definitions/MDK/Rules/AppUpdateFailure.js")
let mdk_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK/Rules/AppUpdateSuccess.js */ "./build.definitions/MDK/Rules/AppUpdateSuccess.js")
let mdk_rules_onwillupdate_js = __webpack_require__(/*! ./MDK/Rules/OnWillUpdate.js */ "./build.definitions/MDK/Rules/OnWillUpdate.js")
let mdk_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDK/Rules/ResetAppSettingsAndLogout.js")
let mdk_rules_travelagencycollection_navtotravelagencycollection_edit_js = __webpack_require__(/*! ./MDK/Rules/TravelagencyCollection/NavToTravelagencyCollection_Edit.js */ "./build.definitions/MDK/Rules/TravelagencyCollection/NavToTravelagencyCollection_Edit.js")
let mdk_rules_travelagencycollection_travelagencycollection_cancel_js = __webpack_require__(/*! ./MDK/Rules/TravelagencyCollection/TravelagencyCollection_Cancel.js */ "./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_Cancel.js")
let mdk_rules_travelagencycollection_travelagencycollection_createentity_js = __webpack_require__(/*! ./MDK/Rules/TravelagencyCollection/TravelagencyCollection_CreateEntity.js */ "./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_CreateEntity.js")
let mdk_rules_travelagencycollection_travelagencycollection_deleteconfirmation_js = __webpack_require__(/*! ./MDK/Rules/TravelagencyCollection/TravelagencyCollection_DeleteConfirmation.js */ "./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_DeleteConfirmation.js")
let mdk_rules_travelagencycollection_travelagencycollection_updateentity_js = __webpack_require__(/*! ./MDK/Rules/TravelagencyCollection/TravelagencyCollection_UpdateEntity.js */ "./build.definitions/MDK/Rules/TravelagencyCollection/TravelagencyCollection_UpdateEntity.js")
let mdk_services_service1_service = __webpack_require__(/*! ./MDK/Services/service1.service */ "./build.definitions/MDK/Services/service1.service")
let mdk_styles_styles_css = __webpack_require__(/*! ./MDK/Styles/Styles.css */ "./build.definitions/MDK/Styles/Styles.css")
let mdk_styles_styles_json = __webpack_require__(/*! ./MDK/Styles/Styles.json */ "./build.definitions/MDK/Styles/Styles.json")
let mdk_styles_styles_less = __webpack_require__(/*! ./MDK/Styles/Styles.less */ "./build.definitions/MDK/Styles/Styles.less")
let mdk_styles_styles_nss = __webpack_require__(/*! ./MDK/Styles/Styles.nss */ "./build.definitions/MDK/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdk_actions_appupdate_action : mdk_actions_appupdate_action,
	mdk_actions_appupdatefailuremessage_action : mdk_actions_appupdatefailuremessage_action,
	mdk_actions_appupdateprogressbanner_action : mdk_actions_appupdateprogressbanner_action,
	mdk_actions_appupdatesuccessmessage_action : mdk_actions_appupdatesuccessmessage_action,
	mdk_actions_closemodalpage_cancel_action : mdk_actions_closemodalpage_cancel_action,
	mdk_actions_closemodalpage_complete_action : mdk_actions_closemodalpage_complete_action,
	mdk_actions_closepage_action : mdk_actions_closepage_action,
	mdk_actions_createentityfailuremessage_action : mdk_actions_createentityfailuremessage_action,
	mdk_actions_createentitysuccessmessage_action : mdk_actions_createentitysuccessmessage_action,
	mdk_actions_deleteconfirmation_action : mdk_actions_deleteconfirmation_action,
	mdk_actions_deleteentityfailuremessage_action : mdk_actions_deleteentityfailuremessage_action,
	mdk_actions_deleteentitysuccessmessage_action : mdk_actions_deleteentitysuccessmessage_action,
	mdk_actions_draftdiscardentity_action : mdk_actions_draftdiscardentity_action,
	mdk_actions_drafteditentity_action : mdk_actions_drafteditentity_action,
	mdk_actions_draftsaveentity_action : mdk_actions_draftsaveentity_action,
	mdk_actions_logout_action : mdk_actions_logout_action,
	mdk_actions_logoutmessage_action : mdk_actions_logoutmessage_action,
	mdk_actions_onwillupdate_action : mdk_actions_onwillupdate_action,
	mdk_actions_service_initializeonline_action : mdk_actions_service_initializeonline_action,
	mdk_actions_service_initializeonlinefailuremessage_action : mdk_actions_service_initializeonlinefailuremessage_action,
	mdk_actions_service_initializeonlinesuccessmessage_action : mdk_actions_service_initializeonlinesuccessmessage_action,
	mdk_actions_travelagencycollection_navtotravelagencycollection_create_action : mdk_actions_travelagencycollection_navtotravelagencycollection_create_action,
	mdk_actions_travelagencycollection_navtotravelagencycollection_detail_action : mdk_actions_travelagencycollection_navtotravelagencycollection_detail_action,
	mdk_actions_travelagencycollection_navtotravelagencycollection_edit_action : mdk_actions_travelagencycollection_navtotravelagencycollection_edit_action,
	mdk_actions_travelagencycollection_navtotravelagencycollection_list_action : mdk_actions_travelagencycollection_navtotravelagencycollection_list_action,
	mdk_actions_travelagencycollection_travelagencycollection_createentity_action : mdk_actions_travelagencycollection_travelagencycollection_createentity_action,
	mdk_actions_travelagencycollection_travelagencycollection_deleteentity_action : mdk_actions_travelagencycollection_travelagencycollection_deleteentity_action,
	mdk_actions_travelagencycollection_travelagencycollection_updateentity_action : mdk_actions_travelagencycollection_travelagencycollection_updateentity_action,
	mdk_actions_updateentityfailuremessage_action : mdk_actions_updateentityfailuremessage_action,
	mdk_actions_updateentitysuccessmessage_action : mdk_actions_updateentitysuccessmessage_action,
	mdk_globals_appdefinition_version_global : mdk_globals_appdefinition_version_global,
	mdk_i18n_i18n_properties : mdk_i18n_i18n_properties,
	mdk_jsconfig_json : mdk_jsconfig_json,
	mdk_pages_travelagencycollection_travelagencycollection_create_page : mdk_pages_travelagencycollection_travelagencycollection_create_page,
	mdk_pages_travelagencycollection_travelagencycollection_detail_page : mdk_pages_travelagencycollection_travelagencycollection_detail_page,
	mdk_pages_travelagencycollection_travelagencycollection_edit_page : mdk_pages_travelagencycollection_travelagencycollection_edit_page,
	mdk_pages_travelagencycollection_travelagencycollection_list_page : mdk_pages_travelagencycollection_travelagencycollection_list_page,
	mdk_rules_appupdatefailure_js : mdk_rules_appupdatefailure_js,
	mdk_rules_appupdatesuccess_js : mdk_rules_appupdatesuccess_js,
	mdk_rules_onwillupdate_js : mdk_rules_onwillupdate_js,
	mdk_rules_resetappsettingsandlogout_js : mdk_rules_resetappsettingsandlogout_js,
	mdk_rules_travelagencycollection_navtotravelagencycollection_edit_js : mdk_rules_travelagencycollection_navtotravelagencycollection_edit_js,
	mdk_rules_travelagencycollection_travelagencycollection_cancel_js : mdk_rules_travelagencycollection_travelagencycollection_cancel_js,
	mdk_rules_travelagencycollection_travelagencycollection_createentity_js : mdk_rules_travelagencycollection_travelagencycollection_createentity_js,
	mdk_rules_travelagencycollection_travelagencycollection_deleteconfirmation_js : mdk_rules_travelagencycollection_travelagencycollection_deleteconfirmation_js,
	mdk_rules_travelagencycollection_travelagencycollection_updateentity_js : mdk_rules_travelagencycollection_travelagencycollection_updateentity_js,
	mdk_services_service1_service : mdk_services_service1_service,
	mdk_styles_styles_css : mdk_styles_styles_css,
	mdk_styles_styles_json : mdk_styles_styles_json,
	mdk_styles_styles_less : mdk_styles_styles_less,
	mdk_styles_styles_nss : mdk_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ }),

/***/ "./build.definitions/MDK/Styles/Styles.css":
/*!*************************************************!*\
  !*** ./build.definitions/MDK/Styles/Styles.css ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK/Styles/Styles.less":
/*!**************************************************!*\
  !*** ./build.definitions/MDK/Styles/Styles.less ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDK/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK/Styles/Styles.nss":
/*!*************************************************!*\
  !*** ./build.definitions/MDK/Styles/Styles.nss ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/cssWithMappingToString.js":
/*!*********************************************************************!*\
  !*** ../../../../css-loader/dist/runtime/cssWithMappingToString.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Create.page":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Create.page ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK/Rules/TravelagencyCollection/TravelagencyCollection_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create TravelagencyCollection Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"agencynum","_Name":"agencynum","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NAME","_Name":"NAME","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"STREET","_Name":"STREET","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"POSTBOX","_Name":"POSTBOX","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"POSTCODE","_Name":"POSTCODE","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CITY","_Name":"CITY","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"COUNTRY","_Name":"COUNTRY","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"REGION","_Name":"REGION","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TELEPHONE","_Name":"TELEPHONE","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"URL","_Name":"URL","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LANGU","_Name":"LANGU","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CURRENCY","_Name":"CURRENCY","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"mimeType","_Name":"mimeType","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"TravelagencyCollection_Create"}

/***/ }),

/***/ "./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Detail.page":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Detail.page ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"TravelagencyCollection Detail","DesignTimeTarget":{"Service":"/MDK/Services/service1.service","EntitySet":"TravelagencyCollection","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDK/Rules/TravelagencyCollection/NavToTravelagencyCollection_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDK/Rules/TravelagencyCollection/TravelagencyCollection_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{NAME}","Subhead":"{agencynum}","BodyText":"","Footnote":"{POSTBOX}","Description":"{STREET}","StatusText":"{POSTCODE}","StatusImage":"","SubstatusImage":"","SubstatusText":"{CITY}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"agencynum","Value":"{agencynum}"},{"KeyName":"NAME","Value":"{NAME}"},{"KeyName":"STREET","Value":"{STREET}"},{"KeyName":"POSTBOX","Value":"{POSTBOX}"},{"KeyName":"POSTCODE","Value":"{POSTCODE}"},{"KeyName":"CITY","Value":"{CITY}"},{"KeyName":"COUNTRY","Value":"{COUNTRY}"},{"KeyName":"REGION","Value":"{REGION}"},{"KeyName":"TELEPHONE","Value":"{TELEPHONE}"},{"KeyName":"URL","Value":"{URL}"},{"KeyName":"LANGU","Value":"{LANGU}"},{"KeyName":"CURRENCY","Value":"{CURRENCY}"},{"KeyName":"mimeType","Value":"{mimeType}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"TravelagencyCollection_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Edit.page":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Edit.page ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update TravelagencyCollection Detail","DesignTimeTarget":{"Service":"/MDK/Services/service1.service","EntitySet":"TravelagencyCollection","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/MDK/Rules/TravelagencyCollection/TravelagencyCollection_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDK/Rules/TravelagencyCollection/TravelagencyCollection_UpdateEntity.js"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"agencynum","_Name":"agencynum","Value":"{agencynum}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"NAME","_Name":"NAME","Value":"{NAME}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"STREET","_Name":"STREET","Value":"{STREET}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"POSTBOX","_Name":"POSTBOX","Value":"{POSTBOX}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"POSTCODE","_Name":"POSTCODE","Value":"{POSTCODE}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CITY","_Name":"CITY","Value":"{CITY}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"COUNTRY","_Name":"COUNTRY","Value":"{COUNTRY}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"REGION","_Name":"REGION","Value":"{REGION}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TELEPHONE","_Name":"TELEPHONE","Value":"{TELEPHONE}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"URL","_Name":"URL","Value":"{URL}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LANGU","_Name":"LANGU","Value":"{LANGU}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CURRENCY","_Name":"CURRENCY","Value":"{CURRENCY}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"mimeType","_Name":"mimeType","Value":"{mimeType}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"TravelagencyCollection_Edit"}

/***/ }),

/***/ "./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_List.page":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK/Pages/TravelagencyCollection/TravelagencyCollection_List.page ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"TravelagencyCollection","ActionBar":{"Items":[{"OnPress":"/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{STREET}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Detail.action","StatusImage":"","Title":"{NAME}","Footnote":"{POSTBOX}","PreserveIconStackSpacing":false,"StatusText":"{POSTCODE}","Subhead":"{agencynum}","SubstatusText":"{CITY}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"TravelagencyCollection","Service":"/MDK/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/MDK/Actions/Logout.action"}]},"_Name":"TravelagencyCollection_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK","Version":"/MDK/Globals/AppDefinition_Version.global","MainPage":"/MDK/Pages/TravelagencyCollection/TravelagencyCollection_List.page","OnLaunch":["/MDK/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/MDK/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK/Actions/Service/InitializeOnline.action","Styles":"/MDK/Styles/Styles.less","Localization":"/MDK/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/MDK/Styles/Styles.css","ios":"/MDK/Styles/Styles.nss","android":"/MDK/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDK/Actions/AppUpdate.action":
/*!********************************************************!*\
  !*** ./build.definitions/MDK/Actions/AppUpdate.action ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK/Rules/AppUpdateFailure.js","OnSuccess":"/MDK/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/AppUpdateFailureMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK/Actions/AppUpdateFailureMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/AppUpdateProgressBanner.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK/Actions/AppUpdateProgressBanner.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/AppUpdateSuccessMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK/Actions/AppUpdateSuccessMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/CloseModalPage_Cancel.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDK/Actions/CloseModalPage_Cancel.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/CloseModalPage_Complete.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK/Actions/CloseModalPage_Complete.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/ClosePage.action":
/*!********************************************************!*\
  !*** ./build.definitions/MDK/Actions/ClosePage.action ***!
  \********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/CreateEntityFailureMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/CreateEntityFailureMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/CreateEntitySuccessMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/CreateEntitySuccessMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MDK/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/DeleteConfirmation.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK/Actions/DeleteConfirmation.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MDK/Actions/DeleteEntityFailureMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/DeleteEntityFailureMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/DeleteEntitySuccessMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/DeleteEntitySuccessMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDK/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/DraftDiscardEntity.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK/Actions/DraftDiscardEntity.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/MDK/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MDK/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/MDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/DraftEditEntity.action":
/*!**************************************************************!*\
  !*** ./build.definitions/MDK/Actions/DraftEditEntity.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/MDK/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MDK/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/MDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/DraftSaveEntity.action":
/*!**************************************************************!*\
  !*** ./build.definitions/MDK/Actions/DraftSaveEntity.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/MDK/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MDK/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/MDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/Logout.action":
/*!*****************************************************!*\
  !*** ./build.definitions/MDK/Actions/Logout.action ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/LogoutMessage.action":
/*!************************************************************!*\
  !*** ./build.definitions/MDK/Actions/LogoutMessage.action ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/OnWillUpdate.action":
/*!***********************************************************!*\
  !*** ./build.definitions/MDK/Actions/OnWillUpdate.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDK/Actions/Service/InitializeOnline.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDK/Actions/Service/InitializeOnline.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/MDK/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/MDK/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/MDK/Actions/Service/InitializeOnlineFailureMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Create.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Create.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Detail.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Detail.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Edit.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_Edit.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK/Pages/TravelagencyCollection/TravelagencyCollection_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_List.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/TravelagencyCollection/NavToTravelagencyCollection_List.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK/Pages/TravelagencyCollection/TravelagencyCollection_List.page"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_CreateEntity.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_CreateEntity.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDK/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK/Actions/CreateEntitySuccessMessage.action","Properties":{"agencynum":"#Control:agencynum/#Value","NAME":"#Control:NAME/#Value","STREET":"#Control:STREET/#Value","POSTBOX":"#Control:POSTBOX/#Value","POSTCODE":"#Control:POSTCODE/#Value","CITY":"#Control:CITY/#Value","COUNTRY":"#Control:COUNTRY/#Value","REGION":"#Control:REGION/#Value","TELEPHONE":"#Control:TELEPHONE/#Value","URL":"#Control:URL/#Value","LANGU":"#Control:LANGU/#Value","CURRENCY":"#Control:CURRENCY/#Value","mimeType":"#Control:mimeType/#Value"},"Target":{"EntitySet":"TravelagencyCollection","Service":"/MDK/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_DeleteEntity.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_DeleteEntity.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"TravelagencyCollection","Service":"/MDK/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_UpdateEntity.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/TravelagencyCollection/TravelagencyCollection_UpdateEntity.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"TravelagencyCollection","Service":"/MDK/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"agencynum":"#Control:agencynum/#Value","NAME":"#Control:NAME/#Value","STREET":"#Control:STREET/#Value","POSTBOX":"#Control:POSTBOX/#Value","POSTCODE":"#Control:POSTCODE/#Value","CITY":"#Control:CITY/#Value","COUNTRY":"#Control:COUNTRY/#Value","REGION":"#Control:REGION/#Value","TELEPHONE":"#Control:TELEPHONE/#Value","URL":"#Control:URL/#Value","LANGU":"#Control:LANGU/#Value","CURRENCY":"#Control:CURRENCY/#Value","mimeType":"#Control:mimeType/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/UpdateEntityFailureMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/UpdateEntityFailureMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Actions/UpdateEntitySuccessMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK/Actions/UpdateEntitySuccessMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDK/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK/Globals/AppDefinition_Version.global":
/*!********************************************************************!*\
  !*** ./build.definitions/MDK/Globals/AppDefinition_Version.global ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDK/Services/service1.service":
/*!*********************************************************!*\
  !*** ./build.definitions/MDK/Services/service1.service ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/ExternalCUD/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map