import React from 'react';
import { Smartphone, Database, BarChart3, Heart } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Connect Your Data',
    description: 'Link your wearables, health apps, and medical records to create a complete health profile.',
    icon: Smartphone,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Build Your Twin',
    description: 'Our AI analyzes your data to create a personalized digital model of your body and health system.',
    icon: Database,
    color: 'indigo',
  },
  {
    id: 3,
    title: 'Get Insights',
    description: 'Receive detailed analytics, risk assessments, and personalized health recommendations.',
    icon: BarChart3,
    color: 'purple',
  },
  {
    id: 4,
    title: 'Improve Health',
    description: 'Make informed decisions to enhance your wellbeing with continuous feedback and monitoring.',
    icon: Heart,
    color: 'pink',
  },
];

const HowItWorks: React.FC = () => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      purple: 'bg-purple-100 text-purple-600',
      pink: 'bg-pink-100 text-pink-600',
    };
    
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            BioTwin creates a personalized health model that evolves with you.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-gray-200 transform -translate-x-1/2" aria-hidden="true"></div>
            
            <div className="relative z-10">
              {steps.map((step, index) => (
                <div key={step.id} className={`relative md:flex ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-start mb-16 last:mb-0`}>
                  {/* Icon */}
                  <div className="flex items-center justify-center mx-auto md:mx-0 h-12 w-12 rounded-full z-10 shadow-md mb-6 md:mb-0 relative">
                    <div className={`flex items-center justify-center h-12 w-12 rounded-full ${getColorClasses(step.color)}`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="absolute -inset-1 rounded-full bg-white" style={{ zIndex: -1 }}></div>
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:ml-16' : 'md:mr-16 md:text-right'}`}>
                    <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;