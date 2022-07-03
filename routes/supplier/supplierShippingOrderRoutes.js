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

router.patch(
  '/to-delivered/:shippingOrderId',
  supplierShippingOrderController.updateStatusToDelivered
);

module.exports = router;
