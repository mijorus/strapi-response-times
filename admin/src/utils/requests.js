'use strict';
const { request } = require("strapi-helper-plugin");

module.exports = {
    getList(limit) {
        return request('/store-response-times', { 
            method: 'GET',
            params: {
                '_sort': 'created_at:DESC',
                '_limit': limit,
            }
        })
    }
}