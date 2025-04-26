import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import CourseFilter from '../components/CourseFilter';
import { Course } from '../types';
import { courses as allCourses } from '../data/courses';

const CoursesPage: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(allCourses);
  const [filters, setFilters] = useState({
    search: '',
    level: [] as string[],
    priceRange: null as [number, number] | null,
  });

  // Apply filters when they change
  useEffect(() => {
    let result = [...allCourses];
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm) ||
          course.instructor.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Level filter
    if (filters.level.length > 0) {
      result = result.filter(course => filters.level.includes(course.level));
    }
    
    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(course => course.price >= min && course.price <= max);
    }
    
    setFilteredCourses(result);
  }, [filters]);

  const handleFilterChange = (newFilters: {
    search: string,
    level: string[],
    priceRange: [number, number] | null
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-burgundy-800 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Browse Our Mehndi Courses</h1>
            <p className="text-burgundy-100 max-w-2xl">
              Discover a wide range of courses designed to help you master the art of Mehndi, 
              from beginner techniques to advanced bridal designs.
            </p>
          </div>
        </div>
        
        {/* Courses Section */}
        <div className="container mx-auto px-4 py-12">
          {/* Filters */}
          <CourseFilter onFilterChange={handleFilterChange} />
          
          {/* Course Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredCourses.length}</span> courses
            </p>
          </div>
          
          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <button
                onClick={() => setFilters({ search: '', level: [], priceRange: null })}
                className="px-4 py-2 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;