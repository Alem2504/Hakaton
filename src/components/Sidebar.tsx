// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Brain,
  Utensils,
  Timer,
  Pill,
  PlayCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface MenuItem {
  label: string;
  route: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { label: 'Profil', route: '/profile', icon: Brain },
  { label: 'Zdravstveni podaci', route: '/health-data', icon: Utensils },
  { label: 'Uredi podatke', route: '/edit-health-form', icon: Timer },
  { label: 'Preporuke', route: '/recommendations', icon: Pill },
  { label: 'Grafovi', route: '/visuals', icon: PlayCircle },
  { label: 'Simulacije', route: '/simulations', icon: PlayCircle },
  { label: 'Postavke', route: '/settings', icon: Settings },
];

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => (
  <div
    className={`h-screen bg-white shadow-lg p-4 transform fixed lg:relative lg:translate-x-0 z-30 w-64 transition-transform duration-200 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <button onClick={toggle} className="mb-6 focus:outline-none">
      {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </button>

    <nav className="flex flex-col gap-2">
      {menuItems.map(({ label, route, icon: Icon }, idx) => (
        <NavLink
          key={idx}
          to={route}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 text-sm rounded hover:bg-gray-100 transition-colors ${
              isActive ? 'bg-gray-200 font-medium' : 'text-gray-700'
            }`
          }
        >
          <Icon size={20} />
          {isOpen && <span>{label}</span>}
        </NavLink>
      ))}
    </nav>
  </div>
);

export default Sidebar;
