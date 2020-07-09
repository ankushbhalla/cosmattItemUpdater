class JsonUpdatorWrapper {
    leoJSONUpdator = null;

    updatePresentationLeoJSON(){
        fetch('../../assets/leo-old-presentation-json.json')
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            this.leoJSONUpdator = new PresentationJSONConverter();
            let updatedJSON= this.leoJSONUpdator.getUpdatedPresentationJSON(responseData);
            document.getElementById("result").innerHTML = JSON.stringify(updatedJSON);
            console.log(updatedJSON);
            return updatedJSON;
        })
    }

    updateQuestionLeoJSON(){
        fetch('../../assets/leo-old-question-json.json')
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