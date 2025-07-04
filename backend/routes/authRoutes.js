const express = require('express');
const router = express.Router();

const { protect, restrictTo, requireApproval } = require('../middleware/authMiddleware');
const { loginUser, registerUser, approveUser } = '../controllers/authController.js';

router.post('/login', loginUser);
router.post('/register', registerUser)

router.put(
    '/approve/:id',
    protect,
    requireApproval,
    approveUser
);

module.exports = router;
