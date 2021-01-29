'use strict';
const _ = require('lodash');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async refresh(data) {
    const results = await strapi.query('response-time', 'store-response-times')
      .find({ status: null });

    const entity = _.first(results) || null;
    const record = { url: data.endPoints };

    if (!entity) {
      await strapi.query('response-time', 'store-response-times').create(record);
    } else {
      await strapi.query('response-time', 'store-response-times').update({ id: entity.id }, record);
    }
  }
};
