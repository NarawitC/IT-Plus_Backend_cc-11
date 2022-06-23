const express = require('express');
const router = express.Router();

const clientAuthRouter = require('./client/clientAuthRoutes');

router.use('/auth', clientAuthRouter);

module.exports = router;
