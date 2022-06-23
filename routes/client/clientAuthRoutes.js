const express = require('express');
const router = express.Router();

const clientAuthController = require('../../controllers/client/clientAuthController');

router.post('/sign-up', clientAuthController.clientSignUp);
router.post('/sign-in', clientAuthController.clientSignIn);

module.exports = router;
