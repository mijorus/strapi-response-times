'use strict';
const randomColor = require('randomcolor');
const _ = require('lodash');

module.exports = async () => {
  const pluginPolicy = 'plugins::store-response-times.store';
  const data = await strapi.query('active-end-points', 'store-response-times').find({ _limit: 1 });
  const activeEndPoints = data[0].activeEndPoints.list;

  // let missingEndPoints = [];
  // for (const [api, props] of Object.entries(strapi.api)) {
  //   const routes = props.config.routes;
  //   const colors = randomColor({ count: routes.length, luminosity: 'bright', format: 'rgb' });

  //   routes.forEach((route, index) => {
  //     if (route.config.policies.find((policy) => policy === pluginPolicy)) {
  //       const value = route.method + ' ' + route.path;
  //       const values = _.map(data.activeEndPoints, 'value');

  //       if (!_.includes(values, value)) {
  //         missingEndPoints.push({
  //           url: route.path,
  //           method: route.method,
  //           value: value,
  //           color: colors[index],
  //         });
  //       }
        
  //     }
  //   });
  // }

  // data.concat(missingEndPoints);
  // const entity = _.first(data) || null;
  // if (entity) {
  //   await strapi.query('active-end-points', 'store-response-times').update({ id: entity.id }, data);
  // } else {
  //   await strapi.query('active-end-points', 'store-response-times').create(data);
  // }
}