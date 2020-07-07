class JsonUpdator {

    updatedJSONSTemplate;
    activeSheetID;

    constructor() {
        this.updatedJSONSTemplate = getUpdatedJSONTemplate();
    }

    getUpdatedPresentationJSON = (ipJson) => {
        if (ipJson) {
            this.populateUpdatedJSONSTemplate(ipJson);
        }
        return this.updatedJSONSTemplate;
    }

    populateUpdatedJSONSTemplate = (ipJson) => {
        let oldJSONObj = ipJson;
        if (oldJSONObj) {
            this.updateMetaNode(oldJSONObj.options.data);
            this.updateSheetBarNode(oldJSONObj.options.data.content.canvas.preferences);
            this.updateFormulaBarNode(oldJSONObj.options.data.content.canvas.preferences);
            this.updateResourcesNode(oldJSONObj.options.data.resources);
            this.updateGridNode(oldJSONObj.options);
            this.updateLeoTimeStamp();
            if(this.updatedJSONSTemplate.resources && this.updatedJSONSTemplate.resources.RE1 && 
                this.updatedJSONSTemplate.resources.RE1.leonardoJSON && this.updatedJSONSTemplate.resources.RE1.leonardoJSON.data
                && this.updatedJSONSTemplate.resources.RE1.leonardoJSON.data.sheets){
                    this.updateCellStyle(this.updatedJSONSTemplate.resources.RE1.leonardoJSON.data.sheets);
                }
        }
    }

    updateMetaNode(oldJSONObj) {
        this.updatedJSONSTemplate.meta.title = oldJSONObj.meta.title;
    }

    updateSheetBarNode = (oldJSONObj) => {
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.visible = oldJSONObj.sheetbar.visible;
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.allowInsertDelete = oldJSONObj.sheetbar['allow-insert-delete'];
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.allowRename = oldJSONObj.sheetbar['allow-rename'];
    }

    updateFormulaBarNode = (oldJSONObj) => {
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.visible = oldJSONObj.formulabar.visible;
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.namebox = oldJSONObj.formulabar.namebox;
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.expanded = oldJSONObj.formulabar.expanded;
    }

    updateResourcesNode = (oldJSONObj) => {
        let resourceObj = {};
        let objKey = Object.keys(oldJSONObj)[0];
        resourceObj['type'] = oldJSONObj[objKey].type;
        resourceObj['leonardoJSON'] = oldJSONObj[objKey].spreadsheet;
        this.updateSheetID(resourceObj['leonardoJSON']);
        this.updatedJSONSTemplate.resources["RE1"] = resourceObj;
    }

    updateGridNode = (oldJSONObj) => {
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.grid.rowHeader = oldJSONObj.data.content.canvas.preferences.grid.rowHeader;
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.grid.colHeader = oldJSONObj.data.content.canvas.preferences.grid.colHeader;
        if (this.activeSheetID) {
            this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.grid.activeSheetId = this.activeSheetID;
        }
        this.updatedJSONSTemplate.templateData.leonardoSpreadsheet.preferences.grid.showGridLines = oldJSONObj.data.resources[oldJSONObj.data.content.canvas.resource].spreadsheet.data.sheets[0].showGridLines;
    }

    updateSheetID = (dataNode) => {
        let sheetsObj = dataNode.data.sheets;
        let activeSheetName = dataNode.data.activeSheet;
        for (let sheetObjKey in sheetsObj) {
            let sheetID = this.getSheetID(sheetsObj[sheetObjKey].name);
            if (sheetID != undefined) {
                sheetsObj[sheetObjKey]['id'] = sheetID;
            }
            if (activeSheetName && sheetsObj[sheetObjKey].name === activeSheetName) {
                this.activeSheetID = sheetsObj[sheetObjKey]['id'];
            }
        }
    }

    getSheetID = (sheetName) => {
        let sheetID = "";
        if (sheetName) {
            sheetID = "SID123";
        }
        return sheetID;
    }

    updateCellStyle = (obj) => {
        if (!obj || !this.isObject(obj) || Object.keys(obj).length <= 0) {
            return;
        }
        if (obj.verticalAlign && obj.verticalAlign === 'middle') {
            obj.verticalAlign = 'center';
            return;
        }
        for (let objKey in obj) {
            let nestedObj = obj[objKey];
            this.updateCellStyle(nestedObj);
        }
    }

    isObject(obj) {
        return obj && typeof obj === 'object' && obj.constructor === Object;
    }

    updateLeoTimeStamp = () => {
        this.updatedJSONSTemplate.leonardoId = "leo" + new Date().getTime();
    }

    // getActiveSheetID = () => {
    //     let activeSheetID;
    //     let objKey = Object.keys(this.updatedJSONSTemplate.resources)[0];
    //     if(objKey){
    //         let activeSheetName = this.updatedJSONSTemplate.resources[objKey].leonardoJSON.data.activeSheet;
    //         if(activeSheetName){
    //             let activeSheetObj;
    //             let sheetsObj = this.updatedJSONSTemplate.resources[objKey].leonardoJSON.data.sheets;
    //             for(let sheetObjKey in sheetsObj){
    //                 if(sheetsObj[sheetObjKey].name === activeSheetName){
    //                     activeSheetObj = sheetsObj[sheetObjKey];
    //                 }
    //             }
    //           if(activeSheetObj && activeSheetObj.id !== undefined){
    //             activeSheetID = activeSheetObj.id;
    //           }
    //         }
    //     }
    //     return activeSheetID;
    // }
}

function getUpdatedJSONTemplate() {

    let updatedJSONtemplate = {
        "leonardoId": 0,
        "meta": {
            "schemaVersion": 1.0,
            "title": "",
        },
        "widgetStyles": {
            "hAlign": "center",
            "vAlign": "middle"
        },
        "templateData": {
            "leonardoSpreadsheet": {
                "resource": "RE1",
                "preferences": {
                    "ribbon": {
                        "visible": false,
                        "collapsed": false,
                        "type": "type1"
                    },
                    "sheetbar": {
                        "visible": false,
                        "allowInsertDelete": false,
                        "allowRename": false
                    },
                    "formulabar": {
                        "visible": false,
                        "namebox": false,
                        "expanded": false
                    },
                    "grid": {
                        "displayMode": "tabular",
                        "rowHeader": false,
                        "colHeader": false,
                        "activeSheetId": "",
                        "showGridLines": false
                    }
                }
            }
        },
        "revision": 1,
        "type": "presentation",
        "templateType": "presentation1",
        "resources": {},
    }

    return updatedJSONtemplate;
}