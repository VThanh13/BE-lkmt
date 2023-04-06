const { Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

//INTERNAL
const { getDefaultDB } = require('../../infrastructures/mongoose');

const RoleSchema = new Schema({
    uid: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true }, );
RoleSchema.plugin(mongooseDelete, { overrideMethods: true });
module.exports = getDefaultDB().model('Roles', RoleSchema);