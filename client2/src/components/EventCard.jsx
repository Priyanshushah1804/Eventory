import React from 'react'

const EventCard = ({event}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-xl font-bold text-white">{event}</h3>
    <p className="text-gray-400">Special movie events</p>
  </div>
  )
}

export default EventCard
