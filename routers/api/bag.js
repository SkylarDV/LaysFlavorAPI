const express = require('express');
const router = express.Router();
const bagController = require('../../controllers/api/bag');


router.get('/', bagController.getAll);
router.post('/', bagController.addNew);
router.get('/:id', bagController.getOne);
router.put('/:id', bagController.updateOne);
router.delete('/:id', bagController.deleteOne);


module.exports = router;