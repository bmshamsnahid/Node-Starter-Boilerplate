const bcrypt = require('bcrypt');
const _ = require('lodash');
const { UserInfo, validateUserInfo } = require('../../model/user/userInfo');

const createUserInfo = async (req) => {
  const { error } = validateUserInfo(req.body);
  if (error) {
    return {
      error: error.details[0].message,
      data: null,
    };
  }

  let userInfo = await UserInfo.findOne({ email: req.body.email });
  if (userInfo) {
    return {
      error: 'user already registered',
      data: null,
    };
  }

  userInfo = new UserInfo(_.pick(req.body, ['name', 'email', 'password', 'imageUrl', 'authenticationType', 'googleId', 'facebookId', 'isSuperAdmin', 'isAdmin', 'isOwner' ]));

  if (req.body.authenticationType === 'local') {
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(userInfo.password, salt);
  }

  await userInfo.save();

  return {
    error: null,
    data: userInfo,
  };
};

module.exports = {
  createUserInfo,
};
