const express = require('express');
const router = express.Router();

const supplierBalanceController = require('../../controllers/supplier/supplierBalanceController');

router.get('/', supplierBalanceController.getBalanceBySupplierId);

module.exports = router;
