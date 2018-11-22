const bcrypt = require('bcrypt');
const { UserInfo, validateSignInUser, validateUserInfo } = require('../../model/user/userInfo');
const userInfoService = require('../../service/user/userInfo');
const _ = require('lodash');

const signUp = async (req, res, next) => {
    const { error } = validateUserInfo(req.body);
    console.log('Validation error: ');
    console.log(error);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    let userInfo = await UserInfo.findOne({ email: req.body.email });
    if (userInfo) return res.status(400).json({ success: false, message: 'User already registered' });

    userInfo = new UserInfo(_.pick(req.body, ['name', 'email', 'password', 'authenticationType']));

    const salt = await bcrypt.genSalt(10);
    userInfo.password = await bcrypt.hash(userInfo.password, salt);
    await userInfo.save();

    const token = userInfo.generateAuthToken();
    return res.status(200).json({ success: true, token: token, data: _.pick(userInfo, ['_id', 'name', 'email']) });
};

const getCurrentUserInfo = async (req, res, next) => {
    const userInfo = await UserInfo.findById(req.userInfo._id).select('-password -_v');
    return res.status(200).json({ success: true, data: userInfo });
};

const signIn = async (req, res, next) => {
    const { error } = validateSignInUser(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const userInfo = await UserInfo.findOne({ email: req.body.email });

    if (req.body.authenticationType === 'local') {
        if (!userInfo) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(req.body.password, userInfo.password);
        if (!validPassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const token = userInfo.generateAuthToken();

        return res.status(200).json({ success: true, data: token });
    } else if (req.body.authenticationType === 'facebook' || req.body.authenticationType) {
        if (!userInfo) {
            const result = await userInfoService.createUserInfo(req);
            if (result.error) return res.status(400).json({ success: false, message: result.error });
            const newUserInfo = result.data;
            const token = newUserInfo.generateAuthToken();
            return res.status(200).json({ success: true, data: token });
        } else {
            const token = userInfo.generateAuthToken();
            return res.status(200).json({ success: true, token: token });
        }
    }
};

module.exports = {
    signIn,
    signUp,
    getCurrentUserInfo,
}
