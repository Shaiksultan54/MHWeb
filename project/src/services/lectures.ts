import api from './api';

const lectureService = {
  async getLecturesByCourse(courseId: string) {
    const { data } = await api.get(`/lectures/course/${courseId}`);
    return data;
  },

  async createLecture(lectureData: FormData) {
    const { data } = await api.post('/lectures', lectureData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },

  async updateLecture(id: string, lectureData: FormData) {
    const { data } = await api.put(`/lectures/${id}`, lectureData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },

  async deleteLecture(id: string) {
    const { data } = await api.delete(`/lectures/${id}`);
    return data;
  }
};

export default lectureService;