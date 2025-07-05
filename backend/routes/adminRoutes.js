const express = require('express');
const router = express.Router();

const {
    getOrganizationHeads,
    getOrganizationMembers,
    getParticipants,
    getUserById,
    getOrganizationById,
    getOrganizations,
    getUnapprovedOrganizationHeads,
    getUnapprovedOrganizations
} = require('../controllers/adminController');

const {
    protect,
    restrictTo,
    requireApproval
} = require('../middleware/authMiddleware');

router.use(protect, requireApproval, restrictTo('admin'));

router.get('/unapproved-heads', getUnapprovedOrganizationHeads);
router.get('/unapproved-organizations', getUnapprovedOrganizations);
router.get('/organizations', getOrganizations);
router.get('/organization-heads', getOrganizationHeads);
router.get('/organization-members', getOrganizationMembers);
router.get('/participants', getParticipants);
router.get('/users/:id', getUserById);
router.get('/organization/:id', getOrganizationById);


module.exports = router;