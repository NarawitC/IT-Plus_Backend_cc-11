const express = require('express');
const router = express.Router();

const { clientAuthenticate } = require('../middlewares/client/authenticate');
const clientAuthRouter = require('./client/clientAuthRoutes');
const clientRouter = require('./client/clientRoutes');
const clientProductRouter = require('./client/clientProductRoutes');
const clientCartRouter = require('./client/clientCartRoutes');
const clientCartItemRouter = require('./client/clientCartItemRoutes');
const clientCategoryRouter = require('./client/clientCategoryRoutes');
const clientSupplierRouter = require('./client/clientSupplierRoutes');

router.use('/auth', clientAuthRouter);
router.use('/client', clientAuthenticate, clientRouter);
router.use('/product', clientAuthenticate, clientProductRouter);
router.use('/cart', clientAuthenticate, clientCartRouter);
router.use('/cart-item', clientAuthenticate, clientCartItemRouter);
router.use('/category', clientAuthenticate, clientCategoryRouter);
router.use('/supplier', clientAuthenticate, clientSupplierRouter);

module.exports = router;
