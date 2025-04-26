import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, featured = false }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        featured ? 'transform hover:-translate-y-2 transition-transform duration-300' : ''
      }`}
    >
      <div className="relative">
        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="w-full h-52 object-cover"
        />
        
        {featured && (
          <div className="absolute top-4 right-4 bg-burgundy-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-400" />
            <span className="text-white ml-1 text-sm">{course.rating.toFixed(1)}</span>
            <span className="text-gray-300 mx-2 text-xs">•</span>
            <Users className="h-4 w-4 text-gray-300" />
            <span className="text-white ml-1 text-sm">{course.totalStudents.toLocaleString()} students</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{course.title}</h3>
            <div className="flex items-center mb-2">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name} 
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
              <span className="text-sm text-gray-600">{course.instructor.name}</span>
            </div>
          </div>
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level}
          </span>
        </div>

        <p className="text-gray-600 text-sm mt-3 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{course.duration}</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-burgundy-600 font-bold">{formatPrice(course.price)}</span>
          <Link 
            to={`/courses/${course.id}`}
            className="px-4 py-2 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 transition-colors text-sm font-medium"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;