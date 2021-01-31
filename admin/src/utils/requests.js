'use strict';
const { request } = require("strapi-helper-plugin");
const qs = require('qs');

module.exports = {
    getList(params = {}) {
        const defaultParams = {
            '_sort': 'created_at:DESC',
            '_limit': 30,
        }

        const requestParams = Object.assign(defaultParams, params);

        return request('/store-response-times?' + qs.stringify(requestParams), { 
            method: 'GET',
        })
    },

    getEndPoints() {
        return request('/store-response-times/endPoints', { 
            method: 'GET',
        })
    }
}