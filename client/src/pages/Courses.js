import React, { useState, useEffect, useContext } from 'react';
import { courseService, enrollmentService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { ListSkeleton } from '../components/LoadingSkeleton';

function Courses() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAllCourses();
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch courses');
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await enrollmentService.enroll(courseId);
      alert('Enrolled successfully!');
      fetchCourses();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-64 mb-4 skeleton"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-96 skeleton"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ListSkeleton count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Available Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our collection of courses and start learning today
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No courses available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="card hover:scale-105 transition-transform duration-200">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FaUser className="mr-2 text-primary-600" />
                  <span>
                    <strong>Instructor:</strong> {course.instructor?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FaUsers className="mr-2 text-primary-600" />
                  <span>
                    <strong>{course.studentsEnrolled?.length || 0}</strong> students enrolled
                  </span>
                </div>
              </div>

              {user && user.role === 'student' && (
                <button
                  onClick={() => handleEnroll(course._id)}
                  disabled={enrolling === course._id}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {enrolling === course._id ? (
                    'Enrolling...'
                  ) : (
                    <>
                      <FaCheckCircle className="mr-2" />
                      Enroll Now
                    </>
                  )}
                </button>
              )}

              {!user && (
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <a href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Login to enroll
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
