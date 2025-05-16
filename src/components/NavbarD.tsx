import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Activity className="h-6 w-6 text-blue-600" />
            <span>BioTwin</span>
          </NavLink>
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <NavLink 
                  to="/patients" 
                  className={({isActive}) => 
                    `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition-colors'}`
                  }
                >
                  Patients
                </NavLink>
                </li>
              <li>
                 <NavLink
                  to="/appointments"
                  className={({isActive}) =>
                    `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition-colors'}`
                  }
                >
                  Appointments
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/doctor-dashboard"
                  className={({isActive}) => 
                    `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600 transition-colors'}`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;