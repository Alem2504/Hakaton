import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Card from './CardD';

interface Patient {
  id: string;
  name: string;
  age: number;
  height?: number;
  weight?: number;
  bmi?: string;
  status: string;
  action: string;
}

interface PatientOverviewProps {
  patients: Patient[];
}

const PatientOverview: React.FC<PatientOverviewProps> = ({ patients }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'stable':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'at risk':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card title="Patient Overview">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Height</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">BMI</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-800">{patient.name}</td>
                <td className="py-3 px-4 text-gray-800">{patient.age}</td>
                <td className="py-3 px-4 text-gray-800">{patient.height ?? '-'}</td>
                <td className="py-3 px-4 text-gray-800">{patient.weight ?? '-'}</td>
                <td className="py-3 px-4 text-gray-800">{patient.bmi ?? 'N/A'}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    {patient.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default PatientOverview;
