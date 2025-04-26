import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, Trash2, Play } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [lectureTitle, setLectureTitle] = useState<string>('');
  const [lectureDescription, setLectureDescription] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) fetchLectures(selectedCourse);
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get('/api/courses');
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setCourses([]);
    }
  };

  const fetchLectures = async (courseId: string) => {
    try {
      const { data } = await axios.get(`/api/lectures/course/${courseId}`);
      setLectures(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch lectures:', error);
      setLectures([]);
    }
  };

  const handleVideoUpload = async (e: React.FormEvent<HTMLFormElement>) => {
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
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      });

      // Reset fields
      setLectureTitle('');
      setLectureDescription('');
      setVideoFile(null);
      setUploadProgress(0);
      fetchLectures(selectedCourse);

    } catch (error) {
      console.error('Video upload failed:', error);
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
      console.error('Failed to delete lecture:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 bg-gray-100">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Upload Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Upload New Lecture</h2>

              <form onSubmit={handleVideoUpload} className="space-y-5">
                
                {/* Select Course */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Select Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-burgundy-500"
                    required
                  >
                    <option value="">-- Select a Course --</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lecture Title */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Lecture Title</label>
                  <input
                    type="text"
                    value={lectureTitle}
                    onChange={(e) => setLectureTitle(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-burgundy-500"
                    required
                  />
                </div>

                {/* Lecture Description */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Lecture Description</label>
                  <textarea
                    value={lectureDescription}
                    onChange={(e) => setLectureDescription(e.target.value)}
                    rows={4}
                    className="w-full p-2 border rounded-md focus:ring-burgundy-500"
                  />
                </div>

                {/* Upload Video */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Upload Video</label>
                  <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center">
                    <Upload className="mx-auto mb-2 text-gray-400" size={48} />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="video-upload"
                      required
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer text-burgundy-600 font-medium hover:underline"
                    >
                      {videoFile ? videoFile.name : 'Click to upload'}
                    </label>
                    <p className="text-xs text-gray-400 mt-1">Supported: MP4, WebM (Max: 100MB)</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-burgundy-600 h-2.5"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Upload Lecture'}
                </button>

              </form>
            </section>

            {/* Lectures List */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Course Lectures</h2>

              {selectedCourse ? (
                lectures.length > 0 ? (
                  <div className="space-y-4">
                    {lectures.map((lecture) => (
                      <div key={lecture._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-3">
                          <Play className="text-burgundy-600" size={20} />
                          <div>
                            <h3 className="font-medium text-gray-800">{lecture.title}</h3>
                            <p className="text-xs text-gray-500">{lecture.duration || 'Duration not available'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteLecture(lecture._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">No lectures uploaded yet.</p>
                )
              ) : (
                <p className="text-gray-500 text-center">Please select a course to view its lectures.</p>
              )}
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
