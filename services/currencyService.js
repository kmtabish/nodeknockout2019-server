const getCurrency = () =>{
    return models.CCCurrentImport.find({})
    .then((data) => {
        return {msg: "successfully retrived data", data: data}
    }).catch((err) => {
        return {msg: "Error in getting data", error: err}
    })
}

const setCurrency = (bodypayload, res) =>{
	const objectKeys = Object.keys(bodypayload);
	 objectKeys.map((key, index) => {
		models.CCCurrentImport.updateMany({"translationKey": key},
		{$set: {"translationValue": bodypayload[key]}})
   		 .then((data) => {
			if(index == objectKeys.length-1){
				models.CCCurrentImport.find({})
				.then((data) => {
					res.send ({msg: "successfully updated data", data: data})
				}).catch((err) => {
					res.send ({msg: "Error in getting data", error: err})
				})
			}
			// res.send({msg: "successfully updated data", data: data})
    	}).catch((err) => {
    	    res.send({msg: "Error in updating data", error: err})
    	})
	})
}

const currencyService = {
	getCurrency,
	setCurrency
}

module.exports = function(cfg) {
	if (typeof cfg === 'undefined') {
		throw new Error('No config object passed to router.');
	} else if (typeof cfg.models === 'undefined') {
		throw new Error('No models passed to router.');
	} else if (typeof cfg.config === 'undefined') {
		throw new Error('No config passed to router.');
	}
	models = cfg.models;
	return currencyService;
};