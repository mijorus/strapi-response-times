'use strict';
const { request } = require("strapi-helper-plugin");
const qs = require('qs');
const dayjs = require('dayjs');

let activeEndPoints = undefined;

module.exports = {
  /**
   * @param {Array} params - an object of additional params to merge with defaults
   */
  async getList(params = {}) {
    const defaultParams = {
      '_sort': 'created_at:DESC',
      '_limit': 30,
    }
    
    const requestParams = Object.assign(defaultParams, params);

    const response = await request('/store-response-times?' + qs.stringify(requestParams), {
      method: 'GET',
    });

    let result = [];
    if (response.length > 0) {
      response.forEach((value) => result.unshift(value))
    }

    return result;
  },
  
  /**
   * @return {Object}
   */
  async getEndPoints() {
    if (activeEndPoints === undefined) {
      const data = await request('/store-response-times/endPoints', {
        method: 'GET',
      });

      activeEndPoints = {
        response: data,
        list: (data.map((endPoint) => endPoint.value)),
      }
    }

    return activeEndPoints;
  },
  
  /**
  * @param {Object} query
  * @param {dayjs} from
  * @param {dayjs} to
  * 
  * @return request
  */
  countHits(query, from = dayjs().subtract(7, 'days'), to = dayjs()) {
    const defaultParams = {
      'from': from.unix(),
      'to': to.unix(),
    }
    
    return request('/store-response-times/count', {
      method: 'GET',
      params: Object.assign({}, defaultParams, query)
    })
  }
}