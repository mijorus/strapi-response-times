module.exports = {
    /**
     * Promise to fetch all records
     *
     * @return {Promise}
     */
    find(params, populate) {
        return strapi.query('response-time', 'store-response-times').find(params, populate);
    },
};