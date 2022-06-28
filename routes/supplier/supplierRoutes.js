const express = require('express');
const router = express.Router();

const supplierController = require('../../controllers/supplier/supplierController');

router.get('/', supplierController.getMyInfo);

module.exports = router;
