const express = require('express');

const router = express.Router();
const authorize = require('../../middleware/auth');

const authenticationController = require('../../controller/auth/authentication');

router.post('/signIn', authenticationController.signIn);
router.post('/signUp', authenticationController.signUp);
router.get('/me', authorize, authenticationController.getCurrentUserInfo);

module.exports = router;
