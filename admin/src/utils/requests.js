'use strict';
const { request } = require("strapi-helper-plugin");
const qs = require('qs');
const dayjs = require('dayjs');

module.exports = {
  getList(params = {}) {
    const defaultParams = {
      '_sort': 'created_at:DESC',
      '_limit': 30,
    }
    
    const requestParams = Object.assign(defaultParams, params);
    
    return request('/store-response-times?' + qs.stringify(requestParams), { 
      method: 'GET',
    })
  },
  
  getEndPoints() {
    return request('/store-response-times/endPoints', { 
      method: 'GET',
    })
  },
  
  /**
  * @param {Object} from 
  * @param {Object} dayjs to 
  * 
  * @returns request
  */
  countHits(endpoint = '', method = '', from = {amount: 7, unit:'days'}, to = dayjs()) {
    return request('/store-response-times/count', {
      method: 'GET',
      params: {
        'endpoint': endpoint,
        'method': method,
        'from': qs.stringify(from),
        'to': to.toISOString(),
      }
    })
  }
}