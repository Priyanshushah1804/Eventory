import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ account, connectWallet, state }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [occasions, setOccasions] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const { contract } = state;

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredOccasions = occasions.filter((occasion) =>
      occasion.name.toLowerCase().includes(query.toLowerCase())
    );
    setDropdownData(filteredOccasions);
    setShowDropdown(query.length > 0);
  };

  useEffect(() => {
    fetchAllEvents();
  }, [contract]);

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
          cost: Number(occasion[2]) / 1e18,
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

  const links = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contactus" },
    { name: "Events", path: "/events" },
    { name: "Demo", path: "/demo" },
    { name: "Resale", path: "/resale" },
    ...(account ? [{ name: "My Tickets", path: "/myTickets" }] : []),
  ];

  return (
    <nav className="relative flex justify-between items-center py-4 px-6 shadow-md bg-white dark:bg-gray-800">
      {/* Navigation Menu */}
      <ul className="flex space-x-6 relative">
        {links.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li
              key={item.path}
              className="relative cursor-pointer px-4 py-2 transition"
            >
              {/* Capsule Effect (Only on Active Item) */}
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}

              {/* Menu Item Text */}
              <Link to={item.path} className="relative z-10">
                <span
                  className={`transition-colors duration-300 ${
                    isActive ? "text-blue-900 font-semibold" : "text-white"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Search Bar and Dropdown */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <ul>
              {dropdownData.length > 0 ? (
                dropdownData.map((occasion) => (
                  <li
                    key={occasion.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <div className="flex flex-col space-y-2">
                      {/* Occasion Name */}
                      <h3 className="text-lg font-semibold text-gray-900">
                        {occasion.name}
                      </h3>

                      {/* Occasion Details */}
                      <div className="text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Cost:</span>{" "}
                          {occasion.cost} ETH
                        </p>
                        <p>
                          <span className="font-medium">Tickets:</span>{" "}
                          {occasion.remainingTickets} / {occasion.maxTickets}{" "}
                          remaining
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {occasion.date}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span>{" "}
                          {occasion.time}
                        </p>
                        <p>
                          <span className="font-medium">Location:</span>{" "}
                          {occasion.location}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-4 text-gray-500">No data found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Wallet Connection Button */}
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </nav>
  );
}
