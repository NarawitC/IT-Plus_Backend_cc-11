const express = require('express');
const router = express.Router();

const clientOrderController = require('../../controllers/client/clientOrderController');

router.post('/', clientOrderController.bulkCreateOrderWithOrderItem);

module.exports = router;
