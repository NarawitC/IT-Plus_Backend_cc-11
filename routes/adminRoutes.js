const express = require('express');
const router = express.Router();

const adminAuthController = require('./admin/adminAuthRoutes');

router.use('/auth', adminAuthController);

module.exports = router;
