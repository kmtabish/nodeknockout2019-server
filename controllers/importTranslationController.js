const insertTranslation = (req, res, next) => {
	console.log(req.body)
	validateTranslation.importTranslation(req.body, (data)=>{
			res.send({"Status":"Successfully Inerted", item: data.length})
		},(error)=>{
			res.send({"Status":"Error in data insertion", error: error})
		});
	// 	console.log("LLLLLL11111",translationFile)
	// 	translationFile.then((successInfo) =>{
	// 	res.send(successInfo)
	// }).catch((errInfo) =>{
	// 	res.send(errInfo)
	// })
}

const removeTranslation = (req, res, next) => {
    const translationFile = validateTranslation.removeTranslation();
    translationFile.then((successInfo) =>{
		res.send(successInfo)
	}).catch((errInfo) =>{
		res.send(errInfo)
	})
}

const translationProcessController = {
	insertTranslation,
	removeTranslation
}

module.exports = function(cfg) {
	if (typeof cfg === 'undefined') {
		throw new Error('No config object passed to router.');
	} else if (typeof cfg.models === 'undefined') {
		throw new Error('No models passed to router.');
	} else if (typeof cfg.config === 'undefined') {
		throw new Error('No config passed to router.');
	}

	validateTranslation = require('../services/importTranslationService')(cfg);
	return translationProcessController;
};
