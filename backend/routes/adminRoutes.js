const express = require('express');
const router = express.Router();

const {
    getOrganizationHeads,
    getOrganizationMembers,
    getParticipants,
    getUserById
} = require('../controllers/adminController');

const {
    protect,
    restrictTo,
    requireApproval
} = require('../middleware/authMiddleware');

router.use(protect, requireApproval, restrictTo('admin'));

router.get('/organization-heads', getOrganizationHeads);
router.get('/organization-members', getOrganizationMembers);
router.get('/participants', getParticipants);
router.get('/users/:id', getUserById);


module.exports = router;