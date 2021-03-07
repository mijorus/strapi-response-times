'use strict';
const { performance } = require('perf_hooks');

/**
 * `store-response-time` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  // console.log('In store-response-time policy.');

  // Get the current timestamp in ms
  const start = performance.now();

  // Pause the execution until the request logic is compleated
  await next()
    .then(() => {
      const request = ctx.request;
      const delta = Math.ceil(performance.now() - start);
      const plugin = strapi.plugins['store-response-times'];

      const responseLog = {
        url: request.url,
        method: request.method,
        responseTime: delta,
        status: ctx.response.status,
        error: plugin.services.errors.isError(this.status)
      };

      strapi.query('response-time', 'store-response-times').create(...responseLog);
    })
}