import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('currentUser');
    setCurrentUser(email);
  }, [location]); // recheck on route change

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/countries", label: "Countries" },
    { href: "/favorites", label: "Favorites" },
  ];

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'>
      <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16'>

        {/* Logo */}
        <div className='flex items-center gap-1 cursor-pointer'>
          <Link to="/about">
            <img src={logo} alt='WorldScope' className='w-24 h-24 object-contain' />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center md:hidden ml-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-2'>
            {isMenuOpen ? <HiX className='size-6' /> : <HiMenu className='size-6' />}
          </button>
        </div>

        {/* Desktop nav links */}
        <div className='hidden md:flex items-center gap-10'>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${
                location.pathname === link.href
                  ? 'text-blue-600 after:w-full'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Login/Logout button */}
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-100"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className='hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100'>
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 py-4'>
          <div className='container mx-auto px-4 space-y-4'>
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-medium py-2 ${
                  location.pathname === link.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className='w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-red-100'
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className='w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100'>
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
