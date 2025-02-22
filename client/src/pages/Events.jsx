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
          maxTickets: Number(occasion[3]),
          remainingTickets: Number(occasion[4]),
          date: occasion[5],
          time: occasion[6],
          location: occasion[7],
          vrUrl: occasion[8],
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
  const uploadVrVideo =(e)=>{
    e.preventDefault()
    
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>

      <div className="flex flex-wrap justify-center gap-6 px-6">
        {occasions.map((occasion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full sm:w-80 p-6 bg-gray-800 rounded-lg shadow-xl hover:scale-105 transition-all"
          >
            {/* VR Video Preview */}
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
              <video
                src={occasion.vrUrl}
                className="w-full h-full object-cover"
                controls
              />
            </div>

            {/* Event Details */}
            <h3 className="text-xl font-bold mt-4">{occasion.name}</h3>
            <p className="text-sm text-gray-400 mt-1">{occasion.location}</p>

            <div className="mt-3 flex justify-between text-sm">
              <span className="bg-green-500 px-3 py-1 rounded-md">
                {occasion.cost} ETH
              </span>
              <span className="bg-blue-500 px-3 py-1 rounded-md">
                {occasion.maxTickets}/{occasion.remainingTickets} Tickets Left
              </span>
            </div>

            <div className="mt-3 text-sm">
              📅 {occasion.date} ⏰ {occasion.time}
            </div>

            {/* Purchase Button */}
            <button
              className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md transition"
              onClick={() => handleBuyTicket(occasion)}
            >
              Buy Ticket
            </button>
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
          <SeatSelectionModal occasion={selectedOccasion} onClose={handleModalClose} state={state}/>
        )}
      </Modal>
    </div>
  );
};

export default Events;
