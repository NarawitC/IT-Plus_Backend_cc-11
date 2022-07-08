const express = require('express');
const router = express.Router();

const adminPromotionController = require('../../controllers/admin/adminPromotionController');

router.post('/:productId', adminPromotionController.createPromotion);

module.exports = router;
