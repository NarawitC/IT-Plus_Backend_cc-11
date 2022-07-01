const express = require('express');
const router = express.Router();

const clientPurchaseOrderController = require('../../controllers/client/clientPurchasedOrderController');

router.post('/:orderId', clientPurchaseOrderController.createPurchaseOrder);

module.exports = router;
