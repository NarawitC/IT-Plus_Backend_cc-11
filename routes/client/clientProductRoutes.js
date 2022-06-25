const express = require('express');
const router = express.Router();

const clientProductController = require('../../controllers/client/clientProductController');

router.get('/', clientProductController.getAllProduct);

router.get('/:productId', clientProductController.getProductById);
router.get(
  '/category/:categoryId',
  clientProductController.getProductByCategoryId
);
router.get(
  '/subcategory/:subCategoryId',
  clientProductController.getProductBySubCategoryId
);
router.get(
  '/search-text/:searchText',
  clientProductController.getProductBySearchText
);
router.get(
  '/search-brand/:searchBrand',
  clientProductController.getProductByBrand
);

module.exports = router;
