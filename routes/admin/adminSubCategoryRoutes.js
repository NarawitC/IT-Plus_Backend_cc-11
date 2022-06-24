const express = require('express');
const router = express.Router();

const subCategoryController = require('../../controllers/admin/adminSubCategoryController');

router.post('/', subCategoryController.createSubCategory);

module.exports = router;
