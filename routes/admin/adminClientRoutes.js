const express = require('express');
const router = express.Router();

const adminClientController = require('../../controllers/admin/adminClientController');

router.get('/', adminClientController.getAllClient);

module.exports = router;
