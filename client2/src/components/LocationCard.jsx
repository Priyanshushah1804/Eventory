import React from 'react'

const LocationCard = ({location}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-xl font-bold text-white">{location}</h3>
    <p className="text-gray-400">Movies playing near you</p>
  </div>
  )
}

export default LocationCard
