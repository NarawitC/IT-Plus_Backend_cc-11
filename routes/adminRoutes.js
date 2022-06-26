const express = require('express');
const router = express.Router();

const { adminAuthenticate } = require('../middlewares/admin/authenticate');
const adminAuthController = require('./admin/adminAuthRoutes');
const adminProductController = require('./admin/adminProductRoutes');
const adminCategoryController = require('./admin/adminCategoryRoutes');
const adminSubCategoryController = require('./admin/adminSubCategoryRoutes');
const adminClientController = require('./admin/adminClientRoutes');

router.use('/auth', adminAuthController);
router.use('/product', adminAuthenticate, adminProductController);
router.use('/category', adminAuthenticate, adminCategoryController);
router.use('/sub-category', adminAuthenticate, adminSubCategoryController);
router.use('/client', adminAuthenticate, adminClientController);

module.exports = router;
