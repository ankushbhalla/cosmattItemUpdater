import {getSheetNameFromId} from "./spreadsheetParser";

const jsonpath = require('jsonpath/jsonpath.min.js');
const validationsRepo = require('./validationsRepo.json');
const feedbackRepo = require('./feedbackRepo.json');
import { CONSTANTS } from './constants';

export class FeedbackGenerator {
    constructor(finalDocJson, cellReference) {
        this.finalDocData = finalDocJson;
        this.cellRef = cellReference;

        let [sheetId, cellRef] = cellReference.split('!');
        let query = `$.sheets[?(@.id=='${sheetId}')].rows[*].cells[?(@.ref=='${cellRef}')]`;
        this.cellData = jsonpath.query(finalDocJson, query)[0];

        this.sheetName = getSheetNameFromId(sheetId, this.finalDocData);

        /* Returns sheet name of specified sheet id */
    }



    generateFeedback(validationRule) {
        let validationLabel = this.getValidationString(validationRule);
        let validationValue = this.getValidationPropValue(validationRule);
        
        let feedbackType = jsonpath.query(validationsRepo, `$..validations[?(@.label=='${validationLabel}')].feedbackType`)[0];
        let feedbackTemplate = feedbackRepo.initialText;
        let feedbackPropValue;
        /* 
            If property value is present in final grid json get corresponding feedback value to show.
            Else, get corresponding property value from initial grid json.
         */
        if(validationValue !== null && validationValue !== undefined) {
            feedbackTemplate = feedbackTemplate + feedbackRepo.templates[feedbackType].negative;
            feedbackPropValue = this.getFeedbackPropValue(validationRule, validationLabel, validationValue);
        } else {
            feedbackTemplate = feedbackTemplate + feedbackRepo.templates[feedbackType].positive;
        }
        
        let [sheetId, cellRef] = validationRule.reference.split('!');
        
        let sheetName = this.sheetName;
        let map = {
            '#CELL#': cellRef,
            '#SHEET#': sheetName,
            '#PROPERTY#': validationLabel,
            '#VALUE#': feedbackPropValue
        };
        let regex = new RegExp(Object.keys(map).join('|'), "g");
        let feedbackString = feedbackTemplate.replace(regex, function(match) {
            return map[match];
        });
        return `${feedbackString}`;
    }

    getValidationPropValue(validationRule) {        
        let query = `$.${validationRule.checkFor}`;
        if(this.cellData) {
            let validationValue = jsonpath.query(this.cellData, query)[0];
            return validationValue;
        }        
    }

    getFeedbackPropValue(validationRule, validationLabel, validationValue) {
        if(!(validationLabel && validationValue)) {
            validationLabel = this.getValidationString(validationRule);
            validationValue = this.getValidationPropValue(validationRule);
        }
        let feedbackPropValue;
        switch(validationLabel) {
            case 'Text': feedbackPropValue = (validationValue !== null && validationValue !== undefined)? this.getFormattedContent(validationValue, jsonpath.query(this.cellData,"$.style.format")[0]): '[BLANK]';
                break;
            case 'Bold':
            case 'Italic':
            case 'Underline': feedbackPropValue = validationValue? 'Enabled': 'Disabled'
                break;
            case 'Formula': feedbackPropValue = validationValue? validationValue: 'None';
                break;
            case 'Vertical Alignment':
            case 'Horizontal Alignment': feedbackPropValue = (validationValue !== null && validationValue !== undefined)? validationValue: 'Removed';
                break;
            default: 
                feedbackPropValue = validationValue;
        }
        return feedbackPropValue;
    }

    getFormattedContent(content, format) {
        return content;
    }

    getValidationString(validation){
        return jsonpath.query(validationsRepo, '$..validations[?(@.path=="' + validation.checkFor + '")].label')[0];
    }

    static generateAllFeedbacks(rules, finalDocJson) {
        let cellRulesArray = jsonpath.query(rules, `$..[?(@.tag=="cell")]`);

        cellRulesArray.forEach((cellRule) => {
            if(!cellRule.changeSet || (cellRule.changeSet && cellRule.changeSet.type !== CONSTANTS.CHANGE_SET_TYPE.DELETE)) {
                let feedbackGenerator = new FeedbackGenerator(finalDocJson, cellRule.rules[0].reference);
                cellRule.rules.forEach((vRule) => {
                    if(vRule.feedback && vRule.feedback.sysFeedback) {
                        vRule.feedback.successText = feedbackGenerator.generateFeedback(vRule);
                        vRule.feedback.failureText = vRule.feedback.successText;
                    }
                });
            }
        });
        return rules;
    }
}