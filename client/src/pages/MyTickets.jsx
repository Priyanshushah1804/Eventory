import React, { useState, useEffect } from "react";

const MyTickets = ({ state, account }) => {
  const { contract } = state;
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserTickets = async () => {
    if (!contract || !account) return;

    try {
      const [eventIds, seatIds] = await contract.getUserTickets(account);
      const ticketDetails = [];

      for (let i = 0; i < eventIds.length; i++) {
        const eventId = Number(eventIds[i]);
        const seatId = Number(seatIds[i]);
        const occasion = await contract.getOccasion(eventId);
        const isExhausted = await contract.ticketExhausted(eventId, seatId);
        const isAvailableForResale = await contract.resaleAllowed(eventId, seatId);

        const rawTimestamp = Number(occasion.date);

        ticketDetails.push({
          id: eventId,
          name: occasion.name,
          location: occasion.location,
          date: new Date(rawTimestamp * 1000).toLocaleDateString(),
          time: occasion.time,
          seat: seatId,
          occasionTimestamp: rawTimestamp,
          isExhausted,
          isAvailableForResale,
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

  const handleResell = async (eventId, ticketId) => {
    if (!contract || !account) {
      console.error("Contract or account not found!");
      return;
    }

    try {
      console.log(`Initiating resale for event ${eventId}, ticket ${ticketId}...`);
      const tx = await contract.enableResale(eventId, ticketId);
      await tx.wait();
      console.log(`Resale enabled successfully for ticket #${ticketId} at event #${eventId}`);
      getUserTickets();
    } catch (error) {
      console.error("Error enabling resale:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">🎟️ My Tickets</h1>

      {loading ? (
        <p className="text-gray-600">Loading your tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-600">You have no tickets.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              ticket={ticket}
              onResell={handleResell}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TicketCard = ({ ticket, onResell }) => {
  const now = new Date().getTime();
  const eventStartMs = ticket.occasionTimestamp * 1000;
  const isARActive = now >= eventStartMs;
  const gradientClass = ticket.isExhausted
    ? "bg-gradient-to-r from-gray-600 to-gray-900"
    : "bg-gradient-to-r from-red-500 to-pink-500";

  return (
    <div className="w-full md:w-auto">
      <div className={`max-w-md rounded-md overflow-hidden shadow-lg flex ${gradientClass} text-white relative`}>
        <div className="flex-1 p-5 relative">
          <div className="text-xs font-medium uppercase tracking-wider mb-1">
            {ticket.date} • {ticket.time}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1 uppercase">
            {ticket.name}
          </h2>
          <p className="text-sm md:text-base font-semibold mb-2">Live Performance</p>
          <p className="text-base md:text-lg font-bold uppercase">{ticket.location}</p>
          <div className="my-3 h-px w-3/4 bg-white/30" />
          <div className="flex flex-row flex-wrap gap-4 text-xs md:text-sm mb-4">
            <InfoBox label="Seat" value={ticket.seat} />
          </div>
          {ticket.isAvailableForResale && (
            <div className="text-green-400 font-bold text-xs uppercase mb-2">Resale Available</div>
          )}
          <div className="flex items-center gap-3">
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors"
              onClick={() => onResell(ticket.id, ticket.seat)}
            >
              Resell
            </button>
            <button
              disabled={!isARActive}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                isARActive ? "bg-white/20 hover:bg-white/30 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              View in AR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <span className="font-bold uppercase text-[0.65rem] tracking-wider text-white/90">
        {label}
      </span>
      <div className="bg-white/20 text-center px-2 py-1 rounded-md mt-1 text-xs">
        {value}
      </div>
    </div>
  );
};

export default MyTickets;
