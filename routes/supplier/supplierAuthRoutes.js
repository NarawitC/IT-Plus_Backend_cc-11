const express = require('express');
const router = express.Router();

const supplierAuthController = require('../../controllers/supplier/supplierAuthController');

router.post('/sign-up', supplierAuthController.signUp);
router.post('/sign-in', supplierAuthController.signIn);

module.exports = router;
