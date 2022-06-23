const express = require('express');
const router = express.Router();

const supplierAuthRouter = require('./supplier/supplierAuthRoutes');

router.use('/auth', supplierAuthRouter);

module.exports = router;
