const express = require('express');
const router = express.Router();

const supplierOrderItemController = require('../../controllers/supplier/supplierOrderItemController');

router.get('/', supplierOrderItemController.getAllOrderItemsBySupplierId);
router.get('/:id', supplierOrderItemController.getOrderItemsById);

module.exports = router;
