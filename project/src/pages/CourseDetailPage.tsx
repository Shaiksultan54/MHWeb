import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseDetailHeader from '../components/CourseDetailHeader';
import { Course } from '../types';
import { courses } from '../data/courses';
import { BookOpen, Video, Award, CheckCircle } from 'lucide-react';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading course...</div>
      </div>
    );
  }

  const courseCurriculum = [
    { 
      id: 1, 
      title: 'Introduction to Mehndi', 
      lessons: [
        { id: 1, title: 'History and Cultural Significance', duration: '15 min', type: 'video' },
        { id: 2, title: 'Tools and Materials', duration: '20 min', type: 'video' },
        { id: 3, title: 'Preparing Your Henna Paste', duration: '25 min', type: 'video' },
      ]
    },
    { 
      id: 2, 
      title: 'Basic Techniques', 
      lessons: [
        { id: 4, title: 'Essential Strokes and Patterns', duration: '30 min', type: 'video' },
        { id: 5, title: 'Creating Simple Motifs', duration: '35 min', type: 'video' },
        { id: 6, title: 'Practice Exercise: Basic Patterns', duration: '15 min', type: 'exercise' },
      ]
    },
    { 
      id: 3, 
      title: 'Advanced Techniques', 
      lessons: [
        { id: 7, title: 'Complex Pattern Development', duration: '40 min', type: 'video' },
        { id: 8, title: 'Creating Full Designs', duration: '45 min', type: 'video' },
        { id: 9, title: 'Final Project', duration: '60 min', type: 'project' },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <CourseDetailHeader course={course} />
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 font-medium text-sm border-b-2 ${
                  activeTab === 'overview' 
                    ? 'border-burgundy-600 text-burgundy-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`py-4 font-medium text-sm border-b-2 ${
                  activeTab === 'curriculum' 
                    ? 'border-burgundy-600 text-burgundy-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`py-4 font-medium text-sm border-b-2 ${
                  activeTab === 'instructor' 
                    ? 'border-burgundy-600 text-burgundy-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Instructor
              </button>
            </nav>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="container mx-auto px-4 py-8">
          {activeTab === 'overview' && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  {[
                    "Master fundamental Mehndi patterns and techniques",
                    "Create intricate designs for various occasions",
                    "Understand mixing and application for the perfect consistency",
                    "Learn to adapt designs for different body parts",
                    "Develop your unique artistic style",
                    "Practice with guided projects and exercises",
                    "Understand cultural context and symbolism",
                    "Professional tips for working with clients"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-burgundy-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Description</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    This comprehensive course will guide you through the beautiful art of Mehndi design, from basic techniques to advanced patterns. Whether you're a complete beginner or looking to enhance your existing skills, this course provides step-by-step instruction to help you create stunning Mehndi designs with confidence.
                  </p>
                  <p className="mb-4">
                    Each lesson is carefully structured to build upon previous techniques, ensuring a solid foundation in Mehndi artistry. You'll learn about the cultural significance of different patterns, how to prepare and apply henna for optimal results, and techniques for creating designs for different occasions.
                  </p>
                  <p>
                    By the end of this course, you'll have the skills and knowledge to create beautiful Mehndi designs for yourself and others, whether for personal enjoyment, special celebrations, or as a professional service.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Includes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                    <Video className="h-8 w-8 text-burgundy-600 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-1">10+ Hours of Video</h3>
                    <p className="text-sm text-gray-600">HD quality tutorials</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                    <BookOpen className="h-8 w-8 text-burgundy-600 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-1">15 Lessons</h3>
                    <p className="text-sm text-gray-600">Comprehensive curriculum</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                    <Award className="h-8 w-8 text-burgundy-600 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-1">Certificate</h3>
                    <p className="text-sm text-gray-600">Upon completion</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50">
                    <CheckCircle className="h-8 w-8 text-burgundy-600 mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-1">Lifetime Access</h3>
                    <p className="text-sm text-gray-600">Learn at your own pace</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'curriculum' && (
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Curriculum</h2>
              
              <div className="space-y-6">
                {courseCurriculum.map(section => (
                  <div key={section.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-5 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Section {section.id}: {section.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {section.lessons.length} lessons
                      </p>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      {section.lessons.map(lesson => (
                        <div key={lesson.id} className="p-5 flex justify-between items-center">
                          <div className="flex items-start">
                            {lesson.type === 'video' ? (
                              <Video className="h-5 w-5 text-burgundy-600 mr-3 flex-shrink-0 mt-0.5" />
                            ) : lesson.type === 'exercise' ? (
                              <BookOpen className="h-5 w-5 text-burgundy-600 mr-3 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Award className="h-5 w-5 text-burgundy-600 mr-3 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <h4 className="text-gray-800 font-medium">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {lesson.type === 'video' ? 'Video Lesson' : 
                                 lesson.type === 'exercise' ? 'Practice Exercise' : 
                                 'Project Assignment'}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'instructor' && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-burgundy-100"
                  />
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {course.instructor.name}
                    </h2>
                    <p className="text-burgundy-600 font-medium mb-4">
                      Mehndi Artist & Instructor
                    </p>
                    
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        {course.instructor.bio}
                      </p>
                      <p>
                        With a passion for teaching and a commitment to preserving traditional art forms, 
                        {course.instructor.name} has helped thousands of students worldwide discover the 
                        beauty and cultural significance of Mehndi design.
                      </p>
                    </div>
                    
                    <div className="mt-6 flex space-x-4">
                      <a 
                        href="#" 
                        className="text-burgundy-600 hover:text-burgundy-700 font-medium"
                      >
                        View All Courses
                      </a>
                      <a 
                        href="#" 
                        className="text-burgundy-600 hover:text-burgundy-700 font-medium"
                      >
                        Contact Instructor
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;