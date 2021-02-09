'use strict';

module.exports = {
  endPointsQuery(selection) {
    if (!selection || selection === '') {
      return '';
    }

    return {
      '_where': [{
        'method': selection.method,
        'url': selection.url,
      }]
    };
  }
}