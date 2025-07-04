const express = require('express');
const router = express.Router();

const { protect, restrictTo, requireApproval } = require('../middleware/authMiddleware');
const { loginUser } = '../controllers/authController.js';
const { registerUser } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser)

module.exports = router;
