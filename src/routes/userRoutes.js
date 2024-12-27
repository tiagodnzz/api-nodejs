const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/roleMiddleware')

// NoAuth
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Auth
router.get('/all', authMiddleware, isAdmin, userController.getAllUsers); //admin
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/update', authMiddleware, userController.updateUser);
router.delete('/delete', authMiddleware, isAdmin, userController.deleteUser); //admin

module.exports = router;