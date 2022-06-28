const express = require('express');
const router = express.Router();

const adminProductController = require('../../controllers/admin/adminProductController');

router.get('/', adminProductController.getAllProduct);
router.get('/:productId', adminProductController.getProductById);
router.patch('/approve/:productId', adminProductController.approveProduct);
router.patch('/reject/:productId', adminProductController.rejectProduct);

module.exports = router;
