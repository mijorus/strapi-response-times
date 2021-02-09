'use strict';
const { request } = require("strapi-helper-plugin");
const qs = require('qs');
const dayjs = require('dayjs');

let activeEndPoints = undefined;

module.exports = {
  /**
   * @param {Object} params - an object of additional params to merge with defaults
   */
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
  
  /**
   * @return {Object}
   */
  async getEndPoints() {
    if (!activeEndPoints) {
      let { data } = await request('/store-response-times/endPoints', {
        method: 'GET',
      });

      data = JSON.parse(data);
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
    
    const requestParams = {};
    Object.assign(requestParams, defaultParams, query);
    return request('/store-response-times/count', {
      method: 'GET',
      params: requestParams
    })
  }
}