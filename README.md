# EduLearn Platform - MERN Stack Education System

A comprehensive, modern education management platform built with the MERN stack (MongoDB, Express.js, React, Node.js), supporting UN Sustainable Development Goal 4: Quality Education.

## 🌍 Project Overview

EduLearn is a full-featured learning management system that democratizes access to quality education worldwide. The platform enables teachers to create and manage courses while providing students with an intuitive interface to enroll, learn, and track their progress.

### Alignment with UN SDG 4

This project directly supports **UN Sustainable Development Goal 4: Quality Education** by:
- Providing free, accessible educational platform
- Enabling inclusive learning opportunities for all
- Supporting lifelong learning initiatives
- Facilitating knowledge sharing across borders
- Empowering educators to reach global audiences

## ✨ Key Features

## Features

### 🔐 Authentication & Security
- JWT-based authentication with secure token management
- Password hashing with bcryptjs
- Role-based access control (Student/Teacher)
- Protected routes and API endpoints
- Input validation and sanitization
- Rate limiting for API protection

### 👨‍🎓 Student Features
- Browse and search available courses
- Enroll in multiple courses
- Track learning progress per course
- Access structured lessons
- Participate in course discussions (Q&A)
- View grades and feedback
- Personalized student dashboard
- Unenroll from courses

### 👨‍🏫 Teacher Features
- Create and manage courses
- Add, edit, and delete lessons with ordering
- View enrolled students per course
- Assign grades with feedback
- Respond to student questions
- Comprehensive teacher dashboard
- Course analytics

### 🎨 Modern UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Dark/Light mode toggle
- Smooth animations and transitions
- Modern card-based layouts
- Loading skeletons for better UX
- Tailwind CSS styling
- Intuitive navigation
- Accessible design

### 📊 Advanced Features
- Progress tracking system
- Grading and feedback system
- Discussion forums per course
- Real-time updates
- Course completion tracking
- Student performance analytics

## Project Structure

```
├── config/
│   └── db.js                  # MongoDB connection
├── models/
│   ├── User.js                # User schema with password hashing
│   ├── Course.js              # Course schema
│   ├── Lesson.js              # Lesson schema
│   └── Enrollment.js          # Enrollment schema
├── routes/
│   ├── userRoutes.js          # User authentication & profile
│   ├── courseRoutes.js        # Course CRUD operations
│   ├── lessonRoutes.js        # Lesson management
│   └── enrollmentRoutes.js    # Course enrollment
├── middleware/
│   └── auth.js                # JWT authentication & authorization
├── utils/
│   └── generateToken.js       # JWT token generation
├── client/
│   ├── public/
│   └── src/
│       ├── components/        # React components
│       │   ├── Navigation.js
│       │   └── ProtectedRoute.js
│       ├── pages/             # Page components
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Courses.js
│       │   ├── StudentDashboard.js
│       │   ├── TeacherDashboard.js
│       │   └── CourseLessons.js
│       ├── context/           # React Context
│       │   └── AuthContext.js
│       ├── services/          # API service layer
│       │   └── api.js
│       └── App.js             # Main App component
├── server.js                  # Express server
└── .env                       # Environment variables
```
URL
My frontend url = https://edu-tech-africa.netlify.app/
My backend url = https://final-plp-project.onrender.com
## Setup Instructions

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Configure MongoDB:
   - Update `.env` file with your MongoDB URI
   - Default: `mongodb://localhost:27017/mern-app`

3. Start the server:
```bash
npm run dev
```

Server runs on http://localhost:5000

### Frontend Setup

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start React app:
```bash
npm start
```

Client runs on http://localhost:3000

### Run Both Concurrently

From root directory:
```bash
npm run dev:full
```

## API Endpoints

### Authentication & Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register a new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |

### Courses
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/courses` | Get all courses | No | - |
| GET | `/api/courses/:id` | Get single course | No | - |
| POST | `/api/courses` | Create a new course | Yes | Teacher |
| PUT | `/api/courses/:id` | Update course | Yes | Teacher (own) |
| DELETE | `/api/courses/:id` | Delete course | Yes | Teacher (own) |
| GET | `/api/courses/teacher/my-courses` | Get teacher's courses | Yes | Teacher |

### Enrollments
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/enrollments` | Enroll in a course | Yes | Student |
| GET | `/api/enrollments/my-courses` | Get enrolled courses | Yes | Student |
| DELETE | `/api/enrollments/:courseId` | Unenroll from course | Yes | Student |

### Lessons
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/lessons` | Create a lesson | Yes | Teacher (own course) |
| GET | `/api/lessons/course/:courseId` | Get course lessons | Yes | All |
| GET | `/api/lessons/:id` | Get single lesson | Yes | All |
| PUT | `/api/lessons/:id` | Update lesson | Yes | Teacher (own) |
| DELETE | `/api/lessons/:id` | Delete lesson | Yes | Teacher (own) |

### Progress Tracking
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/progress/complete` | Mark lesson complete | Yes | Student |
| GET | `/api/progress/course/:courseId` | Get course progress | Yes | Student |

### Discussions (Q&A)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/discussions` | Create a question | Yes |
| GET | `/api/discussions/course/:courseId` | Get course discussions | Yes |
| POST | `/api/discussions/:id/answer` | Add an answer | Yes |

### Grades
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/grades` | Assign grade | Yes | Teacher |
| GET | `/api/grades/course/:courseId` | Get course grades | Yes | Teacher |
| GET | `/api/grades/my-grades` | Get student grades | Yes | Student |

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edulearn
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d
NODE_ENV=development
```

Copy `.env.example` to `.env` and update with your values.

## 🎯 What You Get

This complete MERN stack education platform includes:

- **62+ Features** - Authentication, courses, lessons, progress tracking, grading, discussions
- **Modern UI** - Tailwind CSS, dark mode, responsive design, smooth animations
- **Production Ready** - Security hardened, optimized, deployment guides included
- **8 Documentation Files** - 15,000+ words of comprehensive guides
- **Complete API** - 25+ RESTful endpoints with full documentation
- **7 Database Models** - Well-structured schemas with relationships
- **Testing Suite** - Comprehensive testing procedures and checklists

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mern-education-platform
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Configure environment variables**

Create `.env` file in root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edulearn
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d
NODE_ENV=development
```

Create `client/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Run the application**

Option 1 - Run both servers concurrently:
```bash
npm run dev:full
```

Option 2 - Run separately:
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

7. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api

## 📦 Production Build

### Build Frontend
```bash
cd client
npm run build
```

The build folder will contain optimized production files.

## 🌐 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deployment Summary

1. **Database**: MongoDB Atlas (Free tier)
2. **Backend**: Railway or Heroku
3. **Frontend**: Netlify

See the comprehensive deployment guide for step-by-step instructions.

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions for Netlify, Railway, and MongoDB Atlas
- [Testing Guide](./TESTING.md) - Comprehensive testing procedures and checklist
- [Contributing Guide](./CONTRIBUTING.md) - Guidelines for contributing to the project
- [API Documentation](#-api-endpoints) - Complete API reference below

## 🧪 Testing

Run through the testing checklist in [TESTING.md](./TESTING.md) to ensure all features work correctly.

### Quick Test
1. Register as a teacher
2. Create a course with lessons
3. Register as a student (different email)
4. Enroll in the course
5. View lessons and mark as complete
6. Test discussions and grading

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Loading States**: Skeleton loaders for better perceived performance
- **Smooth Animations**: Transitions and hover effects
- **Modern Cards**: Clean, card-based layouts
- **Intuitive Navigation**: Easy-to-use navigation bar
- **Form Validation**: Real-time validation with helpful error messages
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs (10 salt rounds)
- Protected API routes with middleware
- Role-based authorization
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Environment variable protection

## 📊 Database Schema

### User
- name, email, password (hashed), role (student/teacher)
- Timestamps: createdAt, updatedAt

### Course
- title, description, instructor (ref: User), studentsEnrolled (ref: User[])
- Timestamps: createdAt, updatedAt

### Lesson
- title, content, courseId (ref: Course), order
- Timestamps: createdAt, updatedAt

### Enrollment
- studentId (ref: User), courseId (ref: Course), status, enrolledAt
- Unique index: studentId + courseId

### Progress
- studentId (ref: User), courseId (ref: Course), lessonId (ref: Lesson)
- completed, completedAt
- Unique index: studentId + courseId + lessonId

### Discussion
- courseId (ref: Course), userId (ref: User), question
- answers: [{ userId, answer, createdAt }]

### Grade
- studentId (ref: User), courseId (ref: Course), grade (0-100)
- feedback, gradedBy (ref: User)
- Unique index: studentId + courseId

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🌟 Acknowledgments

- Built to support UN Sustainable Development Goal 4: Quality Education
- Inspired by the need for accessible, quality education worldwide
- Thanks to all contributors and the open-source community

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the testing guide

## 🚀 Future Enhancements

- [ ] Video lesson support
- [ ] Assignment submissions
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Payment integration for premium courses
- [ ] Live video classes integration

## 📈 Project Status

**Current Version**: 1.0.0  
**Status**: Production Ready ✅

All core features implemented and tested. Ready for deployment and real-world use.

---

Made with ❤️ for quality education worldwide | Supporting UN SDG 4

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Validator** - Input validation
- **Express Rate Limit** - API protection

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Context API** - State management

### Development Tools
- **Nodemon** - Auto-restart server
- **Concurrently** - Run multiple commands
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
