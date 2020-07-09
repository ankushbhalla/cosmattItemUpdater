(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/presentation-json-converter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/shorthash/index.js":
/*!*****************************************!*\
  !*** ./node_modules/shorthash/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./shorthash */ \"./node_modules/shorthash/shorthash.js\");\n\n//# sourceURL=webpack:///./node_modules/shorthash/index.js?");

/***/ }),

/***/ "./node_modules/shorthash/shorthash.js":
/*!*********************************************!*\
  !*** ./node_modules/shorthash/shorthash.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/*\n\tshorthash\n\t(c) 2013 Bibig\n\t\n\thttps://github.com/bibig/node-shorthash\n\tshorthash may be freely distributed under the MIT license.\n*/\n\nexports.bitwise = bitwise;\nexports.binaryTransfer = binaryTransfer;\nexports.unique = unique;\nexports.random = random;\n\n// refer to: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/\nfunction bitwise(str){\n\tvar hash = 0;\n\tif (str.length == 0) return hash;\n\tfor (var i = 0; i < str.length; i++) {\n\t\tvar ch = str.charCodeAt(i);\n\t\thash = ((hash<<5)-hash) + ch;\n\t\thash = hash & hash; // Convert to 32bit integer\n\t}\n\treturn hash;\n}\n\n// 10进制转化成62进制以内的进制\n// convert 10 binary to customized binary, max is 62\nfunction binaryTransfer(integer, binary) {\n\tbinary = binary || 62;\n\tvar stack = [];\n\tvar num;\n\tvar result = '';\n\tvar sign = integer < 0 ? '-' : '';\n\t\n\tfunction table (num) {\n\t\tvar t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';\n\t\treturn t[num];\n\t}\n\t\n\tinteger = Math.abs(integer);\n\t\n\twhile (integer >= binary) {\n\t\tnum = integer % binary;\n\t\tinteger = Math.floor(integer / binary);\n\t\tstack.push(table(num));\n\t}\n\t\n\tif (integer > 0) {\n\t\tstack.push(table(integer));\n\t}\n\t\n\tfor (var i = stack.length - 1; i >= 0; i--) {\n\t\tresult += stack[i];\n\t} \n\t\n\treturn sign + result;\n}\n\n\n/**\n * why choose 61 binary, because we need the last element char to replace the minus sign\n * eg: -aGtzd will be ZaGtzd\n */\nfunction unique (text) {\n\tvar id = binaryTransfer(bitwise(text), 61);\n\treturn id.replace('-', 'Z');\n}\n\nfunction random (_len) {\n\t/*\n\tvar len = _len || 8 ;\n\treturn require('crypto').randomBytes(len).toString('hex');\n\t*/\n\t\n\tvar chars = \"0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz\";\n\tvar rs = '';\n\tvar len = _len || 8 ;\n\tfor (var i=0; i< len; i++) {\n\t\tvar pos = Math.floor( Math.random() * chars.length);\n\t\trs += chars.substring(pos, pos + 1);\n\t}\n\treturn rs;\n}\n\n//# sourceURL=webpack:///./node_modules/shorthash/shorthash.js?");

/***/ }),

/***/ "./src/presentation-json-converter.js":
/*!********************************************!*\
  !*** ./src/presentation-json-converter.js ***!
  \********************************************/
/*! exports provided: PresentationJSONConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PresentationJSONConverter\", function() { return PresentationJSONConverter; });\n/* harmony import */ var shorthash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! shorthash */ \"./node_modules/shorthash/index.js\");\n/* harmony import */ var shorthash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(shorthash__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass PresentationJSONConverter {\r\n\r\n    constructor() {\r\n        this.updatedJSONSTemplate = getConvertedJSONTemplate();\r\n    }\r\n\r\n    getUpdatedPresentationJSON(ipJson){\r\n        if (ipJson) {\r\n            this.populateUpdatedJSONSTemplate(ipJson);\r\n        }\r\n        return this.updatedJSONSTemplate;\r\n    }\r\n\r\n    populateUpdatedJSONSTemplate(ipJson){\r\n        let oldJSONObj = ipJson;\r\n        if (oldJSONObj) {\r\n            this.updateMetaNode(oldJSONObj.options.data);\r\n            this.updateSheetBarNode(oldJSONObj.options.data.content.canvas.preferences);\r\n            this.updateFormulaBarNode(oldJSONObj.options.data.content.canvas.preferences);\r\n            this.updateResourcesNode(oldJSONObj.options.data.resources);\r\n            this.updateGridNode(oldJSONObj.options);\r\n            this.updateLeoTimeStamp();\r\n            if(this.updatedJSONSTemplate.resources && this.updatedJSONSTemplate.resources.RE1 && \r\n                this.updatedJSONSTemplate.resources.RE1.leonardoJSON && this.updatedJSONSTemplate.resources.RE1.leonardoJSON.data\r\n                && this.updatedJSONSTemplate.resources.RE1.leonardoJSON.data.sheets){\r\n                    this.updateCellStyle(this.updatedJSONSTemplate.resources.RE1.leonardoJSON.data.sheets);\r\n                }\r\n        }\r\n    }\r\n\r\n    updateMetaNode(oldJSONObj){\r\n        this.updatedJSONSTemplate.meta.title = oldJSONObj.meta.title;\r\n    }\r\n\r\n    updateSheetBarNode(oldJSONObj){\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.visible = oldJSONObj.sheetbar.visible;\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.allowInsertDelete = oldJSONObj.sheetbar['allow-insert-delete'];\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.allowRename = oldJSONObj.sheetbar['allow-rename'];\r\n    }\r\n\r\n    updateFormulaBarNode(oldJSONObj){\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.visible = oldJSONObj.formulabar.visible;\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.namebox = oldJSONObj.formulabar.namebox;\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.expanded = oldJSONObj.formulabar.expanded;\r\n    }\r\n\r\n    updateResourcesNode(oldJSONObj){\r\n        let resourceObj = {};\r\n        let objKey = Object.keys(oldJSONObj)[0];\r\n        resourceObj['type'] = oldJSONObj[objKey].type;\r\n        resourceObj['leonardoJSON'] = oldJSONObj[objKey].spreadsheet;\r\n        this.updateSheetID(resourceObj['leonardoJSON']);\r\n        this.updatedJSONSTemplate.resources[\"RE1\"] = resourceObj;\r\n    }\r\n\r\n    updateGridNode(oldJSONObj){\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.grid.rowHeader = oldJSONObj.data.content.canvas.preferences.grid.rowHeader;\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.grid.colHeader = oldJSONObj.data.content.canvas.preferences.grid.colHeader;\r\n        if (this.activeSheetID) {\r\n            this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.grid.activeSheetId = this.activeSheetID;\r\n        }\r\n        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.grid.showGridLines = oldJSONObj.data.resources[oldJSONObj.data.content.canvas.resource].spreadsheet.data.sheets[0].showGridLines;\r\n    }\r\n\r\n    updateSheetID(dataNode){\r\n        let sheetsObj = dataNode.data.sheets;\r\n        let activeSheetName = dataNode.data.activeSheet;\r\n        for (let sheetObjKey in sheetsObj) {\r\n            let sheetID = this.getSheetID(sheetsObj[sheetObjKey].name);\r\n            if (sheetID != undefined) {\r\n                sheetsObj[sheetObjKey]['id'] = sheetID;\r\n            }\r\n            if (activeSheetName && sheetsObj[sheetObjKey].name === activeSheetName) {\r\n                this.activeSheetID = sheetsObj[sheetObjKey]['id'];\r\n            }\r\n        }\r\n    }\r\n\r\n    getSheetID(sheetName){\r\n        let sheetID = \"sid\";\r\n        if (sheetName) {\r\n            sheetID = sheetID + shorthash__WEBPACK_IMPORTED_MODULE_0__[\"unique\"](sheetName);\r\n        }\r\n        return sheetID;\r\n    }\r\n\r\n    updateCellStyle(obj){\r\n        if (!obj || !this.isObject(obj) || Object.keys(obj).length <= 0) {\r\n            return;\r\n        }\r\n        if (obj.verticalAlign && obj.verticalAlign === 'middle') {\r\n            obj.verticalAlign = 'center';\r\n            return;\r\n        }\r\n        for (let objKey in obj) {\r\n            let nestedObj = obj[objKey];\r\n            this.updateCellStyle(nestedObj);\r\n        }\r\n    }\r\n\r\n    isObject(obj){\r\n        return obj && typeof obj === 'object' && obj.constructor === Object;\r\n    }\r\n\r\n    updateLeoTimeStamp(){\r\n        this.updatedJSONSTemplate.leonardoId = \"leo-\" + new Date().getTime();\r\n    }\r\n}\r\n\r\nfunction getConvertedJSONTemplate() {\r\n\r\n    let updatedJSONtemplate = {\r\n        \"leonardoId\": 0,\r\n        \"meta\": {\r\n            \"schemaVersion\": 1.0,\r\n            \"title\": \"\",\r\n        },\r\n        \"widgetStyles\": {\r\n            \"hAlign\": \"center\",\r\n            \"vAlign\": \"middle\"\r\n        },\r\n        \"templateData\": {\r\n            \"leonardoSpreadsheet\": {\r\n                \"resource\": \"RE1\",\r\n                \"preferences\": {\r\n                    \"ribbon\": {\r\n                        \"visible\": false,\r\n                        \"collapsed\": false,\r\n                        \"type\": \"type1\"\r\n                    },\r\n                    \"sheetbar\": {\r\n                        \"visible\": false,\r\n                        \"allowInsertDelete\": false,\r\n                        \"allowRename\": false\r\n                    },\r\n                    \"formulabar\": {\r\n                        \"visible\": false,\r\n                        \"namebox\": false,\r\n                        \"expanded\": false\r\n                    },\r\n                    \"grid\": {\r\n                        \"displayMode\": \"tabular\",\r\n                        \"rowHeader\": false,\r\n                        \"colHeader\": false,\r\n                        \"activeSheetId\": \"\",\r\n                        \"showGridLines\": false\r\n                    }\r\n                }\r\n            }\r\n        },\r\n        \"revision\": 1,\r\n        \"type\": \"presentation\",\r\n        \"templateType\": \"presentation1\",\r\n        \"resources\": {},\r\n    }\r\n\r\n    return updatedJSONtemplate;\r\n}\n\n//# sourceURL=webpack:///./src/presentation-json-converter.js?");

/***/ })

/******/ })));