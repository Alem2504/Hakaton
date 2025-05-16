import React from 'react';
import Card from './CardD';

interface StatProps {
  value: string | number;
  label: string;
}

const Stat: React.FC<StatProps> = ({ value, label }) => {
  return (
    <div>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const Statistics: React.FC = () => {
  return (
    <Card title="Statistics">
      <div className="grid grid-cols-3 gap-6">
        <Stat value="125" label="Active patients" />
        <Stat value="26.8" label="Avg. BMI" />
        <div className="flex items-end gap-2">
          <Stat value="18.4%" label="Chronic conditions" />
          <div className="flex items-end gap-[2px] h-16 mb-1">
            {[25, 30, 35, 45, 50, 60].map((height, index) => (
              <div 
                key={index}
                className="bg-blue-200 w-2 rounded-t-sm"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Statistics;