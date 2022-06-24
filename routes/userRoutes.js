const express = require('express');
const router = express.Router();

const userProductRouter = require('./user/userProductRoutes');

router.use('/product', userProductRouter);

module.exports = router;
