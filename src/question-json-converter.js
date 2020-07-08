import {RuleGenerator} from './utilities/rule-generator.worker';
import {ScoringConverter} from './utilities/scoring-converter';
import { distributeTotalScoreEqually } from './utilities/rule.service';

const TOTAL_SCORE = 100;

export class QuestionJSONConverter {

    constructor() {
        this.convertedJSONTemplate = getConvertedJSONTemplate();
    }

    getConvertedQuestionJSON (ipJson){
        if (ipJson) {
            this.updateConvertedJSONTemplate(ipJson);
        }
        return this.convertedJSONTemplate;
    }

    updateConvertedJSONTemplate (ipJson) {
        let oldJSONObj = ipJson;
        if (oldJSONObj) {
            this.updateLeoID();
            this.updateMetaNode(oldJSONObj);
            this.updateSheetBarNode(oldJSONObj.content.canvas.preferences);
            this.updateFormulaBarNode(oldJSONObj.content.canvas.preferences);
            this.updateResourcesNode(oldJSONObj);
            this.updateGridNode(oldJSONObj);
            this.updateValidationNode(oldJSONObj);
            if (this.convertedJSONTemplate.resources) {
                if (this.convertedJSONTemplate.resources.RE1 && this.convertedJSONTemplate.resources.RE1.leonardoJSON
                    && this.convertedJSONTemplate.resources.RE1.leonardoJSON.data &&
                    this.convertedJSONTemplate.resources.RE1.leonardoJSON.data.sheets) {
                    this.updateCellStyle(this.convertedJSONTemplate.resources.RE1.leonardoJSON.data.sheets);
                }

                if (this.convertedJSONTemplate.resources.RE2 && this.convertedJSONTemplate.resources.RE2.leonardoJSON
                    && this.convertedJSONTemplate.resources.RE2.leonardoJSON.data &&
                    this.convertedJSONTemplate.resources.RE2.leonardoJSON.data.sheets) {
                    this.updateCellStyle(this.convertedJSONTemplate.resources.RE2.leonardoJSON.data.sheets);
                }
            }

        }
    }

    updateLeoID() {
        this.convertedJSONTemplate.leonardoId = "leo" + new Date().getTime();
    }

    updateMetaNode(oldJSONObj){
        this.convertedJSONTemplate.meta.title = oldJSONObj.meta.title;
    }

    updateSheetBarNode (oldJSONObj) {
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.visible = oldJSONObj.sheetbar.visible;
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.allowInsertDelete = oldJSONObj.sheetbar.allowInsertDelete;
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.sheetbar.allowRename = oldJSONObj.sheetbar.allowRename;
    }

    updateFormulaBarNode(oldJSONObj) {
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.visible = oldJSONObj.formulabar.visible;
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.namebox = oldJSONObj.formulabar.namebox;
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.formulabar.expanded = oldJSONObj.formulabar.expanded;
    }

    updateResourcesNode (oldJSONObj) {
        let sourceResourceKey = oldJSONObj.content.canvas.resource;
        let sourceResourceObj = oldJSONObj.resources[sourceResourceKey];
        let updatedSourceResourceObj = {};
        if (sourceResourceObj) {
            updatedSourceResourceObj['type'] = 'leonardoJSON';
            updatedSourceResourceObj['leonardoJSON'] = sourceResourceObj.spreadsheet;
            this.convertedJSONTemplate.resources["RE1"] = updatedSourceResourceObj;
            this.updateSheetID(this.convertedJSONTemplate.resources["RE1"]['leonardoJSON']);
        }
        
        let validationResponseResourceKey = oldJSONObj.validation.validResponse.resource;
        let validationResponseResourceObj = oldJSONObj.resources[validationResponseResourceKey];
        let updatedValidationResponseResourceObj = {};
        if (validationResponseResourceObj) {
            updatedValidationResponseResourceObj['type'] = 'leonardoJSON';
            updatedValidationResponseResourceObj['leonardoJSON'] = validationResponseResourceObj.spreadsheet;
            this.convertedJSONTemplate.resources["RE2"] = updatedValidationResponseResourceObj;
            this.updateSheetID(this.convertedJSONTemplate.resources["RE2"]['leonardoJSON']);
        }

        let scoringRulesArray = this.generateScoringRules(updatedSourceResourceObj['leonardoJSON'].data, updatedValidationResponseResourceObj['leonardoJSON'].data);
        distributeTotalScoreEqually(TOTAL_SCORE, scoringRulesArray)
        let scoringJson = {
            type: "sum",
            overallScore: TOTAL_SCORE,
            rules: scoringRulesArray
        }
        let convertedScoringRules = this.scoringRuleConverter(scoringJson, updatedValidationResponseResourceObj['leonardoJSON'].data);
        this.scoringRules = convertedScoringRules.scoringJson.rules;
        updatedValidationResponseResourceObj['leonardoJSON'].data = convertedScoringRules.solutionJson;
    }

    updateGridNode (oldJSONObj) {
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.grid.rowHeader = oldJSONObj.content.canvas.preferences.grid.rowHeader;
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.grid.colHeader = oldJSONObj.content.canvas.preferences.grid.colHeader;
        this.convertedJSONTemplate.templateData.leonardoSpreadsheet.preferences.grid.showGridLines = oldJSONObj.resources[oldJSONObj.content.canvas.resource].spreadsheet.data.sheets[0].showGridLines;
    }

    updateValidationNode(oldJSONObj) {
        this.convertedJSONTemplate.validation = oldJSONObj.validation;
        this.convertedJSONTemplate.validation.validResponse.resource = "RE2";
        // this.convertedJSONTemplate.validation.rules = {};
        this.convertedJSONTemplate.validation.rules = this.scoringRules;
        // this.convertedJSONTemplate.validation.rules['type'] = "SUM";
        // this.convertedJSONTemplate.validation.rules['score'] = TOTAL_SCORE;
        // this.convertedJSONTemplate.validation.rules.rules = this.scoringRules;
    }

    updateSheetID (dataNode){
        let sheetsObj = dataNode.data.sheets;
        for (let sheetObjKey in sheetsObj) {
            let sheetID = this.getSheetID(sheetsObj[sheetObjKey].name);
            if (sheetID != undefined) {
                sheetsObj[sheetObjKey]['id'] = sheetID;
            }
        }
    }

    getSheetID (sheetName) {
        let sheetID = "";
        if (sheetName) {
            sheetID = "SID123";
        }
        return sheetID;
    }

    updateCellStyle (obj) {
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

    generateScoringRules (initial, final) {
        let ruleGenerator = new RuleGenerator(initial, final);
        let rules = ruleGenerator.generateRules();
        return rules;
    }

    scoringRuleConverter (scoringJson, finalGridJson) {
        let scoringConverterRef = new ScoringConverter();
        let covretedScore = scoringConverterRef.convertToPublishFormat(scoringJson, finalGridJson, false);
        return covretedScore;
    }
}

function getConvertedJSONTemplate() {

    let convertedJSONtemplate = {
        "leonardoId": 0,
        "revision": 1,
        "type": 'question',
        "templateType": "gridOnly",
        "meta": {
            "schemaVersion": 1.0,
            "title": "",
        },
        "templatePreferences": {
            "splitter": {
                "visible": false
            }
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
                        "showGridLines": false
                    }
                }
            }
        },
        "resources": {},
        "validation": {}
    }

    return convertedJSONtemplate;
}
