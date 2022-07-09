const express = require('express');
const router = express.Router();

const clientTransactionController = require('../../controllers/client/clientTransactionController');

router.post(
  '/createTransfer',
  clientTransactionController.createTransferToSupplier
);

module.exports = router;
