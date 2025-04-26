import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-burgundy-900 to-gray-900">
      {/* Decorative pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 py-32 relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
          Master the Art of <span className="text-amber-400">Mehndi Design</span> with Expert-Led Courses
        </h1>
        
        <p className="text-xl text-gray-300 mb-10 max-w-2xl">
          Learn traditional and contemporary Mehndi techniques from award-winning artists through high-quality video tutorials.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/courses" 
            className="px-8 py-3 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700 transition-colors font-medium flex items-center justify-center"
          >
            Explore Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          
          <Link 
            to="/login" 
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors font-medium"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white">
            <div className="text-amber-400 text-4xl font-bold mb-2">20+</div>
            <p className="text-gray-300">Specialized Courses</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white">
            <div className="text-amber-400 text-4xl font-bold mb-2">15K+</div>
            <p className="text-gray-300">Active Students</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white">
            <div className="text-amber-400 text-4xl font-bold mb-2">12+</div>
            <p className="text-gray-300">Expert Instructors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;