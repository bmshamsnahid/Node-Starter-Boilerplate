const express = require('express');

const router = express.Router();
const ownerResourceController = require('../../controller/ownerResource/ownerResourceInfo');
const auth = require('../../middleware/auth');
const owner = require('../../middleware/owner');

router.get('/', auth, owner, ownerResourceController.testOwnerResourceInfo);

module.exports = router;
