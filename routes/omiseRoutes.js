const express = require('express');
const router = express.Router();

const omiseRouter = require('./omise/omiseRoutes');

router.use('/checkout', omiseRouter);

module.exports = router;
