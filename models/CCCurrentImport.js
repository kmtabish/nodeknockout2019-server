const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CCCurrentImport = new Schema({
	"From_Currency_Code":  { type: String, required: true},
	"From_Currency_Name": { type: String, required: true },
	"To_Currency_Code": { type: String  },
    "To_Currency_Name": { type: String, default: 'true' },
    "Exchange_Rate": {type: String, default: Date.now},
    "Last_Refreshed": {type: String, default: Date.now},
	"Time_Zone": {type: String, default: 'system'},
	"Bid_Price": {type: String, default: 'system'},
	"Ask_Price": {type: String, default: 'system'}
},{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	collection: 'CCCurrentImport'
});


module.exports = mongoose.model('CCCurrentImport', CCCurrentImport);