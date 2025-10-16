const express = require('express');
const router = express.Router();
const bagController = require('../../controllers/api/bag');


router.get('/', bagController.getAll);


module.exports = router;