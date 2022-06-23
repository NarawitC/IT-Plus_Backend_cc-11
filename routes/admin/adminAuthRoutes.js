const express = require('express');
const router = express.Router();

const adminAuthController = require('../../controllers/admin/adminAuthController');

router.post('/sign-up', adminAuthController.adminSignUp);
router.post('/sign-in', adminAuthController.adminSignIn);

module.exports = router;
