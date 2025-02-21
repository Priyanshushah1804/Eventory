import React, { useState, useEffect } from "react";

const MyTickets = ({ state, account }) => {
  const { contract } = state;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserTickets = async () => {
    if (!contract || !account) return;

    try {
      const [eventIds, seatIds] = await contract.getUserTickets(account);
      let ticketDetails = [];

      for (let i = 0; i < eventIds.length; i++) {
        const eventId = Number(eventIds[i]);
        const seatId = Number(seatIds[i]);
        const occasion = await contract.getOccasion(eventId);

        ticketDetails.push({
          id: eventId,
          name: occasion.name,
          location: occasion.location,
          date: new Date(Number(occasion.date) * 1000).toLocaleDateString(),
          time: occasion.time,
          seat: seatId,
        });
      }

      setTickets(ticketDetails);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserTickets();
  }, [contract, account]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🎟️ My Tickets</h1>

      {loading ? (
        <p className="text-gray-600">Loading your tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-600">You have no tickets.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((ticket, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{ticket.name}</h2>
              <p className="text-sm text-gray-600">{ticket.location}</p>
              <p className="text-sm text-gray-600">📅 {ticket.date} | 🕒 {ticket.time}</p>
              <p className="text-sm text-gray-600 font-semibold">Seat: {ticket.seat}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
