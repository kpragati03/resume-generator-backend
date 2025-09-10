const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Resume = require('../models/Resume');

// ✅ Updated scoring logic to include profession
const calculateScore = (data) => {
    let score = 0;
    if (data.name) score += 6;
    if (data.email) score += 7;
    if (data.phone) score += 6;
    if (data.address) score += 6;
    if (data.profession) score += 5; // ✅ ADDED: Profession scoring

    if (data.education?.length > 0) {
        if (data.education[0].degree) score += 8;
        if (data.education[0].institution) score += 8;
        if (data.education[0].year) score += 9;
    }

    if (data.experience?.length > 0) {
        if (data.experience[0].company) score += 7;
        if (data.experience[0].role) score += 8;
        if (data.experience[0].duration) score += 7;
        if (data.experience[0].description) score += 8;
    }

    if (data.skills?.length > 0) score += 15; // ✅ UPDATED: Reduced from 20 to 15

    return score;
};

// @route   POST /api/resume
// @desc    Save a new resume
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { resumeData, selectedTemplate, color } = req.body;
        
        console.log('=== BACKEND: Saving Resume ===');
        console.log('Selected Template:', selectedTemplate);
        console.log('Color:', color);
        console.log('Resume Data:', resumeData);

        if (!resumeData) {
            return res.status(400).json({ message: 'Resume data is required' });
        }

        const score = calculateScore(resumeData);

        const newResume = new Resume({
            ...resumeData,
            score,
            selectedTemplate: selectedTemplate || 'classic', // ✅ ENSURE template is saved
            color: color || '#007bff', // ✅ ENSURE color is saved
            user: req.user.id,
        });

        const savedResume = await newResume.save();
        console.log('✅ Resume saved with template:', savedResume.selectedTemplate);
        console.log('✅ Resume saved with color:', savedResume.color);
        
        res.status(201).json({ message: 'Resume saved successfully!', resume: savedResume });
    } catch (err) {
        console.error('❌ Resume Save Error:', err.message);
        res.status(500).json({ message: 'Server error while saving resume' });
    }
});

// @route   GET /api/resume
// @desc    Get all resumes for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
        
        console.log('=== BACKEND: Fetching Resumes ===');
        console.log('Found resumes:', resumes.length);
        resumes.forEach((resume, index) => {
            console.log(`Resume ${index + 1}:`);
            console.log('- Template:', resume.selectedTemplate);
            console.log('- Color:', resume.color);
            console.log('- Name:', resume.name);
        });
        
        res.json(resumes);
    } catch (err) {
        console.error('❌ Fetch Resumes Error:', err.message);
        res.status(500).json({ message: 'Server error while fetching resumes' });
    }
});

// @route   PUT /api/resume/:id/rename
// @desc    Rename a user's resume
// @access  Private
router.put('/:id/rename', auth, async (req, res) => {
    try {
        const { newName } = req.body;
        if (!newName) {
            return res.status(400).json({ msg: 'New name is required' });
        }

        let resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }

        if (resume.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        resume.name = newName;
        await resume.save();

        res.json({ message: 'Resume renamed successfully!', resume });
    } catch (err) {
        console.error('❌ Rename Error:', err.message);
        res.status(500).json({ message: 'Server error while renaming resume' });
    }
});

module.exports = router;