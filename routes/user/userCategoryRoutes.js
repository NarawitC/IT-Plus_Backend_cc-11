const express = require('express');
const router = express.Router();

const userCategoryController = require('../../controllers/user/userCategoryController');

router.get('/', userCategoryController.getAllCategory);

module.exports = router;
