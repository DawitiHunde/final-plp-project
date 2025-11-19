const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

// Create lesson (teachers only, for their own courses)
router.post('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const { title, content, courseId, order } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add lessons to this course' });
    }
    
    const lesson = new Lesson({ title, content, courseId, order });
    await lesson.save();
    
    res.status(201).json({ message: 'Lesson created successfully', lesson });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all lessons for a course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const lessons = await Lesson.find({ courseId: req.params.courseId })
      .sort({ order: 1 });
    
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single lesson
router.get('/:id', protect, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('courseId');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update lesson (teachers only, own courses)
router.put('/:id', protect, authorize('teacher'), async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('courseId');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    if (lesson.courseId.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this lesson' });
    }
    
    const { title, content, order } = req.body;
    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    lesson.order = order !== undefined ? order : lesson.order;
    
    await lesson.save();
    
    res.json({ message: 'Lesson updated successfully', lesson });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete lesson (teachers only, own courses)
router.delete('/:id', protect, authorize('teacher'), async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('courseId');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    if (lesson.courseId.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this lesson' });
    }
    
    await lesson.deleteOne();
    
    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
