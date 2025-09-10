const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Middleware
const Resume = require('../models/Resume');

// @route   GET /api/user/resumes
// @desc    Get all resumes for the logged-in user
// @access  Private
router.get('/resumes', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;