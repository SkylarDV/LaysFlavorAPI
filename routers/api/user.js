const express = require('express');
const router = express.Router();
const authController = require('../../controllers/api/auth');

router.get('/', authController.getAll);
router.get('/:id', authController.getOne);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;