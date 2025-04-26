import React from 'react';
import { Link } from 'react-router-dom';
import { AtSign, Mail, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <AtSign className="h-6 w-6 text-burgundy-400 mr-2" />
              <span className="text-xl font-bold">MehndiMaster</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the art of Mehndi with our expert-led courses. From beginners to advanced, 
              we have the perfect course to help you master this beautiful art form.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-burgundy-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-burgundy-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-burgundy-400 transition">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-burgundy-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white transition">Courses</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition">Login</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-burgundy-400">Popular Courses</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Bridal Mehndi Masterclass</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Beginner's Guide to Mehndi</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Arabic Mehndi Techniques</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Indo-Western Fusion Mehndi</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-burgundy-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-burgundy-400 mr-2 mt-0.5" />
                <span className="text-gray-400">support@mehndimaster.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-burgundy-400 mr-2 mt-0.5" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MehndiMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;