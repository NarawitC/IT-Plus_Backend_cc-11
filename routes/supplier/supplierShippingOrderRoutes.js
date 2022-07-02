const express = require('express');
const router = express.Router();

const supplierShippingOrderController = require('../../controllers/supplier/supplierShippingOrderController');

router.post(
  '/:purchasedOrderId',
  supplierShippingOrderController.createShippingOrder
);

module.exports = router;
