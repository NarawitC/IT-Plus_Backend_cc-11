const express = require('express');
const router = express.Router();

const {
  supplierAuthenticate,
} = require('../middlewares/supplier/authenticate');
const supplierAuthRouter = require('./supplier/supplierAuthRoutes');
const supplierRouter = require('./supplier/supplierRoutes');
const supplierProductRouter = require('./supplier/supplierProductRoutes');
const supplierPropertyRouter = require('./supplier/supplierPropertyRoutes');
const supplierOrderRouter = require('./supplier/supplierOrderRoutes');

router.use('/auth', supplierAuthRouter);
router.use('/supplier', supplierAuthenticate, supplierRouter);
router.use('/product', supplierAuthenticate, supplierProductRouter);
router.use('/property', supplierAuthenticate, supplierPropertyRouter);
router.use('/order', supplierAuthenticate, supplierOrderRouter);

module.exports = router;
