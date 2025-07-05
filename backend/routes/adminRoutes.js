const express = require('express');
const router = express.Router();

const {
    getOrganizationHeads,
    getOrganizationMembers,
    getParticipants
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


module.exports = router;