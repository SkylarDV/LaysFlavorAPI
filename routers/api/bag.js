const express = require('express');
const router = express.Router();
const bagController = require('../../controllers/api/bag');


router.get('/', bagController.getAll);
router.post('/', bagController.addNew);


module.exports = router;