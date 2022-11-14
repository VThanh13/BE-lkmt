'use strict';
/**
 * @typedef {import("./policy")} PolicyService
 * @typedef {import("../data/customer_repository")} customerRepository
 * @typedef {import("../data/product_repository")} productRepository
 * @typedef {import("../data/order_repository")} orderRepository
 */
const { defaultsDeep } = require('lodash');
const { ulid } = require('ulid');
const { ErrorModel } = require('../models');
const { ERROR, ROUTE, LOGS } = require('../constants');
const { Utils } = require('../libs/utils');
const moment = require('moment');
const Customer = require('../models/customer');

const defaultOpts = {};
class CustomerService {
  /**
   *
   * @param {*} opts
   * @param {PolicyService} policy
   * @param {customerRepository} repo
   * @param {productRepository} repoProduct
   * @param {orderRepository} repoOrder
   */
  constructor(opts, policy, repo, repoProduct, repoOrder) {
    /** @type {defaultOpts} */
    this.opts = defaultsDeep(opts, defaultOpts);
    this.policy = policy;
    this.repo = repo;
    this.repoProduct = repoProduct;
    this.repoOrder = repoOrder;
  }
  async create(data) {
    data.code = await this.repo.generateCode();
    data.uid = ulid();
    data.dateOfBirth = moment(new Date(data.dateOfBirth)).format('YYYY/MM/DD');
    const output = await this.repo.createOne(data);
    return output;
  }
  async updateCustomer(msg) {
    const { uid, data } = msg;
    data.dateOfBirth = moment(new Date(data.dateOfBirth)).format('YYYY/MM/DD');
    const findCustomer = await this.repo.findOne('uid', uid);
    if (!findCustomer) {
      throw ErrorModel.initWithParams({
        ...ERROR.VALIDATION.NOT_FOUND,
      });
    }
    const output = await this.repo.updateCustomerById(msg);
    return output;
  }
  async viewCustomerById(uid) {
    const findCustomer = await this.repo.findOne('uid', uid);
    if (!findCustomer) {
      throw ErrorModel.initWithParams({
        ...ERROR.VALIDATION.NOT_FOUND,
      });
    }
    return findCustomer;
  }
  async deleteCustomerById(uid) {
    const findCustomer = await this.repo.findOne('uid', uid);
    if (!findCustomer) {
      throw ErrorModel.initWithParams({
        ...ERROR.VALIDATION.NOT_FOUND,
      });
    }
    try {
      await this.repo.deleteCustomerById(uid);
      return true;
    } catch (error) {
      return false;
    }
  }
  async updateStatusCustomer(msg) {
    const { uid, data } = msg;
    const findCustomer = await this.repo.findOne('uid', uid);
    if (!findCustomer) {
      throw ErrorModel.initWithParams({
        ...ERROR.VALIDATION.NOT_FOUND,
      });
    }
    const output = await this.repo.updateCustomerById(msg);
    return output;
  }
  async searchCustomer(data) {
    const output = await this.repo.search(data);
    return output;
  }
}
module.exports = CustomerService;
