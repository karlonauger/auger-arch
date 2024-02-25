const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/reset-password', userController.resetPassword);
router.get('/user/:userId', userController.get);
router.get('/find-or-create-user/:userName', userController.findOrCreateByName);
router.delete('/delete', userController.delete);

module.exports = router;