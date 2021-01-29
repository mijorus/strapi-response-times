'use strict';

module.exports = () => {
    // Search for endpoint where the plugin policy is in use
    const apis = strapi.api;
    let activeEndPoints = [];

    for (const [api, props] of Object.entries(apis)) {
        const routes  = props.config.routes;
        routes.forEach((route) => {
            const policies = route.config.policies;
            if (policies.find((policy) => policy === 'plugins::store-response-times.store')) {
                activeEndPoints.push({ 
                    route: route.path, 
                    method: route.method 
                });
            }
        });
    }

    const data = JSON.stringify(activeEndPoints);
    strapi.plugins['store-response-times'].services['active-end-points'].refresh({ endPoints: data });
}