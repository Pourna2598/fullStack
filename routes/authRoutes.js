// /backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../validators/authValidator');

// POST: /api/auth/register
// User registration route
router.post('/register', validateRegistration, registerUser);

// POST: /api/auth/login
// User login route
router.post('/login', validateLogin, loginUser);

module.exports = router;
