const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// @route   GET /api/share/:id
// @desc    Get a single resume by ID for sharing
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;