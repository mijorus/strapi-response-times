'use strict';
const { request } = require("strapi-helper-plugin");

module.exports = {
    getList(params = {}) {
        const defaultParams = {
            '_sort': 'created_at:DESC',
            '_limit': 30,
            'method_null': false,

        }

        const requestParams = Object.assign(defaultParams, params)

        return request('/store-response-times', { 
            method: 'GET',
            params: requestParams,
        })
    },

    getEndPoints() {
        return request('/store-response-times', { 
            method: 'GET' ,
            params: {
                '_limit': 1,
                'method': null,
            }
        })
    }
}