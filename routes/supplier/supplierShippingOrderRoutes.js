const express = require('express');
const router = express.Router();

const supplierShippingOrderController = require('../../controllers/supplier/supplierShippingOrderController');

router.post(
  '/:purchasedOrderId',
  supplierShippingOrderController.createShippingOrder
);
router.patch(
  '/to-client/:shippingOrderId',
  supplierShippingOrderController.updateStatusToClient
);

module.exports = router;
