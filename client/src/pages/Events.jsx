import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Modal } from "antd";
import SeatSelectionModal from "../components/SeatSelectionModal";

const Events = ({ state, account }) => {
  const [occasions, setOccasions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const { contract } = state;

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    if (!contract) return;
    try {
      const occasionsList = [];
      const occasionCount = await contract.totalOccasions();

      for (let index = 1; index <= occasionCount; index++) {
        const occasion = await contract.getOccasion(index);
        occasionsList.push({
          id: Number(occasion[0]),
          name: occasion[1],
          cost: Number(occasion[2]) / 1e18, // Convert Wei to ETH
          remainingTickets: Number(occasion[3]),
          maxTickets: Number(occasion[4]),
          date: occasion[5],
          time: occasion[6],
          location: occasion[7],
          bannerImage: occasion[8],
        });
      }

      setOccasions(occasionsList);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleBuyTicket = (occasion) => {
    setSelectedOccasion(occasion);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOccasion(null);
  };

  return (
    <div className="min-h-screen  text-white py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6  text-white">
        {occasions.map((occasion, index) => (
          <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden text-white"
        >
          {/* Event Image */}
          <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
            <img
              src={occasion.bannerImage}
              alt="Event Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-semibold shadow-md">
              {occasion.cost} ETH
            </div>
          </div>

          {/* Event Details */}
          <div className="p-4 bg-gray-800 rounded-b-2xl shadow-md">
            <h3 className="text-lg font-bold">{occasion.name}</h3>
            <div className="flex items-center text-sm text-gray-400 mt-1">
              <span className="bg-gray-700 px-2 py-1 rounded-md mr-2 shadow-sm">BUSINESS</span>
              <span className="flex items-center">
                📅 {occasion.date}
              </span>
              <span className="ml-2 flex items-center">📍 {occasion.location}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">{occasion.description}</p>

            {/* Price and Tickets Info */}
            <div className="mt-4 flex justify-between items-center">
              <span className="bg-green-600 px-3 py-1 rounded-md text-white text-sm shadow-sm">
                {occasion.remainingTickets} / {occasion.maxTickets} Tickets Left
              </span>
              <button
                className="bg-indigo-700 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm shadow-md"
                onClick={() => handleBuyTicket(occasion)}
              >
                Buy Ticket
              </button>
            </div>
          </div>
        </motion.div>
        ))}
      </div>

      {/* Antd Modal */}
      <Modal
        title="Select Seats"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedOccasion && (
          <SeatSelectionModal occasion={selectedOccasion} onClose={handleModalClose} state={state} />
        )}
      </Modal>
    </div>
  );
};

export default Events;
