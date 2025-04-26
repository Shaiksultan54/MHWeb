import React from 'react';
import Hero from '../components/Hero';
import FeaturedCourses from '../components/FeaturedCourses';
import TestimonialSection from '../components/TestimonialSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { courses } from '../data/courses';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCourses courses={courses} />
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our learning platform makes it easy to master Mehndi design through a simple, structured approach
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-burgundy-100 text-burgundy-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Choose a Course</h3>
                <p className="text-gray-600">Browse our catalog and select a course that matches your skill level and interests.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-burgundy-100 text-burgundy-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Learn at Your Pace</h3>
                <p className="text-gray-600">Access high-quality video tutorials anytime, anywhere, and learn at your own convenience.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-burgundy-100 text-burgundy-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Practice & Master</h3>
                <p className="text-gray-600">Apply your skills through guided practice sessions and become a Mehndi design expert.</p>
              </div>
            </div>
          </div>
        </section>
        
        <TestimonialSection />
        
        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-burgundy-700 to-burgundy-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Mehndi Journey?</h2>
            <p className="text-lg text-burgundy-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their artistic skills through our expert-led courses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/courses" 
                className="px-8 py-3 bg-white text-burgundy-700 rounded-md hover:bg-gray-100 transition-colors font-medium"
              >
                Explore Courses
              </a>
              <a 
                href="/login" 
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white/10 transition-colors font-medium"
              >
                Sign Up Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;