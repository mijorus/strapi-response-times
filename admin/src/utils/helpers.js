'use strict'

module.exports = {
  getRGBvalues(color) {
    return (/\(([^)]+)\)/.exec(color))[1]
  }
}