const express = require('express');
const router = express.Router();

const { clientAuthenticate } = require('../middlewares/client/authenticate');
const clientAuthRouter = require('./client/clientAuthRoutes');
const clientRouter = require('./client/clientRoutes');
const clientProductRouter = require('./client/clientProductRoutes');

router.use('/auth', clientAuthRouter);
router.use('/client', clientAuthenticate, clientRouter);
router.use('/product', clientAuthenticate, clientProductRouter);

module.exports = router;
