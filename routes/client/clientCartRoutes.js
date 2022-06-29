const express = require('express');
const router = express.Router();

const clientCartController = require('../../controllers/client/clientCartController');

router.post('/', clientCartController.createCart);
router.get('/', clientCartController.getAllCart);

module.exports = router;
