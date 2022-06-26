const express = require('express');
const router = express.Router();

const adminOrderController = require('../../controllers/admin/adminOrderController');

router.get('/', adminOrderController.getAllOrder);
router.get('/:id', adminOrderController.getOrderById);

module.exports = router;
