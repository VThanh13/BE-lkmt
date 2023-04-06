const { Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

//INTERNAL
const { getDefaultDB } = require('../../infrastructures/mongoose');


const BrandSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    nameUnsigned: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true }, );
BrandSchema.plugin(mongooseDelete, { overrideMethods: true });
module.exports = getDefaultDB().model('Brands', BrandSchema);