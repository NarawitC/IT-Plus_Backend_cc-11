const express = require('express');
const router = express.Router();

const clientCategoryController = require('../../controllers/client/clientCategoryController');

router.get('/', clientCategoryController.getAllCategory);

module.exports = router;
