const express = require('express');
const router = express.Router();
const voteController = require('../../controllers/api/vote');


router.get('/', voteController.getAll);
router.post('/:bagId', voteController.addNew);
router.delete('/:bagId', voteController.deleteOne);


module.exports = router;