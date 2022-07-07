const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/uploadCloudinary');

const supplierAuthController = require('../../controllers/supplier/supplierAuthController');

router.post(
  '/sign-up',
  upload.fields([
    { name: 'firstName', maxCount: 1 },
    { name: 'lastName', maxCount: 1 },
    { name: 'phoneNumber', maxCount: 1 },
    { name: 'email', maxCount: 1 },
    { name: 'password', maxCount: 1 },
    { name: 'confirmPassword', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'displayName', maxCount: 1 },
    { name: 'description', maxCount: 1 },
    { name: 'profilePicture', maxCount: 1 },
    { name: 'lineId', maxCount: 1 },
    { name: 'bankName', maxCount: 1 },
    { name: 'bankAccount', maxCount: 1 },
  ]),
  supplierAuthController.signUp
);
router.post('/sign-in', supplierAuthController.signIn);

module.exports = router;
