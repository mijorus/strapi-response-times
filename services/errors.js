'use strict';

/**
 * store-response-times.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
    isError(statusCode) {
        if (statusCode >= 400 && statusCode < 600) {
            return true;
        } else {
            return false;
        }
    },
};
