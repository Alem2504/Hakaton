// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.config';
import Sidebar from '../components/Sidebar';
import { Brain, Utensils, Timer, Pill } from 'lucide-react';

interface HealthMetric {
  icon: React.ElementType;
  title: string;
  value: string;
}

interface UserData {
  ime: string;
  height: number;
  weight: number;
  mealsDaily: string;
  exercise: string;
  liquidIntake: string;
  profileCompleted: boolean;
}

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return navigate('/login');
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (!snap.exists() || !(snap.data() as UserData).profileCompleted) {
        return navigate('/health-form');
      }
      setUserData(snap.data() as UserData);
    });
    return () => unsubscribe();
  }, [navigate]);

  const healthMetrics: HealthMetric[] = userData
    ? [
        {
          icon: Brain,
          title: 'BMI',
          value: (
            userData.weight /
            ((userData.height / 100) * (userData.height / 100))
          ).toFixed(1),
        },
        {
          icon: Utensils,
          title: 'Meals/Day',
          value: userData.mealsDaily,
        },
        {
          icon: Timer,
          title: 'Activity',
          value: userData.exercise,
        },
        {
          icon: Pill,
          title: 'Liquid Intake',
          value: userData.liquidIntake,
        },
      ]
    : [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen((o) => !o)}
      />

      <div className="flex-1 lg:ml-64 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">
          Welcome back, {userData?.ime || 'User'}!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((m, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <m.icon className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-semibold text-gray-900">{m.title}</h3>
              <p className="text-gray-600">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Nested routes content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
