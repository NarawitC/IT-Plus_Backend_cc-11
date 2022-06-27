const express = require('express');
const router = express.Router();

const userProductController = require('../../controllers/user/userProductController');

router.get('/', userProductController.getApprovedProduct);
router.get('/:productId', userProductController.getProductById);
router.get(
  '/category/:categoryId',
  userProductController.getProductByCategoryId
);
router.get(
  '/subcategory/:subCategoryId',
  userProductController.getProductBySubCategoryId
);

module.exports = router;
