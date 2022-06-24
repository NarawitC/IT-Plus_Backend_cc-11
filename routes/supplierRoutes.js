const express = require('express');
const router = express.Router();

const {
  supplierAuthenticate,
} = require('../middlewares/supplier/authenticate');
const supplierAuthRouter = require('./supplier/supplierAuthRoutes');
const supplierProductRouter = require('./supplier/supplierProductRoutes');
const supplierPropertyRouter = require('./supplier/supplierPropertyRoutes');

router.use('/auth', supplierAuthRouter);
router.use('/product', supplierAuthenticate, supplierProductRouter);
router.use('/property', supplierAuthenticate, supplierPropertyRouter);


module.exports = router;
