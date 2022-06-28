const express = require('express');
const router = express.Router();

const adminAuthController = require('../../controllers/admin/adminAuthController');

router.post('/sign-up', adminAuthController.signUp);
router.post('/sign-in', adminAuthController.signIn);

module.exports = router;
