export function getSheetNameFromId(sheetId, gridJson) {
    for(let key in gridJson.sheets) {
        if(gridJson.sheets[key].id === sheetId) {
            return gridJson.sheets[key].name;
        }
    }
}