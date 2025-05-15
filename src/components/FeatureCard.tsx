import React from 'react';
import {LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;