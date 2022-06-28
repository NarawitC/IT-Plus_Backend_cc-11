const express = require('express');
const router = express.Router();

const userProductRouter = require('./user/userProductRoutes');
const userCategoryRouter = require('./user/userCategoryRoutes');
const userSupplierRouter = require('./user/userSupplierRoutes');

router.use('/product', userProductRouter);
router.use('/category', userCategoryRouter);
router.use('/supplier', userSupplierRouter);

module.exports = router;
