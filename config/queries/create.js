'use strict';

module.exports = {
    async save(responseLog) {
        await strapi.query('response-time', 'store-response-times')
            .create({
                url: responseLog.url,
                method: responseLog.method,
                responseTime: responseLog.responseTime,
                status: responseLog.status,
                error: responseLog.error
            });
    },
}