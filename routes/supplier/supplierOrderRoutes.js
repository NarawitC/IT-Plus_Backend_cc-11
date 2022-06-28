const express = require('express');
const router = express.Router();

const supplierOrderController = require('../../controllers/supplier/supplierOrderController');

router.get('/', supplierOrderController.getAllOrder);
router.get('/:id', supplierOrderController.getOrderById);

module.exports = router;
