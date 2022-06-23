const express = require('express');
const router = express.Router();

const adminAuthController = require('../../controllers/admin/adminAuthController');

router.post('/sign-up', adminAuthController.adminSignUp);

module.exports = router;
