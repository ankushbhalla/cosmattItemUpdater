class JsonUpdatorWrapper {
    leoJSONUpdator = null;
    constructor(){
        //this.leoJSONUpdator = new window.JsonUpdator();
    }

    updatePresentationLeoJSON(){
        fetch('../../assets/leo-old-json.json')
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            this.leoJSONUpdator = new JsonUpdator();
            let updatedJSON= this.leoJSONUpdator.getUpdatedPresentationJSON(responseData);
            document.getElementById("result").innerHTML = JSON.stringify(updatedJSON);
            console.log(updatedJSON);
            return updatedJSON;
        })
    }

    updateQuestionLeoJSON(){
        fetch('../../assets/leo-question-old-json.json')
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            this.leoJSONUpdator = new QuestionJSONConverter();
            let updatedJSON= this.leoJSONUpdator.getConvertedQuestionJSON(responseData);
            document.getElementById("result").innerHTML = JSON.stringify(updatedJSON);
            console.log(updatedJSON);
            return updatedJSON;
        })
    }
}