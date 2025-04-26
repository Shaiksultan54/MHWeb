import React from 'react';
import { Clock, Users, Star, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseDetailHeaderProps {
  course: Course;
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({ course }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${course.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-8">
          <Link
            to="/courses"
            className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Courses
          </Link>
        </div>
        
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center space-x-2 mb-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded ${
              course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
              course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {course.level}
            </span>
            
            <div className="flex items-center text-white">
              <Star className="h-4 w-4 text-amber-400 mr-1" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="mx-1">•</span>
              <span>{course.totalStudents.toLocaleString()} students</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {course.title}
          </h1>
          
          <p className="text-gray-200 text-lg mb-6 max-w-3xl">
            {course.description}
          </p>
          
          <div className="flex items-center mb-8">
            <img 
              src={course.instructor.avatar} 
              alt={course.instructor.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-white mr-3" 
            />
            <div>
              <p className="text-white font-medium">{course.instructor.name}</p>
              <p className="text-gray-300 text-sm">Instructor</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center text-white">
              <Clock className="h-5 w-5 mr-2 text-burgundy-300" />
              <span>{course.duration} of content</span>
            </div>
            
            <div className="flex items-center text-white">
              <Users className="h-5 w-5 mr-2 text-burgundy-300" />
              <span>Join {course.totalStudents.toLocaleString()} learners</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mt-8 md:absolute md:top-1/2 md:right-8 md:transform md:-translate-y-1/2">
          <div className="text-3xl font-bold text-gray-900 mb-4">
            {formatPrice(course.price)}
          </div>
          
          <button
            className="w-full bg-burgundy-600 hover:bg-burgundy-700 text-white font-semibold py-3 px-4 rounded-md transition-colors mb-4"
          >
            Enroll Now
          </button>
          
          <button
            className="w-full bg-transparent border border-burgundy-600 text-burgundy-600 font-semibold py-3 px-4 rounded-md hover:bg-burgundy-50 transition-colors"
          >
            Try For Free
          </button>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>30-Day Money-Back Guarantee</p>
            <p className="mt-2">Full Lifetime Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;