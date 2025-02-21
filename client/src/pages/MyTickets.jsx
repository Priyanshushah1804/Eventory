import React, { useEffect, useState } from 'react';
import TicketComp from '../components/TicketComp'; // Import your TicketComp component

const MyTickets = ({ state, account }) => {
  // Assuming `state.bookedTickets` is an array of booked tickets for the current user
  const {contract} = state;
  const [ticketsBooked,setTicketsBooked] = useState([]);
  const bookedTickets = state.bookedTickets || [];
  const accessProfile = async()=>{
    let tx = await contract?.getUserTickets(account)
    tx = Object.values(tx);
    setTicketsBooked(tx);
    console.log(tx);
}

useEffect(()=>{
  accessProfile()
},[contract])
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
      {bookedTickets.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No tickets booked.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedTickets.map((ticket, index) => (
            <TicketComp key={index} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;