import React, { useState, useEffect } from "react";
import { QRCode } from "antd";

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

        // Check if the ticket is exhausted
        const isExhausted = await contract.ticketExhausted(eventId, seatId);
        console.log(isExhausted)
        if (isExhausted) continue; // Skip exhausted tickets

        // Store the raw timestamp for occasion time checks
        const rawTimestamp = Number(occasion.date);

        ticketDetails.push({
          id: eventId,
          name: occasion.name,
          location: occasion.location,
          // e.g. "2/22/2025" from the local date string
          date: occasion.date,
          time: occasion.time,
          seat: seatId,
          occasionTimestamp: rawTimestamp,
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

  // Placeholder event handlers for buttons
  const handleResell = async (eventId, ticketId) => {
    if (!contract || !account) {
      console.error("Contract or account not found!");
      return;
    }

    try {
      console.log(`Initiating resale for event ${eventId}, ticket ${ticketId}...`);

      // Call the smart contract function
      const tx = await contract.enableResale(eventId, ticketId);
      await tx.wait(); // Wait for the transaction to be mined

      console.log(`Resale enabled successfully for ticket #${ticketId} at event #${eventId}`);

      // Optionally, refresh tickets list after resale
      getUserTickets();
    } catch (error) {
      console.error("Error enabling resale:", error);
    }
  };


  const handleViewAR = (ticketId) => {
    console.log(`View in AR clicked for ticket #${ticketId}`);
    // Add your logic here
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
              onViewAR={handleViewAR}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TicketCard = ({ ticket, onResell, onViewAR }) => {
  // Determine if the event time has arrived
  const now = new Date().getTime(); // current time in ms
  const eventStartMs = ticket.occasionTimestamp * 1000; // event start in ms
  const isARActive = now >= eventStartMs;

  return (
    <div className="w-full md:w-auto">
      <div className="max-w-md rounded-md overflow-hidden shadow-lg flex bg-gradient-to-r from-red-500 to-pink-500 text-white relative">
        {/* Left (main) section of the ticket */}
        <div className="flex-1 p-5 relative">
          {/* Date & Time */}
          <div className="text-xs font-medium uppercase tracking-wider mb-1">
            {ticket.date} • {ticket.time}
          </div>

          {/* Event Name */}
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1 uppercase">
            {ticket.name}
          </h2>

          {/* Subtext (Performance / Location) */}
          <p className="text-sm md:text-base font-semibold mb-2">
            Live Performance
          </p>
          <p className="text-base md:text-lg font-bold uppercase">
            {ticket.location}
          </p>

          {/* Divider line */}
          <div className="my-3 h-px w-3/4 bg-white/30" />

          {/* Ticket seat info */}
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex flex-row flex-wrap gap-4 text-xs md:text-sm mb-4">
                <InfoBox label="Block" value={ticket.seat%10<=5 && ticket.seat!=0?"Left":"Right"} />
                <InfoBox label="Row" value={Math.floor(ticket.seat / 10) + 1} />
                <InfoBox label="Seat" value={ticket.seat} />
              </div>

          {/* Buttons row */}
          <div className="flex items-center gap-3">
            {/* Resell Button */}
            <button
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors"
              onClick={() => onResell(ticket.id,ticket.seat)}
            >
              Resell
            </button>

                {/* View in AR Button */}
                <button
                  onClick={() => onViewAR(ticket.id)}
                  disabled={!isARActive}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    isARActive
                      ? "bg-white/20 hover:bg-white/30 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  View in AR
                </button>
              </div>
              <div></div>
            </div>
              <QRCode
                style={{ width: "100px", height: "80px",overflow:"visible",border:"none" }}
                errorLevel="H"
                value="https://ant.design/"
                icon="./logo.webp"
              />
          </div>

        </div>

        {/* Right (tear-off) section */}
        <div className="w-24 md:w-28 border-l-2 border-dashed border-white p-3 flex flex-col justify-between relative">
          {/* Date/time (small) */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider">
              {ticket.date}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider">
              {ticket.time}
            </div>
          </div>

          {/* Title & location repeated */}
          <div className="mt-2 mb-1 text-sm font-extrabold uppercase">
            {ticket.name}
          </div>
          <div className="text-xs uppercase">{ticket.location}</div>

          {/* Seat Info Repeated (optional) */}
          <div className="text-xs mt-2 font-bold">Seat {ticket.seat}</div>

          {/* Silhouette at the bottom (optional) */}
          {/* <div
            className="absolute bottom-0 left-0 w-full h-2 bg-bottom bg-no-repeat bg-cover"
            style={{
              backgroundImage:
                'url("https://i.ibb.co/3S0YNDb/crowd-silhouette.png")',
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

/**
 * Helper component for label/value blocks (Entrance, Block, Row, Seat).
 */
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
