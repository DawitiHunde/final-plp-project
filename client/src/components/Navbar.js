import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon, FaGraduationCap } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaGraduationCap className="text-3xl text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Education
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/courses" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Courses
            </Link>

            {user && (
              <Link 
                to={user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>

            {user ? (
              <button onClick={logout} className="btn-primary">
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
