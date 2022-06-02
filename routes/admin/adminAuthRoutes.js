const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.post('/signup', authController.adminSignup);
router.post('/signIn', authController.adminSignIn);

module.exports = router;
