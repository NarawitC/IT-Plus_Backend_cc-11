const express = require('express');
const router = express.Router();

const clientOrderController = require('../../controllers/client/clientOrderController');

router.post('/:cartId', clientOrderController.bulkCreateOrderWithOrderItem);

module.exports = router;
