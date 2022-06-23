const express = require('express');
const router = express.Router();

const supplierAuthController = require('../../controllers/supplier/supplierAuthController');

router.post('/sign-up', supplierAuthController.supplierSignUp);

module.exports = router;
