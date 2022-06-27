const express = require('express');
const router = express.Router();

const clientProductController = require('../../controllers/client/clientProductController');

router.get('/', clientProductController.getApprovedProduct);

router.get('/:productId', clientProductController.getProductById);
router.get(
  '/category/:categoryId',
  clientProductController.getProductByCategoryId
);
router.get(
  '/subcategory/:subCategoryId',
  clientProductController.getProductBySubCategoryId
);

module.exports = router;
