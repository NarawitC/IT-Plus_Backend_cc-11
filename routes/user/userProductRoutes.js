const express = require('express');
const router = express.Router();

const clientProductController = require('../../controllers/client/clientProductController');
const clientPromotionController = require('../../controllers/client/clientPromotionController');

router.get('/', clientProductController.getApprovedProduct);
router.get('/promotion', clientPromotionController.getApprovedPromotionProduct);
router.get('/:productId', clientProductController.getProductById);
router.get(
  '/category/:categoryId',
  clientProductController.getApprovedProductByCategoryId
);
router.get(
  '/subcategory/:subCategoryId',
  clientProductController.getApprovedProductBySubCategoryId
);

module.exports = router;
