// auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /register - Register a new user
router.post('/register', authController.register);

// POST /login - Login an existing user
router.post('/login', authController.login);

// POST /logout - Logout the current user
router.post('/logout', authController.logout);

module.exports = router;
