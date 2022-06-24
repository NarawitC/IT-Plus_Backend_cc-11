const express = require('express');
const router = express.Router();

const clientProductController = require('../../controllers/client/clientProductController');

router.get('/', clientProductController.getAllProduct);

module.exports = router;
