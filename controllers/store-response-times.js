'use strict';
const randomColor = require('randomcolor');
const qs = require('qs');
const dayjs = require('dayjs');
const _ = require('lodash');

/**
 * store-response-times.js controller
 *
 * @description: A set of functions called "actions" of the `store-response-times` plugin.
 */

let activeEndPoints = undefined;

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */
  async find(ctx) {
    const fields = await strapi.query('response-time', 'store-response-times').find(ctx.query);
    return fields;
  },

  /**
   * Search for all the endpoints where the policy is in use
   * 
   * @return Array
   */
  async endPoints() {
    if (activeEndPoints === undefined) {
      activeEndPoints = [];

      for (const [api, props] of Object.entries(strapi.api)) {
        const routes = props.config.routes;
        const colors = randomColor({ count: routes.length, luminosity: 'bright', format: 'rgb' });
        
        routes.forEach((route, index) => {
          if (route.config.policies.find((policy) => policy === 'plugins::store-response-times.store')) {
            activeEndPoints.push({
              url: route.path,
              method: route.method,
              value: route.method + ' ' + route.path,
              color: colors[index],
            });
          }
        });
      }
    }

    return activeEndPoints;
  },

  /**
   * Counts the hits of the endpoints
   * 
   * @return {Object} 
   */
  async countHits({ query }) {
    const fromDate = dayjs.unix(query.from);
    const toDate = dayjs.unix(query.to);

    const diffUnit = (toDate.diff(fromDate, 'hour') > 24) ? 'day' : 'hour';

    let requestedEndPoints = [];
    query = _.omit(query, ['from', 'to']);
    
    const endPoints = await this.endPoints();

    if (_.isEmpty(query)) {
      endPoints.forEach((endPoint) => requestedEndPoints.push(endPoint));
    } else {
      requestedEndPoints.push(query);
    }

    let response = [];
    for (const endPoint of requestedEndPoints) {
      const { color } = endPoints.find((el) => {
        return (el.url === endPoint.url && el.method === endPoint.method);
      });

      let data = [];
      for (let index = toDate.diff(fromDate, diffUnit) - 1; index >= 0; index--) {
        const q = _.omit(endPoint, ['color', 'value']);

        const currentDate = toDate.subtract(index, diffUnit).toISOString();
        const hits = await strapi.query('response-time', 'store-response-times').count({
          'created_at_gt': toDate.subtract(index + 1, diffUnit).toISOString(),
          'created_at_lt': currentDate,
          ...q,
        });

        data.push({ date: currentDate, hits: hits, ...q, color: color});
      }

      response.push(data)
    }

    return response;
  },

};