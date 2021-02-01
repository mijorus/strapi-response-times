'use strict';

module.exports = {
    endPointsQuery(selection) {
        if (selection === '') {
            return selection
        } else {
            return {
                '_where': [{
                    'method': selection.method,
                    'url': selection.path,
                }]
            }
        }
    }
}