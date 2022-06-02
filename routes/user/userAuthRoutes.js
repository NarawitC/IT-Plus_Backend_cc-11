const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/signup', authController.userSignup);
router.post('/signIn', authController.userSignIn);

module.exports = router;
