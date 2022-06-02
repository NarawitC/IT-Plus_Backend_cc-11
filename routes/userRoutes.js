const express = require('express');
const router = express.Router();
const userAuthRouter = require('./user/userAuthRoutes');

router.use('/auth', userAuthRouter);

module.exports = router;
