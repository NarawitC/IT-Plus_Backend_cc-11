const express = require('express');
const router = express.Router();

const clientController = require('../../controllers/client/clientController');

router.get('/', clientController.getClientInfo);

module.exports = router;
