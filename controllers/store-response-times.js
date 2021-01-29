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

  async find(ctx) {
    const fields = await strapi.query('response-time', 'store-response-times').find(ctx.query);

    return fields.map(field => sanitizeEntity(field, { model: strapi.plugins['store-response-times'].models['response-time'] }));;
  }
};