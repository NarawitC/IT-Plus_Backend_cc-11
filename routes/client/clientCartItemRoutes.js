const express = require('express');
const router = express.Router();

const clientCartItemController = require('../../controllers/client/clientCartItemController');

router.post('/', clientCartItemController.createCartItem);

module.exports = router;
