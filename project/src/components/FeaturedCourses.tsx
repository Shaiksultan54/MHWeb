import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CourseCard from './CourseCard';
import { Course } from '../types';

interface FeaturedCoursesProps {
  courses: Course[];
}

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ courses }) => {
  // Filter featured courses
  const featuredCourses = courses.filter(course => course.isFeatured).slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Featured Courses</h2>
            <p className="text-gray-600 mt-2">Learn from our most popular Mehndi design courses</p>
          </div>
          <Link to="/courses" className="hidden md:flex items-center text-burgundy-600 font-medium hover:text-burgundy-700 transition-colors">
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} featured={true} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link 
            to="/courses" 
            className="inline-flex items-center px-6 py-3 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 transition-colors font-medium"
          >
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;