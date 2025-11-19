import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Navigation;
