const { Schema } = require('mongoose');
const mongooseDelete = require('mongoose-delete');

//INTERNAL
const { getDefaultDB } = require('../../infrastructures/mongoose');
const { hashText } = require('../../libs/bcrypt_helper');


const UserSchema = new Schema({
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
    },
    nameUnsigned: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    avatar: {
        type: String,
    },
    roleId: {
        type: String,
        required: true,
    },
}, { timestamps: true }, );
UserSchema.pre('save', function(next) {
    const user = this;
    user.password = hashText(user.password);
    next();
});
UserSchema.plugin(mongooseDelete, { overrideMethods: true });
module.exports = getDefaultDB().model('Users', UserSchema);