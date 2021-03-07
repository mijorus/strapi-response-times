'use strict';
const { request } = require("strapi-helper-plugin");
const qs = require('qs');
const dayjs = require('dayjs');

let activeEndPoints = undefined;

module.exports = {
  
  /**
   * Gets the response timesof the requested end points
   * 
   * @param {Object} params 
   */
  async getResponseTimesList(params = {}) {
    const response = await request('/store-response-times?' + qs.stringify(
      Object.assign({
        '_sort': 'created_at:DESC',
        '_limit': 40,
      }, params)
    ),  { method: 'GET' });

    return response.reverse();
  },
  
  /**
   * Gets the endpoint list
   * 
   */
  async getEndPoints() {
    if (activeEndPoints === undefined) {
      activeEndPoints = await request('/store-response-times/endPoints', {
        method: 'GET',
      });
    }

    return activeEndPoints;
  },
  
  /**
   * Counts the number of hits for the selected endpoint
   * in the requested timerange
   * 
  * @param {Object} query
  * @param {dayjs} from
  * @param {dayjs} to
  * 
  * @return request
  */
  countHits(query, from = dayjs().subtract(7, 'days'), to = dayjs()) {
    return request('/store-response-times/countHits', {
      method: 'GET',
      params: {
        from: from.unix(),
        to: to.unix(),
        _q: qs.stringify(query)
      }
    });
  }
}