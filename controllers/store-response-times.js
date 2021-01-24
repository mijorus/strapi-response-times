'use strict';
const { sanitizeEntity } = require("strapi-utils");
/**
 * store-response-times.js controller
 *
 * @description: A set of functions called "actions" of the `store-response-times` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  find: async (ctx) => {
    const { find } = strapi.plugins['store-response-times'].services.find
    const fields = await find(ctx.query);

    return fields.map(field => sanitizeEntity(field, { model: strapi.plugins['store-response-times'].models['response-time'] }));;
  }
};