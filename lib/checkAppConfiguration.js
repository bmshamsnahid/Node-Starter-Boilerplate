const config = require('config');

module.exports = () => {
  const configValue = (process.env.configValue) ? (process.env.configValue) : config.get('configValue');
  const configValue2 = (process.env.configValue2) ? (process.env.configValue2) : config.get('configValue2');

  if (!(configValue && configValue2)) {
    process.exit(1);
  }
};
