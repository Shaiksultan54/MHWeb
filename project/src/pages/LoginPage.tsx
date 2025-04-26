import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const LoginPage: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-900">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto">
            {/* Left side: Content */}
            <div className="w-full md:w-1/2 text-white mb-10 md:mb-0 md:pr-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our Creative Community of Mehndi Artists
              </h1>
              <p className="text-burgundy-100 text-lg mb-8">
                Sign in to access your purchased courses, track your progress, and continue your 
                journey to mastering the beautiful art of Mehndi design.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold">Access to Premium Courses</h3>
                    <p className="mt-1 text-burgundy-200">Learn from experienced Mehndi artists at your own pace.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold">Progress Tracking</h3>
                    <p className="mt-1 text-burgundy-200">Save your progress and continue where you left off.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold">Community Support</h3>
                    <p className="mt-1 text-burgundy-200">Connect with fellow learners and share your creations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side: Form */}
            <div className="w-full md:w-1/2">
              {isLoginForm ? (
                <LoginForm onToggleForm={toggleForm} />
              ) : (
                <SignupForm onToggleForm={toggleForm} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;