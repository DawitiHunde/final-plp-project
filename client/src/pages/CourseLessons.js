import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lessonService, courseService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function CourseLessons() {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', order: 0 });
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    fetchCourse();
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await courseService.getCourse(courseId);
      setCourse(response.data);
      setIsTeacher(user?.role === 'teacher' && response.data.instructor._id === user.id);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await lessonService.getCourseLessons(courseId);
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await lessonService.createLesson({ ...formData, courseId });
      setFormData({ title: '', content: '', order: 0 });
      setShowForm(false);
      fetchLessons();
    } catch (error) {
      alert('Failed to create lesson');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await lessonService.deleteLesson(id);
        fetchLessons();
      } catch (error) {
        alert('Failed to delete lesson');
      }
    }
  };

  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to={user?.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'}>
          Dashboard
        </Link>
      </nav>
      <div className="container">
        <h1>{course?.title} - Lessons</h1>
        <p>{course?.description}</p>

        {isTeacher && (
          <>
            <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '1rem' }}>
              {showForm ? 'Cancel' : 'Add New Lesson'}
            </button>

            {showForm && (
              <form onSubmit={handleSubmit} style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                <div className="form-group">
                  <label>Lesson Title:</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Content:</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows="6"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Order:</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  />
                </div>
                <button type="submit">Create Lesson</button>
              </form>
            )}
          </>
        )}

        <h2>Course Lessons</h2>
        {lessons.length === 0 ? (
          <p>No lessons available yet.</p>
        ) : (
          lessons.map((lesson, index) => (
            <div key={lesson._id} className="course-card">
              <h3>Lesson {index + 1}: {lesson.title}</h3>
              <p>{lesson.content}</p>
              {isTeacher && (
                <button 
                  onClick={() => handleDelete(lesson._id)}
                  style={{ backgroundColor: '#dc3545', marginTop: '0.5rem' }}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CourseLessons;
