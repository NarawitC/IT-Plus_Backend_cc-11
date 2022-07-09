const express = require('express');
const router = express.Router();

const userProductRouter = require('./user/userProductRoutes');
const userCategoryRouter = require('./user/userCategoryRoutes');
const userSupplierRouter = require('./user/userSupplierRoutes');
const userPromotionRouter = require('./client/clientPromotionRoutes');

router.use('/product', userProductRouter);
router.use('/category', userCategoryRouter);
router.use('/supplier', userSupplierRouter);
router.use('/promotion', userPromotionRouter);

module.exports = router;
