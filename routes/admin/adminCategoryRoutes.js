const express = require('express');
const router = express.Router();
const adminCategoryController = require('../../controllers/admin/adminCategoryController');


router.post('/', adminCategoryController.createCategory);

module.exports = router;
