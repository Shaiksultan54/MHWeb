import api from './api';

const courseService = {
  async getAllCourses() {
    const { data } = await api.get('/courses');
    return data;
  },

  async getCourseById(id: string) {
    const { data } = await api.get(`/courses/${id}`);
    return data;
  },

  async createCourse(courseData: FormData) {
    const { data } = await api.post('/courses', courseData);
    return data;
  },

  async updateCourse(id: string, courseData: FormData) {
    const { data } = await api.put(`/courses/${id}`, courseData);
    return data;
  },

  async deleteCourse(id: string) {
    const { data } = await api.delete(`/courses/${id}`);
    return data;
  }
};

export default courseService;