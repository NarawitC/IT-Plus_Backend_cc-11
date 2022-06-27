const express = require('express');
const router = express.Router();

const clientAuthController = require('../../controllers/client/clientAuthController');

router.post('/sign-up', clientAuthController.signUp);
router.post('/sign-in', clientAuthController.signIn);

module.exports = router;
