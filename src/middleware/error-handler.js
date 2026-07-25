const { NODE_ENV } = require('../config')

module.exports = function errorHandler(error, req, res, next) {
  const status = error.status || 500
  const response = (NODE_ENV === 'production' && status === 500)
    ? { error: 'Server error' }
    : (console.error(error), { error: error.message, details: error })

  res.status(status).json(response)
}
