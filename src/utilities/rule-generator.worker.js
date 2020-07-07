import { Rule, FeedBack, RuleType, RuleTags, TagInfo } from './rule.model';
const jsonpath = require('jsonpath/jsonpath.min.js');
const validationsRepo = require('./validationsRepo.json');
//import { MapGenerator } from './map-generator';

// const RGWorker = self;

// RGWorker.addEventListener("message", (event) => {
//     let eventData = event.data;
//     try {
//         if(event.data.makeRules) {
//             let ruleGenerator = new RuleGenerator(eventData.initialDoc, eventData.finalDoc);
//             let rules = ruleGenerator.generateRules();
//             RGWorker.postMessage({makeRules:true, rules});
//            } else if (eventData.mapRules) {
//                let ruleGenerator = new RuleGenerator(eventData.initialDoc,eventData.finalDoc);
//                let rules = ruleGenerator.generateMappedRules(eventData.oldRules,eventData.matcherInput);       
//                RGWorker.postMessage({mapRules:true, rules:rules.mappedRules,cellRefMap:rules.cellRefMap});
//            }
        
//     } catch (error) {
//         RGWorker.postMessage({error:{message:error.message,stack:error.stack}});
//     }
  
// });

export class RuleGenerator {
    constructor(initialDocJson, finalDocJson) {
        this.initialDocJson = initialDocJson;
        this.finalDocJson = finalDocJson;
    }

    generateRules() {
        return this.makeRules();
    }

    makeRules() {
        let validationList = this.filterValidationsList();
        let scoringRules = [];

        for (let sheetIndex in this.finalDocJson.sheets) {
            let finalRows = this.finalDocJson.sheets[sheetIndex].rows || {};
            let initialRows = this.initialDocJson.sheets[sheetIndex].rows || {};
            let rowsCount = this.returnHighestKey(finalRows,initialRows);

            for (let rowIndex = 0; rowIndex <= rowsCount; rowIndex++) {
                let finalRowData = (finalRows && finalRows[rowIndex] && finalRows[rowIndex]["cells"]) || {};
                let initialRowData = (initialRows && initialRows[rowIndex] && initialRows[rowIndex]["cells"]) || {};
                let columns = this.returnHighestKey(finalRowData, initialRowData);

                for (let colIndex = 0; colIndex <= columns; colIndex++) {
                    let finalCell = (finalRowData && finalRowData[colIndex]) || undefined;
                    let initialCell = (initialRowData && initialRowData[colIndex]) || undefined;
                    let cellRule = this.makeCellRule(initialCell, finalCell, sheetIndex, validationList);
                    if (cellRule.rules.length > 0) {
                        scoringRules.push(cellRule);
                    }
                }
            }
        }
        return scoringRules;
    }

    makeCellRule(initialCell,finalCell,sheetIndex, validationList) {
        let baseRule = new Rule(RuleType.SUM);
        baseRule.tag = RuleTags.CELL;
        baseRule.configured = true;
        baseRule.custom = false;
        baseRule.feedback = new FeedBack();

        validationList = this.filterFormatFromValidationList(finalCell,validationList);

        if (initialCell && finalCell) {
            for (let index = 0; index < validationList.length; index++) {
                const validation = validationList[index];
                let initValue = jsonpath.query(initialCell, validation.path)[0];
                let finalValue = jsonpath.query(finalCell, validation.path)[0];
                if(this.makeRuleOrNotOnBasisOfValue(initValue, finalValue)) {
                    this.makeValidationRule(baseRule, initialCell, finalCell, validation, this.finalDocJson.sheets[sheetIndex].id);
                }
            }
        } else {
            // if (finalcell) ignore rule making when final cell is absent (issue :- where to place validation nodes if there is no final cell)
            if (finalCell) {
                for (let index = 0; index < validationList.length; index++) {
                    const validation = validationList[index];
                    let initValue = initialCell ? jsonpath.query(initialCell, validation.path)[0] : undefined;
                    let finalValue = finalCell ? jsonpath.query(finalCell, validation.path)[0] : undefined;
                    if (initValue !== undefined || finalValue !== undefined) {
                        // this check is to prevent Format= "General Rules"
                        if (validation.path === "style.format" && (initValue === "General" || finalValue === "General")) {
                            continue;
                        }
                        this.makeValidationRule(baseRule, initialCell, finalCell, validation, this.finalDocJson.sheets[sheetIndex].id);
                    }
                }
            }
        }
        return baseRule;
    }

    filterFormatFromValidationList(finalCell, validationList) {
        if (finalCell && (finalCell.value === undefined || finalCell.value === "")) {
            validationList = validationList.filter((validation) => {
                return validation.path !== "style.format"
            })
        }
        return validationList;
    }

    makeValidationRule(baseRule, initialCell, finalCell, validation, sheetId) {
        let validationRule = new Rule(RuleType.VALIDATION);
        validationRule.tag = RuleTags.VALIDATION;
        // validationRule.tagInfo = new TagInfo();
        validationRule.feedback = new FeedBack();
        validationRule.configured = true;
        validationRule.reference = sheetId + "!" + (finalCell ? finalCell.ref : initialCell.ref);
        validationRule.operator = validation.operator;
        validationRule.toleranceInfo = validation.toleranceInfo;
        validationRule.checkFor = validation.path;
        // validationRule.tagInfo.content = finalCell && finalCell.value !== undefined ? finalCell.value : "[BLANK]";
        // validationRule.tagInfo.format = finalCell ? finalCell.style.format : initialCell.style.format;
        baseRule.rules.push(validationRule);    
    }

    filterValidationsList() {
        return jsonpath.query(validationsRepo, "$..validations").reduce((acc, val) => acc.concat(val), []).filter((validation) => {
            return validation.makeRule === true;
        })
    }

    makeRuleOrNotOnBasisOfValue(initValue, finalValue) {
        if (initValue !== undefined && finalValue !== undefined) {
            if (initValue !== finalValue) {
                return true;
            }
        } else {
            if (initValue !== undefined || finalValue !== undefined) {
                return true;
            }
        }
        return false;
    }

    returnHighestKey(param1, param2) {
        return Math.max.apply(null, Object.keys(param1).concat(Object.keys(param2)))
    }
   
    generateMappedRules(oldRulesArray,matcherInput) {
        try {       
        let newRulesArray = this.generateRules();
        console.log('mappedGenerator');
        //let mappedGenerator = new MapGenerator(oldRulesArray, newRulesArray, matcherInput);
        return mappedGenerator.generateRules(); 
        } catch (error) {
            throw error;
        }
               
    }
    
}

