const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

// Assign grade (teachers only)
router.post('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const { studentId, courseId, grade, feedback } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to grade this course' });
    }
    
    const gradeRecord = await Grade.findOneAndUpdate(
      { studentId, courseId },
      { 
        studentId, 
        courseId, 
        grade, 
        feedback,
        gradedBy: req.user.id
      },
      { upsert: true, new: true }
    ).populate('studentId', 'name email');
    
    res.json({ message: 'Grade assigned successfully', grade: gradeRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get grades for a course (teacher)
router.get('/course/:courseId', protect, authorize('teacher'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const grades = await Grade.find({ courseId: req.params.courseId })
      .populate('studentId', 'name email');
    
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student's grades
router.get('/my-grades', protect, authorize('student'), async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.user.id })
      .populate('courseId', 'title')
      .populate('gradedBy', 'name');
    
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
