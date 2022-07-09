const express = require('express');
const router = express.Router();

const clientPromotionController = require('../../controllers/client/clientPromotionController');

router.get('/', clientPromotionController.getApprovedPromotionProduct);

module.exports = router;
