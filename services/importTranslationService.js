var https = require('https');

const validateTranslation = () => {
    return translationFile;
}
const removeTranslation = () =>{
    return models.CCCurrentImport.deleteMany({})
        .then ((data) => {
            return {msg: "Success: Deleted Translation Data", data: data};
        }).catch((err)=>{
            return {msg: "Error in delete Translation Data", error: err};
        })
}

const importData = (translationData) =>{
    const parsedCCData = JSON.parse(translationData)['Realtime Currency Exchange Rate'];
    const cleanedData = {
        'From_Currency_Code': parsedCCData['1. From_Currency Code'],
        'From_Currency_Name': parsedCCData['2. From_Currency Name'],
        'To_Currency_Code': parsedCCData['3. To_Currency Code'],
        'To_Currency_Name': parsedCCData['4. To_Currency Name'],
        'Exchange_Rate': parsedCCData['5. Exchange Rate'],
        'Last_Refreshed': parsedCCData['6. Last Refreshed'],
        'Time_Zone': parsedCCData['7. Time Zone'],
        'Bid_Price': parsedCCData['8. Bid Price'],
        'Ask_Price': parsedCCData['9. Ask Price'],
    }

    return models.CCCurrentImport.insertMany([cleanedData])
    .then(function(docs) {
        return {msg: "Success: Inserted Translation Data", data: docs.length};
    })
    .catch(function(err) {
        return {msg: "Error in Insert Translation Data", error: err.errmsg}
    });
}
const importTranslation = (param, successCB, errorCB) => {
    var options = {
        host: "www.alphavantage.co",
        path: '/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+param.from_currency+'&to_currency='+param.to_currency+'&apikey=Z921XEGT021B37ME',
        method: 'GET'
      };
    const req = https.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
          successCB(chunk);
          return importData(chunk);
        });
      })
      req.on('error', (e) => {
        errorCB(e.message)
        console.error(e.message);
      });
      req.end();
    // return importData();
    // const rawFile = validateTranslation();
    // const objectifyingData = Object.entries(rawFile)
    // let translationData = [];
    // objectifyingData.forEach((value, index) => {
    //     translationData.push({translationKey: value[0], translationValue: value[1], seqNo: 101+index})
    // })
    // return importData(translationData);
}

const processFile = {
    importTranslation,
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
    // translationFile = require('../assets/en.json')
    translationFile = {}
	models = cfg.models;
	return processFile;
};
