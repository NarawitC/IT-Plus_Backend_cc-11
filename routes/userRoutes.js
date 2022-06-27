const express = require('express');
const router = express.Router();

const userProductRouter = require('./user/userProductRoutes');
const userCategoryRouter = require('./user/userCategoryRoutes');

router.use('/product', userProductRouter);
router.use('/category', userCategoryRouter);

module.exports = router;
