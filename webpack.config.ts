const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      util: require.resolve('util/'),
      timers: require.resolve('timers-browserify'),
      process: require.resolve('process/browser')
    }
  }
}