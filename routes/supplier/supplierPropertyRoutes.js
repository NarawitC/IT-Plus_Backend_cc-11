const express = require('express');
const router = express.Router();

const supplierPropertyController = require('../../controllers/supplier/supplierPropertyController');

router.post(
  '/:productId',
  supplierPropertyController.createProductPropertyByProductId
);

module.exports = router;
