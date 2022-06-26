const express = require('express');
const router = express.Router();

const {
  supplierAuthenticate,
} = require('../middlewares/supplier/authenticate');
const supplierAuthRouter = require('./supplier/supplierAuthRoutes');
const supplierProductRouter = require('./supplier/supplierProductRoutes');
const supplierPropertyRouter = require('./supplier/supplierPropertyRoutes');
const supplierOrderItemRouter = require('./supplier/supplierOrderItemRoutes');

router.use('/auth', supplierAuthRouter);
router.use('/product', supplierAuthenticate, supplierProductRouter);
router.use('/property', supplierAuthenticate, supplierPropertyRouter);
router.use('/order-item', supplierAuthenticate, supplierOrderItemRouter);


module.exports = router;
