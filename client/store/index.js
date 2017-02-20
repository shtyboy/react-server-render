if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
  module.exports = require('./store.prod')
} else {
  module.exports = require('./store.dev')
}
