const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        minLength: 5,
        maxLength: 255,
    },
    imageUrl: {
        type: String,
    },
    authenticationType: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isOwner: {
        type: Boolean,
        default: false,
    },
});

userInfoSchema.methods.generateAuthToken = function () {
    const option = { 
        _id: this.id, 
        isSuperAdmin: this.isSuperAdmin, 
        isAdmin: this.isAdmin, 
        isOwner: this.isOwner
    };
    const token = jwt.sign(option, config.get('jwtPrivateKey'));
    return token;
}

const UserInfo = mongoose.model('User', userInfoSchema);

const validateUserInfo = (userInfo) => {
    const Schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        authenticationType: Joi.any().valid('local', 'google', 'facebook').required(),
        password: Joi.string().min(5).max(255)
            .when('authenticationType', { is: 'local', then: Joi.required() }),
        facebookId: Joi.any()
            .when('authenticationType', { is: 'facebook', then: Joi.required() }),
        googleId: Joi.any()
            .when('authenticationType', { is: 'google', then: Joi.required() }),
        imageUrl: Joi.any()
            .when('authenticationType', { is: 'local', then: Joi.any(), otherwise: Joi.required() }),
        isSuperAdmin: Joi.boolean(),
        isAdmin: Joi.boolean(),
        isOwner: Joi.boolean(),
    };
    return Joi.validate(userInfo, Schema);
};

const validateSignInUser = (userInfo) => {
    const Schema = {
        name: Joi.any()
            .when('authenticationType', { is: 'local', then: Joi.any(), otherwise: Joi.required() }),
        email: Joi.string().min(5).max(255).required().email(),
        authenticationType: Joi.any().valid('local', 'google', 'facebook').required(),
        password: Joi.string().min(5).max(255)
            .when('authenticationType', { is: 'local', then: Joi.required() }),
        facebookId: Joi.any()
            .when('authenticationType', { is: 'facebook', then: Joi.required() }),
        googleId: Joi.any()
            .when('authenticationType', { is: 'google', then: Joi.required() }),
        imageUrl: Joi.any()
            .when('authenticationType', { is: 'local', then: Joi.any(), otherwise: Joi.required() }),
    };
    return Joi.validate(userInfo, Schema);
};

exports.userInfoSchema = userInfoSchema;
exports.UserInfo = UserInfo;
exports.validateUserInfo = validateUserInfo;
exports.validateSignInUser = validateSignInUser;
