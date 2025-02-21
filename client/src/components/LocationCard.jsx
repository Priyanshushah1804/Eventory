import React from 'react';
import { MapPin } from 'lucide-react'; // Importing an icon for better UI

const LocationCard = ({ location }) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Floating Glow Effect */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-blue-500 opacity-40 blur-3xl"></div>

      {/* Icon */}
      <MapPin className="w-10 h-10 text-blue-400 mb-2" />

      {/* Location Title */}
      <h3 className="text-2xl font-semibold text-white tracking-wide">{location}</h3>

      {/* Subtitle */}
      <p className="text-gray-300 text-sm mt-2 px-4 text-center">Discover movies playing near you.</p>

      {/* Button */}
      <button className="mt-4 px-5 py-2 bg-blue-500 text-white font-medium cursor-pointer rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md">
        Find Movies
      </button>
    </div>
  );
};

export default LocationCard;
