const express = require('express');
const router = express.Router();

const clientAuthController = require('../../controllers/client/clientAuthController');

router.post('/sign-up', clientAuthController.signUp);
router.post('/sign-in', clientAuthController.signIn);
router.post('/sign-in-google', clientAuthController.googleLogin);

module.exports = router;
