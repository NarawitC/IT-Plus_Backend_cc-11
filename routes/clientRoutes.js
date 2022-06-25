const express = require('express');
const router = express.Router();

const { clientAuthenticate } = require('../middlewares/client/authenticate');
const clientAuthRouter = require('./client/clientAuthRoutes');
const clientRouter = require('./client/clientRoutes');
const clientProductRouter = require('./client/clientProductRoutes');
const clientCartRouter = require('./client/clientCartRoutes');
const clientCartItemRouter = require('./client/clientCartItemRoutes');

router.use('/auth', clientAuthRouter);
router.use('/client', clientAuthenticate, clientRouter);
router.use('/product', clientAuthenticate, clientProductRouter);
router.use('/cart', clientAuthenticate, clientCartRouter);
router.use('/cart-item', clientAuthenticate, clientCartItemRouter);

module.exports = router;
