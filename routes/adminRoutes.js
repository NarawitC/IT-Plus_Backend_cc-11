const express = require('express');
const router = express.Router();
const adminAuthRouter = require('./admin/adminAuthRoutes');

router.use('/auth', adminAuthRouter);

module.exports = router;
