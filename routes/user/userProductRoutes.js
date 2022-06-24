const express = require('express');
const router = express.Router();

const userProductController = require('../../controllers/user/userProductController');

router.get('/', userProductController.getAllProduct);
router.get('/:productId', userProductController.getProductById);
router.get(
  '/category/:categoryId',
  userProductController.getProductByCategoryId
);
router.get(
  '/subcategory/:subCategoryId',
  userProductController.getProductBySubCategoryId
);
router.get(
  '/search-text/:searchText',
  userProductController.getProductBySearchText
);
router.get(
  '/search-brand/:searchBrand',
  userProductController.getProductByBrand
);

module.exports = router;
