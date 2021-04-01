'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/pearljs.production');
} else {
  module.exports = require('./cjs/pearljs.development');
}
