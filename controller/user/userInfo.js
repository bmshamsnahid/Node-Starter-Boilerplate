const { UserInfo, validateUserInfo } = require('../../model/user/userInfo');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const createUserInfo = async (req, res, next) => {
  const { error } = validateUserInfo(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  let userInfo = await UserInfo.findOne({ email: req.body.email });
  if (userInfo) return res.status(400).json({ success: false, message: 'User already registered' });

  userInfo = new UserInfo(_.pick(req.body, ['name', 'email', 'password', 'imageUrl', 'authenticationType', 'googleId', 'facebookId', 'isSuperAdmin', 'isAdmin', 'isOwner' ]));

  if (req.body.authenticationType === 'local') {
    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(userInfo.password, salt);
  }

  await userInfo.save();

  return res.status(200).json({ success: true, data: _.pick(userInfo, ['_id', 'name', 'email']) });
};

const getUserInfo = async (req, res) => {
  const userInfo = await UserInfo.findById(req.params.id);
  if (!userInfo) return res.status(400).json({ success: false, message: 'Invalid user id' });

  return res.status(200).json({ success: true, data: userInfo });
};

const getUserInfos = async (req, res) => {
  const userInfos = await UserInfo.find();

  return res.status(200).json({ success: true, data: userInfos });
};

const updateUserInfo = async (req, res) => {
  const userInfo = await UserInfo.findById(req.params.id);
  if (!userInfo) return res.status(400).json({ success: false, message: 'Invalid user id' });

  // update the user info
  // save the user info

  return res.status(200).json({ success: false, messgae: 'under development' });
};

const deleteUserInfo = async (req, res) => {
  const userInfo = await UserInfo.findByIdAndRemove(req.params.id);
  if (!userInfo) return res.status(400).json({ success: false, message: 'Invalid user id' });

  return res.status(200).json({ success: true, data: userInfo });
};

module.exports = {
  createUserInfo,
  getUserInfo,
  getUserInfos,
  updateUserInfo,
  deleteUserInfo,
};
