import * as jsonpath from 'jsonpath/jsonpath.min.js';

export class ScoringConverter {
    constructor(){
        this.ruleType = {
            SUM: 'Sum',
            ALL: 'All',
            ANY: 'Any',
            VALIDATION: 'Validation'
        }
    }
    
    /**
     * 
     * @param scoringJson - paint scoring rules
     * @param finalGridJson - gridJson of final document
     * @param skipScorerJson - if 'true' it returns only solution json. Else returns solution json and scoring json in scorer format
     */
    convertToPublishFormat(
        scoringJson, 
        finalGridJson,
        skipScorerJson = false
    ) {
        scoringJson = this.getObjectCopy(scoringJson);
        finalGridJson = this.getObjectCopy(finalGridJson);
        
        this.trimNonConfiguredRules(scoringJson);

        /* Change ruleId to id in all the rules */
        jsonpath.query(scoringJson, `$..rules[?(@.ruleId)]`).forEach((rule) => {
            rule.id = rule.ruleId;
        });

        let validationRulesList = this.getAllValidationRules(scoringJson);
        
        /* Add validation rule id to all validation rules.*/
        validationRulesList.forEach((rule) => {

            /* Validation type rules cannot have any children rules */
            delete rule.rules;
            
            this.addRuleToGridJson(rule, finalGridJson);            
        });

        if(skipScorerJson) {
            return {
                solutionJson: finalGridJson
            }
        }

        /* Convert the scoringJson to scorer format and return */
        scoringJson = this.convertToScorerFormat(scoringJson);
        return {
            scoringJson,
            solutionJson: finalGridJson
        };
    }

    /* trims rules from scoringJson if configured is set as false */
    trimNonConfiguredRules(scoringJson) {
        /* Extract rules with configured=false */
        let nodes = jsonpath.nodes(scoringJson, '$..rules[?(@.configured==false)]');

        /* 
            Delete each node from scoringJson. Traverse and remove the nodes in reverse order, else the 
            node position changes with array splice while the node.path remains same.
        */
        for(let index = nodes.length - 1; index >=0 ; index--) {
            let parent = jsonpath.parent(scoringJson, jsonpath.stringify(nodes[index].path));
            if(parent) {
                parent.splice(nodes[index].path[nodes[index].path.length - 1], 1);
            }
        }
    }

    convertToScorerFormat(scoringJson) {
        /*
            Remove the nodes not required for scorer.
        */
        jsonpath.query(scoringJson, '$..rules[*]').forEach((rule) => {
            delete rule.tag;
            delete rule.tagInfo;
            delete rule.checkFor;
            delete rule.operator;
            delete rule.reference;
            delete rule.extraInfo;
            delete rule.configured;
            delete rule.hintIds;
            delete rule.ruleId;
            delete rule.custom;

            if(rule.feedback) {
                delete rule.feedback.sysFeedback;
            }
        });

        /*
            Remove score depending on rule type SUM, ALL or ANY
            Note: For Demo purpose score is not trimmed from rules. Need to clean up and trim score later.
        */
        jsonpath.query(scoringJson, `$..rules[?(@.type=="${this.ruleType.SUM}" || @.type=="${this.ruleType.ALL}" || @.type=="${this.ruleType.ANY}")]`).forEach((rule) => {
            if(rule.type === this.ruleType.SUM) {
                /* 
                    If type='Sum', then total score is sum of scores of children rules. Therefore the score of this rule
                    node doesn't matter.
                */
                // delete rule.score;
                delete rule.feedback;
            } 
            /* Code commented for demo purpose .*/
            // else if(rule.type === this.ruleType.ALL || rule.type === this.ruleType.ANY) {
            //     /* 
            //         If type='All' or type='Any', then scores of children rules doesn't matter. Therefore remove the
            //         score node from the children rules.
            //     */
            //     // jsonpath.query(rule, '$..rules[*]').forEach((rule) => {
            //     //     // delete rule.score;
            //     //     // delete rule.feedback;
            //     // });
            // }
        });
        
        var sumWrap = {type:this.ruleType.SUM,score:scoringJson.overallScore};
        if(scoringJson.rules && scoringJson.rules.length && scoringJson.rules[0] && scoringJson.rules[0].rules.length) {
            sumWrap['rules'] = scoringJson.rules;
            scoringJson.rules = sumWrap;
        } else {
            delete scoringJson.rules;
        }        
        return scoringJson;
    }

    /* Returns the list of rules with type = 'validation' */
    getAllValidationRules(scoringJson) {
        return jsonpath.query(scoringJson, `$..rules[?(@.type=="${this.ruleType.VALIDATION}")]`);
    }

    /* Adds the validation rule to the corresponding cell in finalGridJson */
    addRuleToGridJson(rule, finalGridJson) {
        let [sheetId, cellRef] = rule.reference.split('!');

        let query = `$.sheets[?(@.id=='${sheetId}')].rows[*].cells[?(@.ref=='${cellRef}')]`;
        let cellNode = jsonpath.query(finalGridJson, query)[0];
        if(cellNode) {
            if(!cellNode.validations) {
                cellNode.validations = [];
            }
            cellNode.validations.push({
                validate: rule.checkFor,
                operator: rule.operator,
                extrainfo: rule.toleranceInfo,
                id:rule.id
            });
        }
    }

    getObjectCopy(json) {
        return JSON.parse(JSON.stringify(json));
    }
}