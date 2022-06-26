const express = require('express');
const router = express.Router();

const adminSubCategoryController = require('../../controllers/admin/adminSubCategoryController');

router.post('/', adminSubCategoryController.createSubCategory);

module.exports = router;
