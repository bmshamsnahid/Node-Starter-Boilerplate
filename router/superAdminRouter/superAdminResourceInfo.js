const express = require('express');

const router = express.Router();
const superAdminResourceController = require('../../controller/superAdminResource/superAdminResourceInfo');
const auth = require('../../middleware/auth');
const superAdmin = require('../../middleware/superAdmin');

router.get('/', auth, superAdmin, superAdminResourceController.testSuperAdminResourceInfo);

module.exports = router;
