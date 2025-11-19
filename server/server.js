require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/', limiter);

// Add this route - Main API endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'MERN API is running successfully!',
    version: '1.0',
    endpoints: {
      users: '/api/users',
      auth: '/api/users/login & /api/users/register',
      // add other endpoints you have
    }
  });
});

// Routes

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/discussions', require('./routes/discussionRoutes'));
app.use('/api/grades', require('./routes/gradeRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'MERN API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
