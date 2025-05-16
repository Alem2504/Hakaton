// src/pages/Graph.tsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';


const bmiData = [
  { name: 'Jan', BMI: 22.1 },
  { name: 'Feb', BMI: 23.4 },
  { name: 'Mar', BMI: 24.2 },
  { name: 'Apr', BMI: 23.9 },
  { name: 'May', BMI: 24.6 },
];

const mealsData = [
  { day: 'Pon', meals: 3 },
  { day: 'Uto', meals: 3 },
  { day: 'Sri', meals: 2 },
  { day: 'Čet', meals: 3 },
  { day: 'Pet', meals: 4 },
];

const GraphPage: React.FC = () => {
  return (
  <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar fiksiran lijevo */}
    <div className="w-64">
      <Sidebar />
    </div>

    {/* Glavni sadržaj poravnat desno */}
    <div className="flex-1 p-6 flex justify-end">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Vizualizacija podataka</h2>

        {/* BMI graf */}
        <div className="bg-white p-4 rounded shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">BMI kroz mjesece</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={bmiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[20, 26]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="BMI" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Obroci graf */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Broj obroka po danima</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mealsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="meals" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

};

export default GraphPage;
