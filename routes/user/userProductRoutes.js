const express = require('express');
const router = express.Router();

const userProductController = require('../../controllers/user/userProductController');

router.get('/', userProductController.getAllProduct);
router.get('/:productId', userProductController.getProductById);
router.get('/:categoryId', userProductController.getProductByCategoryId);
router.get('/:subCategoryId', userProductController.getProductBySubCategoryId);
router.get('/:searchText', userProductController.getProductBySearchText);
router.get('/:searchBrand', userProductController.getProductByBrand);

module.exports = router;
