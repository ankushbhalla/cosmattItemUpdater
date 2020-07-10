const fs = require('fs');
const PresentationJSONConverter = require('../dist/presentation-json-converter');
const QuestionJSONConverter = require('../dist/question-json-converter');
const SourceDestinationPathData = require('../dist/source-destination-paths');

class JsonUpdatorWrapper {

    convertLeoJSON(sourceFolderPath, destinationFolderPath) {
        let wrapperRef = new JsonUpdatorWrapper();
        if(!fs.existsSync(destinationFolderPath)){
            fs.mkdirSync(destinationFolderPath);
        }
        fs.readdir(sourceFolderPath, (err, files) => {
            files.forEach(file => {
                fs.readFile(sourceFolderPath+file, 'utf8', function (err, data) {
                    if (err) throw err;
                    let jsonData = JSON.parse(data);
                    if (jsonData.options && jsonData.options.data && jsonData.options.data.meta && jsonData.options.data.meta
                        && jsonData.options.data.meta.type === 'presentation') {
                        let convertedPresentationJSON = wrapperRef.updatePresentationLeoJSON(jsonData);
                        fs.writeFile(destinationFolderPath+file, convertedPresentationJSON , function (err) {
                            if (err) throw err;
                          });
                    } else if (jsonData.meta && jsonData.meta.type && jsonData.meta.type === 'question') {
                        let convertedQuestionJSON = wrapperRef.updateQuestionLeoJSON(jsonData);
                        fs.writeFile(destinationFolderPath+file, convertedQuestionJSON , function (err) {
                            if (err) throw err;
                          });
                    }
                });
            });
        });
    }

    updatePresentationLeoJSON(presentationJSON) {
        let presentationJSONUpdatorRef = new PresentationJSONConverter.PresentationJSONConverter();
        let updatedJSON = presentationJSONUpdatorRef.getUpdatedPresentationJSON(presentationJSON);
        return JSON.stringify(updatedJSON);
    }

    updateQuestionLeoJSON(questionJSON) {
        let questionJSONUpdatorRef = new QuestionJSONConverter();
        let updatedJSON = questionJSONUpdatorRef.getConvertedQuestionJSON(questionJSON);
        return JSON.stringify(updatedJSON);
    }
}

(function(){
    let jsonUpdator = new JsonUpdatorWrapper();
    SourceDestinationPathData.pathData.forEach((dataObj) => {
        if(dataObj.source && dataObj.destination){
            jsonUpdator.convertLeoJSON(dataObj.source, dataObj.destination); 
        }
    });
})();