const express = require('express');
const router = express.Router();

const clientAuthController = require('../../controllers/client/clientAuthController');

router.post('/sign-up', clientAuthController.clientSignUp);

module.exports = router;
