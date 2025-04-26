import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, AtSign, LogOut } from 'lucide-react';
import authService from '../services/auth'; // Adjust path if needed

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (authService.isAuthenticated()) {
        const userData = await authService.getCurrentUser();
        setUser(userData?.user || null);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [location.pathname]); // refetch user if route changes

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const linkClasses = `transition-all duration-300 hover:text-burgundy-600 ${
    isScrolled ? 'text-gray-800' : 'text-white'
  }`;

  const activeLinkClasses = `transition-all duration-300 ${
    isScrolled ? 'text-burgundy-600 font-semibold' : 'text-white font-semibold underline underline-offset-4'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <AtSign className={`h-6 w-6 mr-2 ${isScrolled ? 'text-burgundy-600' : 'text-white'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-burgundy-600' : 'text-white'}`}>
              MehndiMaster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={location.pathname === '/' ? activeLinkClasses : linkClasses}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={location.pathname === '/courses' ? activeLinkClasses : linkClasses}
            >
              Courses
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md bg-burgundy-600 text-white hover:bg-burgundy-700 transition-all"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-md bg-burgundy-600 text-white hover:bg-burgundy-700 transition-all"
              >
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`focus:outline-none ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 pb-4 border-t border-gray-200 bg-white shadow-md rounded-b-lg">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:text-burgundy-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block px-4 py-2 text-gray-800 hover:text-burgundy-600"
              onClick={toggleMenu}
            >
              Courses
            </Link>

            {user ? (
              <>
                <div className="block px-4 py-2 text-gray-800">
                  {user.name}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-4 py-2 mt-2 mx-4 bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 mt-2 mx-4 text-center bg-burgundy-600 text-white rounded-md hover:bg-burgundy-700"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
