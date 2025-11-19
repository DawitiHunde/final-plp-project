import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://final-plp-project.onrender.com';
const api = axios.create({
  baseURL: API_BASE_URL,  // ← FIXED: Changed API_URL to API_BASE_URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const userService = {
  register: (userData) => api.post('/api/users/register', userData),

  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData)
};

export const courseService = {
  getAllCourses: () => api.get('/courses'),
  getCourse: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  getTeacherCourses: () => api.get('/courses/teacher/my-courses')
};

export const enrollmentService = {
  enroll: (courseId) => api.post('/enrollments', { courseId }),
  getMyEnrollments: () => api.get('/enrollments/my-courses'),
  unenroll: (courseId) => api.delete(`/enrollments/${courseId}`)
};

export const lessonService = {
  createLesson: (lessonData) => api.post('/lessons', lessonData),
  getCourseLessons: (courseId) => api.get(`/lessons/course/${courseId}`),
  getLesson: (id) => api.get(`/lessons/${id}`),
  updateLesson: (id, lessonData) => api.put(`/lessons/${id}`, lessonData),
  deleteLesson: (id) => api.delete(`/lessons/${id}`)
};

export const progressService = {
  markComplete: (courseId, lessonId) => api.post('/progress/complete', { courseId, lessonId }),
  getCourseProgress: (courseId) => api.get(`/progress/course/${courseId}`)
};

export const discussionService = {
  createQuestion: (courseId, question) => api.post('/discussions', { courseId, question }),
  getCourseDiscussions: (courseId) => api.get(`/discussions/course/${courseId}`),
  addAnswer: (discussionId, answer) => api.post(`/discussions/${discussionId}/answer`, { answer })
};

export const gradeService = {
  assignGrade: (gradeData) => api.post('/grades', gradeData),
  getCourseGrades: (courseId) => api.get(`/grades/course/${courseId}`),
  getMyGrades: () => api.get('/grades/my-grades')
};

export default api;