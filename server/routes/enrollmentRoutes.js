const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

// Enroll in a course (students only)
router.post('/', protect, authorize('student'), async (req, res) => {
  try {
    const { courseId } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const existingEnrollment = await Enrollment.findOne({
      studentId: req.user.id,
      courseId
    });
    
    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    const enrollment = new Enrollment({
      studentId: req.user.id,
      courseId
    });
    
    await enrollment.save();
    
    // Add student to course's studentsEnrolled array
    course.studentsEnrolled.push(req.user.id);
    await course.save();
    
    res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student's enrolled courses
router.get('/my-courses', protect, authorize('student'), async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user.id })
      .populate({
        path: 'courseId',
        populate: { path: 'instructor', select: 'name email' }
      });
    
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Unenroll from a course
router.delete('/:courseId', protect, authorize('student'), async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      studentId: req.user.id,
      courseId: req.params.courseId
    });
    
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    await enrollment.deleteOne();
    
    // Remove student from course's studentsEnrolled array
    await Course.findByIdAndUpdate(req.params.courseId, {
      $pull: { studentsEnrolled: req.user.id }
    });
    
    res.json({ message: 'Unenrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
