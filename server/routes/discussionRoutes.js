const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');
const { protect } = require('../middleware/auth');

// Create a question
router.post('/', protect, async (req, res) => {
  try {
    const { courseId, question } = req.body;
    
    if (!question || question.trim().length < 10) {
      return res.status(400).json({ message: 'Question must be at least 10 characters' });
    }
    
    const discussion = new Discussion({
      courseId,
      userId: req.user.id,
      question
    });
    
    await discussion.save();
    await discussion.populate('userId', 'name role');
    
    res.status(201).json({ message: 'Question posted', discussion });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all discussions for a course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const discussions = await Discussion.find({ courseId: req.params.courseId })
      .populate('userId', 'name role')
      .populate('answers.userId', 'name role')
      .sort({ createdAt: -1 });
    
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add an answer to a discussion
router.post('/:id/answer', protect, async (req, res) => {
  try {
    const { answer } = req.body;
    
    if (!answer || answer.trim().length < 5) {
      return res.status(400).json({ message: 'Answer must be at least 5 characters' });
    }
    
    const discussion = await Discussion.findById(req.params.id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    
    discussion.answers.push({
      userId: req.user.id,
      answer
    });
    
    await discussion.save();
    await discussion.populate('userId', 'name role');
    await discussion.populate('answers.userId', 'name role');
    
    res.json({ message: 'Answer added', discussion });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
