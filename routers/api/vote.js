const express = require('express');
const router = express.Router();
const voteController = require('../../controllers/api/vote');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', voteController.getAll);
router.post('/:bagId', voteController.addNew);
router.delete('/:bagId', verifyToken, voteController.deleteOne);


module.exports = router;