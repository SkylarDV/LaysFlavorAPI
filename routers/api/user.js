const express = require('express');
const router = express.Router();
const authController = require('../../controllers/api/auth');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', authController.getAll);
router.get('/:id', authController.getOne);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put('/change-password', verifyToken, authController.changePassword);
router.delete('/:id', authController.deleteUser);

module.exports = router;