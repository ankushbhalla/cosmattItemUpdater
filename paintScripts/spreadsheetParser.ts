export interface SpreadsheetJson {
    activeSheet: string;
    defaults: any;
    sheets: any;
}

export function getSheetNameFromId(sheetId: string, gridJson: SpreadsheetJson) {
    for(let key in gridJson.sheets) {
        if(gridJson.sheets[key].id === sheetId) {
            return gridJson.sheets[key].name;
        }
    }
}