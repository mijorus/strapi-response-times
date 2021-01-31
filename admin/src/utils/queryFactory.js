'use strict';

module.exports = {
    endPointsQuery(selection) {
        if (selection === '') {
            return selection
        } else {
            const params = selection.split(' ');
            return {
                '_where': [{
                    'method': params[0],
                    'url': params[1],
                }]
            }
        }
    }
}