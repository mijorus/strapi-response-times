'use strict';

module.exports = {
    endPointsQuery(selection) {
        if (!selection || selection === '') {
            return ''
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