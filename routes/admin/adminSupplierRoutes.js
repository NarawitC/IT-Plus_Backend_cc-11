const express = require('express');
const router = express.Router();

const adminSupplierController = require('../../controllers/admin/adminSupplierController');

router.get('/', adminSupplierController.getAllSupplier);

module.exports = router;
