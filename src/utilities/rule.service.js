import {Rule, RuleTags} from "./rule.model"

export function distributeTotalScoreEqually(totalScore, scoringRules) {
    let rulesArray = scoringRules;
    totalScore = Number(totalScore);
    distributeScoreEqually(totalScore, rulesArray);
    rulesArray.forEach((item) => {
        let rulesArray = item.rules;
        let totalScore = Number(item.score);
        distributeScoreEqually(totalScore, rulesArray);
        if (item.tag == RuleTags.GROUP) {
            rulesArray.forEach((item) => {
                let rulesArray = item.rules;
                let totalScore = Number(item.score);
                distributeScoreEqually(totalScore, rulesArray);
            })
        }
    });
}

function distributeScoreEqually(totalScore, rulesArray) {
    let totalRows = 0;
    rulesArray.forEach(function (item) {
        if (item.configured) totalRows++;
    });
    var avgScore = Math.floor(totalScore / totalRows);
    var totalAvgScore = avgScore * totalRows;
    var avgScoreCount = totalRows - (totalScore - totalAvgScore);
    var avgIndex = 0;
    rulesArray.reduce(function (acc, item, index) {
        if (item.configured) {
            rulesArray[index].score = (avgIndex >= avgScoreCount) ? avgScore + 1 : avgScore;
            avgIndex++;
        }
        else {
            rulesArray[index].score = rulesArray[index].score === 0 ? 0 : rulesArray[index].score;
        }
    }, 0);
}