import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const MyEvents = ({ state, account }) => {
  const { contract } = state;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    if (!contract || !account) return;

    try {
      const totalOccasions = await contract.totalOccasions();
      let userEvents = [];

      for (let i = 1; i <= totalOccasions; i++) {
        const occasion = await contract.getOccasion(i);

        // Check if the event creator is the logged-in user
        if (occasion.creator.toLowerCase() === account.toLowerCase()) {
          userEvents.push({
            id: Number(occasion.id),
            name: occasion.name,
            location: occasion.location,
            date: new Date(Number(occasion.date) * 1000).toLocaleDateString(),
            time: occasion.time,
            cost: ethers.formatEther(occasion.cost) + " ETH",
          });
        }
      }

      setEvents(userEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [contract, account]);

  // Function to handle Upload VR button click
  const uploadVideo = (eventId) => {
    console.log(`Upload Video for event ${eventId}`);
    // Upload video logic goes here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">📅 My Created Events</h1>

      {loading ? (
        <p className="text-gray-600">Loading your events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-600">You haven’t created any events.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-sm text-gray-600">📅 {event.date} | 🕒 {event.time}</p>
              <p className="text-sm text-gray-600 font-semibold">🎟️ Ticket Price: {event.cost}</p>

              {/* Show Upload VR button only for events with indexes 1, 3, and 5 */}
              {[1, 3, 5].includes(event.id) && (
                <button
                  onClick={() => uploadVideo(event.id)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Upload VR
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
