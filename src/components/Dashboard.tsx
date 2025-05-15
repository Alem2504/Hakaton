import React, { useState, useEffect } from 'react';
import { Brain, Utensils, Timer, Pill, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

interface HealthMetric {
  icon: React.ElementType;
  title: string;
  value: string;
  status?: string;
  color: string;
}

interface Recommendation {
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed';
}

interface User {
  id: number;
  email: string;
}

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/me", {
      method: "GET",
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => console.error("Failed to fetch user", err));
  }, []);

  const healthMetrics: HealthMetric[] = [
    { icon: Brain, title: 'Risk Score', value: 'Diabetes Risk: 32%', status: 'Low', color: 'text-green-500' },
    { icon: Utensils, title: 'Nutrition', value: '2,100 kcal', status: 'Average intake', color: 'text-blue-500' },
    { icon: Timer, title: 'Activity Level', value: '4 active days', status: 'Last week', color: 'text-purple-500' },
    { icon: Pill, title: 'Medications', value: 'None active', color: 'text-gray-500' },
  ];

  const recommendations: Recommendation[] = [
    {
      title: 'Daily Walking',
      description: 'Walk 30 min daily to reduce blood pressure by 5%',
      status: 'in-progress',
    },
    {
      title: 'Fiber Intake',
      description: 'Increase fiber intake to manage cholesterol',
      status: 'new',
    },
    {
      title: 'Sleep Tracking',
      description: 'Consider sleep tracking to monitor recovery',
      status: 'completed',
    },
  ];

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`$${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transform fixed lg:relative lg:translate-x-0 z-30 w-64 bg-white h-screen border-r border-gray-200 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex flex-col items-center pb-6 border-b border-gray-200">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
              alt="User avatar"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">
              {user ? user.email : 'Loading...'}
            </h2>
            <p className="text-gray-600">User Dashboard</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Quick Overview</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">BMI:</span>{' '}
                  <span className="font-medium">22.4</span>{' '}
                  <span className="text-green-500">(Normal)</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Blood Pressure:</span>{' '}
                  <span className="font-medium">120/80</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Heart Rate:</span>{' '}
                  <span className="font-medium">72 bpm</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-full shadow-lg"
      >
        {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-auto">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user ? user.email : 'User'}!
            </h1>
            <p className="mt-1 text-gray-600">Here's your current health snapshot</p>
          </div>

          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {healthMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    metric.status ? 'bg-gray-100' : 'invisible'
                  }`}>
                    {metric.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
                <p className="mt-1 text-gray-600">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Recommendations Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personalized Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                    statusColors[recommendation.status]
                  }`}>
                    {recommendation.status.charAt(0).toUpperCase() + recommendation.status.slice(1)}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{recommendation.title}</h3>
                  <p className="text-gray-600">{recommendation.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Request Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Need professional advice?</h2>
              <p className="text-gray-600 mb-4">
                You can securely share your BioTwin data with a licensed doctor.
              </p>
              <Button variant="primary">Request a Doctor</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
