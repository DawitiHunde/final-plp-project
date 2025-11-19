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

//  Main API endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'MERN Education API is running successfully!',
    version: '1.0',
    endpoints: {
      main: '/api',
      users: '/api/users',
      auth: '/api/auth',
      courses: '/api/courses',
      lessons: '/api/lessons',
      enrollments: '/api/enrollments'
    },
    timestamp: new Date().toISOString()
  });
});

// 2. Auth route (since you tried /auth)
app.get('/auth', (req, res) => {
  res.redirect('/api/auth');
});

app.get('/api/auth', (req, res) => {
  res.json({ 
    message: 'Auth endpoints',
    endpoints: {
      login: 'POST /api/users/login',
      register: 'POST /api/users/register',
      profile: 'GET /api/users/profile'
    }
  });
});

// 3. Add other main routes you might need
app.get('/api/courses', (req, res) => {
  res.json({ 
    message: 'Courses endpoint - use specific course routes',
    note: 'This is a placeholder - implement your course logic'
  });
});

app.get('/api/lessons', (req, res) => {
  res.json({ 
    message: 'Lessons endpoint - use specific lesson routes',
    note: 'This is a placeholder - implement your lesson logic'
  });
});

// YOUR EXISTING ROUTE MOUNTS (keep these)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));
// ... add other route files you have

// 4. Catch-all for undefined routes
app.get('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    requestedUrl: req.originalUrl,
    availableEndpoints: {
      main: '/api',
      users: '/api/users',
      auth: '/api/auth',
      courses: '/api/courses'
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
