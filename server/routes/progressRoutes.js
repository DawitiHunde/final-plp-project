const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { protect, authorize } = require('../middleware/auth');

// Mark lesson as complete
router.post('/complete', protect, authorize('student'), async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    
    const progress = await Progress.findOneAndUpdate(
      { studentId: req.user.id, courseId, lessonId },
      { 
        completed: true, 
        completedAt: new Date(),
        studentId: req.user.id,
        courseId,
        lessonId
      },
      { upsert: true, new: true }
    );
    
    res.json({ message: 'Progress updated', progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student progress for a course
router.get('/course/:courseId', protect, authorize('student'), async (req, res) => {
  try {
    const progress = await Progress.find({
      studentId: req.user.id,
      courseId: req.params.courseId
    }).populate('lessonId');
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
