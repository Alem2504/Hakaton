import React, { useState } from 'react';
import { Menu, X, Activity } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useAuthUser } from "../hooks/useAuthUser"; // putanja prema hooku

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { ime, loading } = useAuthUser();

const handleLogout = async () => {
  await signOut(auth);
  window.location.reload(); // ili navigate('/')
};


  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="fixed w-full bg-white bg-opacity-95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-center items-center h-16">
          <div className="flex items-center">
            <div
                className="absolute left-0 inset-y-0 flex items-center pl-4 cursor-pointer"
                onClick={() => navigate('/')}
            >
              <Activity className="h-8 w-8 text-blue-500"/>
              <span className="ml-2 text-xl font-bold text-gray-900">BioTwin</span>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-8">
              <a href="#"
                 className="text-gray-700 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Home
              </a>
              <a href="#features"
                 className="text-gray-700 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Features
              </a>
              <a href="#how-it-works"
                 className="text-gray-700 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                How it Works
              </a>
              <a href="#contact"
                 className="text-gray-700 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                Contact
              </a>
            </div>
            {!loading && ime ? (
                <div className="flex items-center space-x-4">
                 <span
                     className="text-gray-700 font-medium cursor-pointer hover:text-blue-500 transition"
                     onClick={() => navigate("/dashboard")}>
                   👤 {ime}
                  </span>
                  <Button variant="secondary" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>Login</Button>
                  <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Register</Button>
                </div>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true"/>
              ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true"/>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <a href="#" className="text-gray-700 hover:text-blue-500 block px-3 py-2 text-base font-medium rounded-md">
            Home
          </a>
          <a href="#features" className="text-gray-700 hover:text-blue-500 block px-3 py-2 text-base font-medium rounded-md">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-blue-500 block px-3 py-2 text-base font-medium rounded-md">
            How it Works
          </a>
          <a href="#contact" className="text-gray-700 hover:text-blue-500 block px-3 py-2 text-base font-medium rounded-md">
            Contact
          </a>
          <div className="flex flex-col space-y-2 pt-2">
            <Button variant="secondary" fullWidth onClick={() => navigate('/login')}>Login</Button>
            <Button variant="primary" fullWidth onClick={() => navigate('/register')}>Register</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;