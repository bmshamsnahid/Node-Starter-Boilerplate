const config = require('config');
require('dotenv').config();
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());

  const jwtPrivateKey = process.env.jwtPrivateKey || config.get('jwtPrivateKey');
  const dbAddress = process.env.dbAddress || config.get('dbAddress');
  const port = process.env.port || config.get('port');

  if (!jwtPrivateKey) {
    throw new Error('Missing jwtPrivateKey config value.');
  }
  if (!dbAddress) {
    throw new Error('Missing dbAddress config value.');
  }
  if (!port) {
    throw new Error('Missing port config value.');
  }
};
