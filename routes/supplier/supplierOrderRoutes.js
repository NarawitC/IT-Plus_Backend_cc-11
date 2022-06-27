const express = require('express');
const router = express.Router();

const supplierOrderController = require('../../controllers/supplier/supplierOrderController');

router.get('/', supplierOrderController.supplierGetAllOrder);
router.get('/:id', supplierOrderController.supplierGetOrderById);

module.exports = router;
