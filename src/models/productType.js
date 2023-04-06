'use strict';
/**
 * @typedef {import("mongoose").Document} Document
 */
const mongoose = require('mongoose');

//INTERNAL
const Base = require('./base');
const { Utils } = require('../libs/utils');

class ProductType extends Base {
    constructor() {
        super();
        /** @type {String} */
        this.uid = undefined;
        /** @type {String} */
        this.code = undefined;
        /** @type {String} */
        this.name = undefined;
        /** @type {String} */
        this.nameUnsigned = undefined;
        /** @type {String} */
        this.status = undefined;
        /** @type {String} */
    }
    static fromMongo(input) {
        if (input == null || input instanceof mongoose.Types.ObjectId) {
            return null;
        }
        const output = new ProductType();
        if (input != null) {
            output.uid = input.uid;
            output.code = input.code;
            output.name = input.name;
            output.nameUnsigned = input.nameUnsigned;
            output.status = input.status;
            output.image = input.image;
            output.createdAt = input.createdAt;
            output.updatedAt = input.updatedAt;
        }
        return output;
    }
    static toMongo(input) {
        // eslint-disable-next-line no-unused-vars
        const { includedFields, ...Product } = input;
        return Product;
    }
    static fromRequest(input) {
        const output = new ProductType();
        if (input != null) {
            output.uid = Utils.getString(input.uid, '');
            output.code = Utils.getString(input.code, '');
            output.name = Utils.getString(input.name, '');
            output.nameUnsigned = Utils.getString(Utils.tvkd(input.name), '');
            output.status = Utils.getBoolean(input.status, true);
            output.includedFields = Utils.extractIncludeAttributes(
                input.includedFields,
            );
        }
        output.name = output.name.trim().replace(/\s\s+/g, ' ');
        output.nameUnsigned = output.nameUnsigned.trim().replace(/\s\s+/g, ' ');
        return output;
    }
    static fromUpdateProductType(input) {
        const output = {};
        if (input != null) {
            output.code = Utils.getString(input.code, '');
            output.name = Utils.getString(input.name, '');
            output.nameUnsigned = Utils.getString(Utils.tvkd(input.name), '');
            output.status = Utils.getBoolean(input.status, true);
        }
        output.name = output.name.trim().replace(/\s\s+/g, ' ');
        output.nameUnsigned = output.nameUnsigned.trim().replace(/\s\s+/g, ' ');
        return output;
    }
    static fromUpdateStatusProductType(input) {
        const output = {};
        if (input != null) {
            output.status = Utils.getBoolean(input.status, false);
        }
        return output;
    }
    static searchProductType(input) {
        const output = {};
        output.code = !input.code ? null : input.code.trim();
        output.name = !input.name ?
            null :
            Utils.tvkd(input.name.trim().replace(/\s\s+/g, ' '));
        output.status = !input.status ? null : input.status.trim();
        output.limit = input.limit || '10';
        output.limit = Number.parseInt(output.limit, 10);
        output.page = input.page || '1';
        output.page = Number.parseInt(output.page, 10);
        if (Number.isNaN(output.page) || Number.isNaN(output.limit)) {
            output.limit = 100;
            output.page = 1;
        }
        return output;
    }
}
module.exports = ProductType;