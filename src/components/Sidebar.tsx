// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  User,
  FileText,
  Edit,
  HeartPulse,
  BarChart,
  Activity,
  Settings, ThermometerIcon,
} from 'lucide-react';

interface MenuItem {
  label: string;
  route: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { label: 'Profil', route: '/profile-view', icon: User },
  { label: 'Uredi profil', route: '/edit-health-form', icon: Edit },
  { label: 'Faktori rizika', route: '/prediction', icon: FileText },
  { label: 'Zdravstveni podaci', route: '/health-data', icon: HeartPulse },
  { label: 'Predikcija', route: '/ai', icon: Activity },
  { label: 'Preporuke', route: '/recommendations', icon: FileText },
  { label: 'Grafovi', route: '/graph', icon: BarChart },
  {label: 'Terapije', route: '/therapis', icon: ThermometerIcon},
  {label: 'Nalazi', route: '/nalazi', icon: ThermometerIcon},
  {label: 'Dijagnoza', route: '/dijagnoza', icon: ThermometerIcon},
  { label: 'Logout', route: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => (
  <div className="h-screen bg-white shadow-lg p-4 w-64 fixed top-0 left-0 border-r border-gray-200">
    <nav className="flex flex-col gap-2 mt-4">
      {menuItems.map(({ label, route, icon: Icon }, idx) => (
        <NavLink
          key={idx}
          to={route}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 text-sm rounded hover:bg-gray-100 transition-colors ${
              isActive ? 'bg-gray-200 font-medium text-gray-900' : 'text-gray-700'
            }`
          }
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  </div>
);

export default Sidebar;