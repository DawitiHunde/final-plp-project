import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function TeacherDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getTeacherCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await courseService.createCourse(formData);
      setMessage('Course created successfully');
      setFormData({ title: '', description: '' });
      setShowForm(false);
      fetchCourses();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create course');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(id);
        fetchCourses();
      } catch (error) {
        alert('Failed to delete course');
      }
    }
  };

  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/courses">All Courses</Link>
        <Link to="/teacher-dashboard">Dashboard</Link>
        <button onClick={logout} style={{ marginLeft: 'auto' }}>Logout</button>
      </nav>
      <div className="container">
        <h1>Teacher Dashboard</h1>
        <p>Welcome, {user?.name}!</p>
        
        <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '1rem' }}>
          {showForm ? 'Cancel' : 'Create New Course'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            <div className="form-group">
              <label>Course Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                required
              />
            </div>
            <button type="submit">Create Course</button>
          </form>
        )}

        {message && <p>{message}</p>}

        <h2>My Courses</h2>
        {courses.length === 0 ? (
          <p>You haven't created any courses yet.</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Students Enrolled:</strong> {course.studentsEnrolled?.length || 0}</p>
              <div style={{ marginTop: '1rem' }}>
                <Link to={`/course/${course._id}/lessons`}>
                  <button style={{ marginRight: '0.5rem' }}>Manage Lessons</button>
                </Link>
                <button onClick={() => handleDelete(course._id)} style={{ backgroundColor: '#dc3545' }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
