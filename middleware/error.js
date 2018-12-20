const logger = require('../helper/logger');

module.exports = (err, req, res, next) => {
  logger.error(err);
  const error = {
    message: err.message,
    track: err,
  };
  return res.status(500).json({ success: false, message: 'Internal server error.', data: error });
};
