import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://final-plp-project.onrender.com';
const api = axios.create({
  baseURL: API_BASE_URL,
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
  login: (credentials) => api.post('/api/users/login', credentials),
  getProfile: () => api.get('/api/users/profile'),
  updateProfile: (userData) => api.put('/api/users/profile', userData)
};

export const courseService = {
  getAllCourses: () => api.get('/api/courses'),
  getCourse: (id) => api.get(`/api/courses/${id}`),
  createCourse: (courseData) => api.post('/api/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/api/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/api/courses/${id}`),
  getTeacherCourses: () => api.get('/api/courses/teacher/my-courses')
};

export const enrollmentService = {
  enroll: (courseId) => api.post('/api/enrollments', { courseId }),
  getMyEnrollments: () => api.get('/api/enrollments/my-courses'),
  unenroll: (courseId) => api.delete(`/api/enrollments/${courseId}`)
};

export const lessonService = {
  createLesson: (lessonData) => api.post('/api/lessons', lessonData),
  getCourseLessons: (courseId) => api.get(`/api/lessons/course/${courseId}`),
  getLesson: (id) => api.get(`/api/lessons/${id}`),
  updateLesson: (id, lessonData) => api.put(`/api/lessons/${id}`, lessonData),
  deleteLesson: (id) => api.delete(`/api/lessons/${id}`)
};

export const progressService = {
  markComplete: (courseId, lessonId) => api.post('/api/progress/complete', { courseId, lessonId }),
  getCourseProgress: (courseId) => api.get(`/api/progress/course/${courseId}`)
};

export const discussionService = {
  createQuestion: (courseId, question) => api.post('/api/discussions', { courseId, question }),
  getCourseDiscussions: (courseId) => api.get(`/api/discussions/course/${courseId}`),
  addAnswer: (discussionId, answer) => api.post(`/api/discussions/${discussionId}/answer`, { answer })
};

export const gradeService = {
  assignGrade: (gradeData) => api.post('/api/grades', gradeData),
  getCourseGrades: (courseId) => api.get(`/api/grades/course/${courseId}`),
  getMyGrades: () => api.get('/api/grades/my-grades')
};

export default api;