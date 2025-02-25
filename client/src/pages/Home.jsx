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
      imageUrl: "./img1.webp",
      text: "Buy Tickets Easily",
    },
    {
      imageUrl: "./img2.webp",
      text: "List Your Events",
    },
    {
      imageUrl: "./img3.webp",
      text: "Resell Tickets Safely",
    },
    {
      imageUrl: "./img4.webp",
      text: "Rebuy Sold-Out Tickets",
    },
    {
      imageUrl: "./img5.webp",
      text: "Immersive VR Experiences",
    },
    {
      imageUrl: "./img6.webp",
      text: "Crypto Payment Options",
    },
    {
      imageUrl: "./img7.webp",
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
          remainingTickets: Number(occasion[3]),
          maxTickets: Number(occasion[4]),
          date: occasion[5],
          time: occasion[6],
          location: occasion[7],
          bannerImage: occasion[8],
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
