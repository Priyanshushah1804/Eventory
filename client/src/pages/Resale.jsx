import React, { useEffect, useState } from 'react';

const Resale = ({ state, account }) => {
    const { contract, web3 } = state;
    const [resaleTickets, setResaleTickets] = useState([]);

    useEffect(() => {
        const fetchResaleTickets = async () => {
            if (contract) {
                const totalOccasions = await contract.totalOccasions();
                let resaleList = [];

                for (let i = 1; i <= totalOccasions; i++) {
                    const seatsTaken = await contract.getSeatsTaken(i);
                    for (let seat of seatsTaken) {
                        const isResale = await contract.resaleAllowed(i, seat);
                        if (isResale) {
                            resaleList.push({ eventId: i, seatId: seat });
                        }
                    }
                }
                setResaleTickets(resaleList);
                console.log(resaleList)
            }
        };

        fetchResaleTickets();
    }, [state]);

    const buyResaleTicket = async (eventId, seatId) => {
        if (!contract || !account) return;

        try {
            const ticketPrice = await contract.getOccasion(eventId);
            const priceInWei = ticketPrice.cost;

            await contract.buyResaleTicket(eventId, seatId,{value:priceInWei})
            alert('Ticket purchased successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error purchasing resale ticket:', error);
            alert('Transaction failed');
        }
    };

    return (
        <div className='py-10'>
            <h2 className="text-3xl font-bold text-center mb-8">Resale</h2>
            {resaleTickets.length > 0 ? (
                <ul>
                    {resaleTickets.map((ticket, index) => (
                        <li key={index}>
                            Event ID: {ticket.eventId} - Seat ID: {ticket.seatId}
                            <button onClick={() => buyResaleTicket(ticket.eventId, ticket.seatId)}>
                                Buy
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center'>No tickets available for resale.</p>
            )}
        </div>
    );
};

export default Resale;
