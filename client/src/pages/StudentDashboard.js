import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

function StudentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentService.getMyEnrollments();
      setEnrollments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setLoading(false);
    }
  };

  const handleUnenroll = async (courseId) => {
    if (window.confirm('Are you sure you want to unenroll from this course?')) {
      try {
        await enrollmentService.unenroll(courseId);
        fetchEnrollments();
      } catch (error) {
        alert('Failed to unenroll');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/courses">Browse Courses</Link>
        <Link to="/student-dashboard">My Courses</Link>
        <button onClick={logout} style={{ marginLeft: 'auto' }}>Logout</button>
      </nav>
      <div className="container">
        <h1>Student Dashboard</h1>
        <p>Welcome, {user?.name}!</p>

        <h2>My Enrolled Courses</h2>
        {enrollments.length === 0 ? (
          <p>You haven't enrolled in any courses yet. <Link to="/courses">Browse courses</Link></p>
        ) : (
          enrollments.map((enrollment) => (
            <div key={enrollment._id} className="course-card">
              <h3>{enrollment.courseId?.title}</h3>
              <p>{enrollment.courseId?.description}</p>
              <p><strong>Instructor:</strong> {enrollment.courseId?.instructor?.name}</p>
              <p><strong>Enrolled:</strong> {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
              <div style={{ marginTop: '1rem' }}>
                <Link to={`/course/${enrollment.courseId?._id}/lessons`}>
                  <button style={{ marginRight: '0.5rem' }}>View Lessons</button>
                </Link>
                <button 
                  onClick={() => handleUnenroll(enrollment.courseId?._id)}
                  style={{ backgroundColor: '#dc3545' }}
                >
                  Unenroll
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
