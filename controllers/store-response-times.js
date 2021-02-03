'use strict';
const randomColor = require('randomcolor');
const qs = require('qs');
const dayjs = require('dayjs');

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
      const apis = strapi.api;

      for (const [api, props] of Object.entries(apis)) {
        const routes = props.config.routes;
        const colors = randomColor({ count: routes.length, luminosity: 'bright', format: 'rgb' });
        routes.forEach((route, index) => {
          const policies = route.config.policies;
          if (policies.find((policy) => policy === 'plugins::store-response-times.store')) {
            activeEndPoints.push({
              path: route.path,
              method: route.method,
              value: route.method + ' ' + route.path,
              color: colors[index],
            });
          }
        });
      }
    }

    return {
      statusCode: 200,
      data: JSON.stringify(activeEndPoints),
    }    
  },

  /**
   * Counts the hits of the endpoints
   * 
   * @return {Object} 
   */
  async count({ query }) {
    const fromDate = qs.parse(query.from);
    const toDate = dayjs(query.to);
    
    let responseArray = [];
    for (let index = 0; index < fromDate.amount; index++) {
      const currentDate = toDate.subtract(index, fromDate.unit).toISOString();

      const hits = await strapi.query('response-time', 'store-response-times').count({
        'created_at_gt': toDate.subtract(index + 1, fromDate.unit).toISOString(),
        'created_at_lt': currentDate,
        // 'method': query.method,
        // 'url': query.endpoint
      });

      responseArray.push({ date: currentDate, hits: hits });
    }

    return responseArray;
  },

};