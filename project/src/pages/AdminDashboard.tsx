import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, Plus, Trash2, Play, Edit2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard: React.FC = () => {
  // Initialize courses as an empty array
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureDescription, setLectureDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [lectures, setLectures] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchLectures(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get('/api/courses');
      // Ensure data is an array, otherwise set empty array
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Set empty array on error to prevent mapping issues
      setCourses([]);
    }
  };

  const fetchLectures = async (courseId: string) => {
    try {
      const { data } = await axios.get(`/api/lectures/course/${courseId}`);
      // Ensure data is an array, otherwise set empty array
      setLectures(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      setLectures([]);
    }
  };

  const handleVideoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !selectedCourse || !lectureTitle) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', lectureTitle);
    formData.append('description', lectureDescription);
    formData.append('courseId', selectedCourse);
    formData.append('order', String(lectures.length + 1));

    try {
      await axios.post('/api/lectures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          setUploadProgress(progress);
        }
      });

      setLectureTitle('');
      setLectureDescription('');
      setVideoFile(null);
      setUploadProgress(0);
      fetchLectures(selectedCourse);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLecture = async (lectureId: string) => {
    if (!window.confirm('Are you sure you want to delete this lecture?')) return;

    try {
      await axios.delete(`/api/lectures/${lectureId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchLectures(selectedCourse);
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Upload Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload New Lecture</h2>

              <form onSubmit={handleVideoUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Course
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    required
                  >
                    <option value="">Select a course</option>
                    {Array.isArray(courses) && courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    value={lectureTitle}
                    onChange={(e) => setLectureTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture Description
                  </label>
                  <textarea
                    value={lectureDescription}
                    onChange={(e) => setLectureDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-burgundy-500 focus:border-burgundy-500"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Video
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-burgundy-600 hover:text-burgundy-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-burgundy-500">
                          <span>Upload a video</span>
                          <input
                            type="file"
                            accept="video/*"
                            className="sr-only"
                            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                            required
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">MP4, WebM up to 100MB</p>
                    </div>
                  </div>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-burgundy-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-burgundy-600 text-white py-2 px-4 rounded-md hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Upload Lecture'}
                </button>
              </form>
            </div>

            {/* Lectures List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Lectures</h2>
              
              {selectedCourse ? (
                Array.isArray(lectures) && lectures.length > 0 ? (
                  <div className="space-y-4">
                    {lectures.map((lecture) => (
                      <div key={lecture._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Play className="h-5 w-5 text-burgundy-600" />
                          <div>
                            <h3 className="font-medium text-gray-900">{lecture.title}</h3>
                            <p className="text-sm text-gray-500">{lecture.duration}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDeleteLecture(lecture._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">No lectures found for this course</p>
                )
              ) : (
                <p className="text-gray-500 text-center">Select a course to view lectures</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;