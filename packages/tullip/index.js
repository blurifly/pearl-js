'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/crane.production.js');
} else {
  module.exports = require('./cjs/crane.development.js');
}
