const express = require('express');
const router = express.Router();

const clientSupplierController = require('../../controllers/client/clientSupplierController');

router.get(
  '/approved-product-supplier-list',
  clientSupplierController.getApprovedProductSupplierList
);
router.get(
  '/approved-product-supplier-list/category/:categoryId',
  clientSupplierController.getApprovedProductByCategoryIdSupplierList
);
router.get(
  '/approved-product-supplier-list/sub-category/:subCategoryId',
  clientSupplierController.getProductBySubCategoryIdSupplierList
);

module.exports = router;
