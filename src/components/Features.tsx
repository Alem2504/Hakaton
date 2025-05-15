import React from 'react';
import { Activity, HeartPulse, Lightbulb, Stethoscope } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: Activity,
      title: 'Health Simulation',
      description: 'See how lifestyle changes affect your body in real-time simulations.',
    },
    {
      id: 2,
      icon: HeartPulse,
      title: 'Disease Prediction',
      description: 'Discover your risk for diabetes, hypertension, and more with AI analysis.',
    },
    {
      id: 3,
      icon: Lightbulb,
      title: 'Smart Recommendations',
      description: 'Receive personalized, data-driven tips for improving your health.',
    },
    {
      id: 4,
      icon: Stethoscope,
      title: 'Connect with Doctors',
      description: 'Securely share your health insights with healthcare professionals.',
    },
  ];

  return (
    <div id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What We Offer</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our technology creates a digital representation of your health, enabling powerful insights and predictions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;