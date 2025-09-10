const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');
const { registerUser, loginUser } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Get current user data
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // Get user from database using ID from token (password field excluded)
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        console.error('Get user error:', err.message);
        res.status(500).json({ msg: 'Server error while fetching user data' });
    }
});

module.exports = router;