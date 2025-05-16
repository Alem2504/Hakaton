import React from 'react';
import Card from './CardD';

interface ValueCardProps {
  count: number;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ count, description }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
      <p className="text-lg font-semibold text-gray-800">
        <span className="font-bold">{count}</span> {description}
      </p>
    </div>
  );
};

const CriticalValues: React.FC = () => {
  return (
    <Card title="Critical Values">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ValueCard count={3} description="patients with high blood pressure" />
          <ValueCard count={1} description="patient at risk for diabetes" />
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
            Review
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CriticalValues;