import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://final-plp-project.onrender.com';
const api = axios.create({
  baseURL: API_BASE_URL + '/api',  // Add /api here ONLY
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
  register: (userData) => api.post('/users/register', userData),  // Remove /api
  login: (credentials) => api.post('/users/login', credentials),  // Remove /api
  getProfile: () => api.get('/users/profile'),  // Remove /api
  updateProfile: (userData) => api.put('/users/profile', userData)  // Remove /api
};

export const courseService = {
  getAllCourses: () => api.get('/courses'),  // Remove /api
  getCourse: (id) => api.get(`/courses/${id}`),  // Remove /api
  createCourse: (courseData) => api.post('/courses', courseData),  // Remove /api
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),  // Remove /api
  deleteCourse: (id) => api.delete(`/courses/${id}`),  // Remove /api
  getTeacherCourses: () => api.get('/courses/teacher/my-courses')  // Remove /api
};

export const enrollmentService = {
  enroll: (courseId) => api.post('/enrollments', { courseId }),  // Remove /api
  getMyEnrollments: () => api.get('/enrollments/my-courses'),  // Remove /api
  unenroll: (courseId) => api.delete(`/enrollments/${courseId}`)  // Remove /api
};

export const lessonService = {
  createLesson: (lessonData) => api.post('/lessons', lessonData),  // Remove /api
  getCourseLessons: (courseId) => api.get(`/lessons/course/${courseId}`),  // Remove /api
  getLesson: (id) => api.get(`/lessons/${id}`),  // Remove /api
  updateLesson: (id, lessonData) => api.put(`/lessons/${id}`, lessonData),  // Remove /api
  deleteLesson: (id) => api.delete(`/lessons/${id}`)  // Remove /api
};

export const progressService = {
  markComplete: (courseId, lessonId) => api.post('/progress/complete', { courseId, lessonId }),  // Remove /api
  getCourseProgress: (courseId) => api.get(`/progress/course/${courseId}`)  // Remove /api
};

export const discussionService = {
  createQuestion: (courseId, question) => api.post('/discussions', { courseId, question }),  // Remove /api
  getCourseDiscussions: (courseId) => api.get(`/discussions/course/${courseId}`),  // Remove /api
  addAnswer: (discussionId, answer) => api.post(`/discussions/${discussionId}/answer`, { answer })  // Remove /api
};

export const gradeService = {
  assignGrade: (gradeData) => api.post('/grades', gradeData),  // Remove /api
  getCourseGrades: (courseId) => api.get(`/grades/course/${courseId}`),  // Remove /api
  getMyGrades: () => api.get('/grades/my-grades')  // Remove /api
};

export default api;