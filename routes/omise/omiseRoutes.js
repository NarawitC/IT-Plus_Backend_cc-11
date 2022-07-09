const express = require('express');
const router = express.Router();

const OmiseController = require('../../controllers/omise/omiseController');

router.post('/credit-card', OmiseController.checkoutCreditCard);

module.exports = router;
