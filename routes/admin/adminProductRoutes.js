const express = require('express');
const router = express.Router();

const adminProductController = require('../../controllers/admin/adminProductController');

router.get('/', adminProductController.getAllProduct);

module.exports = router;
