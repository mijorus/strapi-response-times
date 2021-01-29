'use strict';
const { sanitizeEntity } = require("strapi-utils");

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

  async endPoints() {
    // Search for endpoint where the plugin policy is in use
    if (activeEndPoints === undefined) {
      activeEndPoints = [];
      const apis = strapi.api;

      for (const [api, props] of Object.entries(apis)) {
        const routes = props.config.routes;
        routes.forEach((route) => {
          const policies = route.config.policies;
          if (policies.find((policy) => policy === 'plugins::store-response-times.store')) {
            activeEndPoints.push({
              route: route.path,
              method: route.method
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
};