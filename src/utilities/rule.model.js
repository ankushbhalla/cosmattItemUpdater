import * as shortid from 'shortid';

export let RuleType = {
  ALL: "All",
  SUM: "Sum",
  ANY: "Any",
  VALIDATION: "Validation"
}

export let RuleTags = {
  CELL:"cell",
  GROUP:"group",
  VALIDATION:"validation"
}

export class Rule {
  // type: string;
  // tag: string;
  // tagInfo: TagInfo;
  // score: number = 0;
  // feedback: FeedBack;
  // checkFor: string;
  // operator: string;
  // configured: boolean;
  // custom: boolean;
  // reference: string;
  // ruleId:string;
  // rules: Array<Rule> = [];
  // toleranceInfo: any;
  // changeSet: any;

  constructor(ruleType) {
    this.type = ruleType;
    this.score = 0;
    this.rules = [];
    if (ruleType === RuleType.VALIDATION) {
      delete this.rules;
    }
    this.ruleId = shortid.generate();
  }
}

export class TagInfo {
  constructor(){
    this.content = "";
    this.format = "";
  }
}

export class FeedBack {
  constructor(){
    this.successText = "";
    this.failureText = "";
    this.sysFeedback = true;
  }
}