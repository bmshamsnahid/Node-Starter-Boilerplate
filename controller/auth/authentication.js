const bcrypt = require('bcrypt');
const _ = require('lodash');

const { UserInfo, validateSignInUser, validateUserInfo } = require('../../model/user/userInfo');
const userInfoService = require('../../service/user/userInfo');

const signUp = async (req, res) => {
  const { error } = validateUserInfo(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  let userInfo = await UserInfo.findOne({ email: req.body.email });
  if (userInfo) return res.status(400).json({ success: false, message: 'User already registered' });

  userInfo = new UserInfo(_.pick(req.body, ['name', 'email', 'password', 'authenticationType']));

  const salt = await bcrypt.genSalt(10);
  userInfo.password = await bcrypt.hash(userInfo.password, salt);
  await userInfo.save();

  const token = userInfo.generateAuthToken();
  return res.status(200).json({ success: true, token, data: _.pick(userInfo, ['_id', 'name', 'email']) });
};

const getCurrentUserInfo = async (req, res) => {
  const currentUserId = req.userInfo._id;
  const userInfo = await UserInfo.findById(currentUserId).select('-password -_v');
  return res.status(200).json({ success: true, data: userInfo });
};

const signIn = async (req, res) => {
  const { error } = validateSignInUser(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const userInfo = await UserInfo.findOne({ email: req.body.email });

  if (req.body.authenticationType === 'local') {
    if (!userInfo) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(req.body.password, userInfo.password);
    if (!validPassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = userInfo.generateAuthToken();

    return res.status(200).json({ success: true, data: token });
  }

  if (req.body.authenticationType === 'facebook' || req.body.authenticationType) {
    if (!userInfo) {
      const result = await userInfoService.createUserInfo(req);
      if (result.error) return res.status(400).json({ success: false, message: result.error });
      const newUserInfo = result.data;
      const token = newUserInfo.generateAuthToken();
      return res.status(200).json({ success: true, data: token });
    }
    const token = userInfo.generateAuthToken();
    return res.status(200).json({ success: true, token });
  }

  return res.status(200).json({ success: false, message: 'Authentication error.' });
};

module.exports = {
  signIn,
  signUp,
  getCurrentUserInfo,
};
