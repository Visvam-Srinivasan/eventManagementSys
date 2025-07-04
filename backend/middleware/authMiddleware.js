const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { useReducer } = require('react');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password');
            if (!user) return res.status(401).json({ message: 'User not found' });

            req.user = user;
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
};

const restrictTo = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};

const requireApproval = (req, res, next) => {
    if (!req.user.approved) {
        return res.status(403).json({ message: "Accoint not approved" });
    }
    next();
}

module.exports = { protect, restrictTo, requireApproval };