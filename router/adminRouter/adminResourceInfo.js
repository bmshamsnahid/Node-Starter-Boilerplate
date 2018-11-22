const express = require('express');
const router = express.Router();
const adminResourceController = require('../../controller/adminResource/adminResourceInfo');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.get('/', auth, admin, adminResourceController.testAdminResourceInfo);

module.exports = router;
