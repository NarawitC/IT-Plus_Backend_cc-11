const express = require('express');
const router = express.Router();

const supplierTransactionController = require('../../controllers/supplier/supplierTransactionController');

router.get('/', supplierTransactionController.getAllTransactionsBySupplierId);
router.get('/:transactionId', supplierTransactionController.getTransactionById);
router.post(
  '/createWithdrawal',
  supplierTransactionController.createWithdrawalTransaction
);

module.exports = router;
