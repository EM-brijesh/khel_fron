import React from 'react';
import { Users, Calendar, Trophy, MapPin } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="bg-indigo-100 p-3 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const Features = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Khelo?</h2>
          <p className="mt-4 text-xl text-gray-600">Connect with local sports enthusiasts and make every game count</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Users className="w-6 h-6 text-indigo-600" />}
            title="Community First"
            description="Join a vibrant community of sports enthusiasts in your area"
          />
          <Feature
            icon={<Calendar className="w-6 h-6 text-indigo-600" />}
            title="Regular Events"
            description="Find and participate in weekly sports events near you"
          />
          <Feature
            icon={<Trophy className="w-6 h-6 text-indigo-600" />}
            title="All Skill Levels"
            description="Whether you're a beginner or pro, there's a place for you"
          />
          <Feature
            icon={<MapPin className="w-6 h-6 text-indigo-600" />}
            title="Local Focus"
            description="Discover sports venues and events in your neighborhood"
          />
        </div>
      </div>
    </div>
  );
}