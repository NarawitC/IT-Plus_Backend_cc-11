const express = require('express');
const router = express.Router();

const upload = require('../../middlewares/uploadCloudinary');
const supplierProductController = require('../../controllers/supplier/supplierProductController');

router.post('/',upload.fields([
  { name: 'mainPicture', maxCount: 1 },
  { name: 'subPicture1', maxCount: 1 },
  { name: 'subPicture2', maxCount: 1 },
  { name: 'subPicture3', maxCount: 1 },
  { name: 'subPicture4', maxCount: 1 },
]), supplierProductController.createProduct);
router.get('/', supplierProductController.getAllProductBySupplierId);

module.exports = router;
