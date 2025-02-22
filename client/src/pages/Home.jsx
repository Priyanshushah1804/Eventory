import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import SeatSelectionModal from "../components/SeatSelectionModal";
import LocationCard from "../components/LocationCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Custom Card Components
const HomePage = ({ state }) => {
  const [opacity, setOpacity] = useState(1);
  const [occasions, setOccasions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const visibleCards = [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { contract } = state;
  const locations = [
    {
      imageUrl: "./banner.png",
      text: "Buy Tickets Easily",
    },
    {
      imageUrl: "./banner.png",
      text: "List Your Events",
    },
    {
      imageUrl: "./banner.png",
      text: "Resell Tickets Safely",
    },
    {
      imageUrl: "./banner.png",
      text: "Rebuy Sold-Out Tickets",
    },
    {
      imageUrl: "./banner.png",
      text: "Immersive VR Experiences",
    },
    {
      imageUrl: "./banner.png",
      text: "Crypto Payment Options",
    },
    {
      imageUrl: "./banner.png",
      text: "Personalized Event Recommendations",
    },
  ];
  const handleBuyTicket = (occasion) => {
    setSelectedOccasion(occasion);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOccasion(null);
  };

  for (let i = 0; i < 5; i++) {
    const index = (currentIndex + i) % locations.length;
    visibleCards.push(locations[index]);
  }

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
      console.log(occasionsList);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  // Handle scroll event
  useEffect(() => {
    // Fetch all events (existing functionality)
    fetchAllEvents();

    // Handle scroll for opacity (existing functionality)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0; // Start fading immediately
      const fadeEnd = 400; // Fully faded out after scrolling 400px

      // Calculate opacity based on scroll position
      let newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      newOpacity = Math.max(0, Math.min(1, newOpacity)); // Clamp between 0 and 1
      setOpacity(newOpacity);
    };

    // Add scroll event listener for opacity (existing functionality)
    window.addEventListener("scroll", handleScroll);

    // Auto-transition logic for the cards
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }, 3000); // Adjust the interval duration (3 seconds in this case)

    // Cleanup function
    return () => {
      // Remove scroll event listener for opacity
      window.removeEventListener("scroll", handleScroll);

      // Clear auto-transition interval
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col align-center">
      <div
        className="relative h-[400px] w-screen transition-opacity duration-500"
        style={{ opacity }}
      >
        <img
          src="./banner.png"
          alt="Movie Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-50 flex items-center pl-20">
          <div className="space-y-4">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300">
              <Link to="/events">Book now</Link>
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              <Link to="/events">Explore Events</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Location-Based Cards Section */}
      <section className="w-screen py-12 rounded-2xl">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 p-4 transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (50 / 5)}%)`, // Slide cards horizontally
            }}
          >
            {locations.map((location, index) => (
              <div key={index} className="w-120 flex-shrink-0 rounded-2xl">
                <LocationCard
                  txt={location.text}
                  imageUrl={location.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event-Based Cards Section */}
      <div className="flex justify-between items-center mb-8 px-10">
        {/* Upcoming Events Heading */}
        <h2 className="text-3xl font-bold">Upcoming Events</h2>

        {/* Explore All Events Button */}
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md transition"
          onClick={() => router.push("/events")} // Ensure `router` is initialized properly
        >
          <Link to="/events">Explore All Events</Link>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-6">
        {occasions.slice(0, 8).map((occasion, index) => (
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
          <SeatSelectionModal
            occasion={selectedOccasion}
            onClose={handleModalClose}
            state={state}
          />
        )}
      </Modal>
    </div>
  );
};

export default HomePage;
