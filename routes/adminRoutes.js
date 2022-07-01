const express = require('express');
const router = express.Router();

const { adminAuthenticate } = require('../middlewares/admin/authenticate');
const adminAuthRouter = require('./admin/adminAuthRoutes');
const adminProductRouter = require('./admin/adminProductRoutes');
const adminCategoryRouter = require('./admin/adminCategoryRoutes');
const adminSubCategoryRouter = require('./admin/adminSubCategoryRoutes');
const adminClientRouter = require('./admin/adminClientRoutes');
const adminOrderRouter = require('./admin/adminOrderRoutes');
const adminSupplierRouter = require('./admin/adminSupplierRoutes');
const adminRouter = require('./admin/adminRoutes');

router.use('/auth', adminAuthRouter);
router.use('/product', adminAuthenticate, adminProductRouter);
router.use('/category', adminAuthenticate, adminCategoryRouter);
router.use('/sub-category', adminAuthenticate, adminSubCategoryRouter);
router.use('/client', adminAuthenticate, adminClientRouter);
router.use('/supplier', adminAuthenticate, adminSupplierRouter);
router.use('/order', adminAuthenticate, adminOrderRouter);
router.use('/admin', adminAuthenticate, adminRouter);

module.exports = router;
