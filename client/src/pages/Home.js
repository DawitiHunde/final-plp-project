import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaBook, FaUsers, FaChalkboardTeacher, FaGlobe } from 'react-icons/fa';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to EduLearn Platform
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Quality Education for All - Supporting UN SDG 4
            </p>
            <p className="text-lg mb-10 max-w-3xl mx-auto">
              A comprehensive course management system empowering students and teachers 
              to create, share, and access quality educational content worldwide.
            </p>
            
            {user ? (
              <Link 
                to={user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'}
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex justify-center space-x-4">
                <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
                  Get Started
                </Link>
                <Link to="/courses" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-all duration-200 shadow-lg border-2 border-white">
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-200">
              <FaBook className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rich Content</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access diverse courses with structured lessons
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-200">
              <FaUsers className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaborative Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Engage in discussions and Q&A forums
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-200">
              <FaChalkboardTeacher className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your learning journey and achievements
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-200">
              <FaGlobe className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn from anywhere, anytime, on any device
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SDG Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Supporting UN Sustainable Development Goal 4
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Quality Education: Ensure inclusive and equitable quality education and 
            promote lifelong learning opportunities for all. Our platform democratizes 
            access to education, making it available to learners worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
