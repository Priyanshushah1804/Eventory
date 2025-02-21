import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Floating Blur Effect */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-purple-500 opacity-40 blur-3xl"></div>

      {/* Event Title */}
      <h3 className="text-2xl font-semibold text-white tracking-wide">{event}</h3>

      {/* Description */}
      <p className="text-gray-300 text-sm mt-2 px-4 text-center">Exclusive movie experiences just for you.</p>

      {/* Button */}
      <button className="mt-4 px-5 cursor-pointer py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors duration-300 shadow-md">
        View Event
      </button>
    </div>
  );
};

export default EventCard;
