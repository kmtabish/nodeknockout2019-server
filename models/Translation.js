const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translationImport = new Schema({
	seqNo:  { type: Number, required: true },
	translationKey: { type: String, required: true, unique: true },
	translationValue: { type: String  },
    enabled: { type: String, default: 'true' },
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now},
    lastUpdateBy: {type: String, default: 'system'}
},{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	collection: 'translationImport'
});


module.exports = mongoose.model('TranslationImport', translationImport);