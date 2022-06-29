const express = require('express');
const router = express.Router();

const clientOrderController = require('../../controllers/client/clientOrderController');

router.post('/:cartId', clientOrderController.bulkCreateOrderWithOrderItem);
router.get('/', clientOrderController.getAllOrder);
router.get('/:orderId', clientOrderController.getOrderById);

module.exports = router;
