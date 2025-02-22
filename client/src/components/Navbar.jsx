import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

export default function Navbar({ account, connectWallet }) {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contactus" },
    { name: "Events", path: "/events" },
    { name: "Demo", path: "/demo" },
    { name: "Resale", path: "/resale" },
    { name: "My Tickets", path: "/myTickets" },
    { name: "My Events", path: "/myEvents" },
  ];

  return (
    <nav className="relative flex justify-between items-center py-4 px-6 shadow-md bg-white dark:bg-gray-800">
      {/* Navigation Menu */}
      <ul className="flex space-x-6 relative">
        {links.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path} className="relative cursor-pointer px-4 py-2 transition">
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
                <span className={`transition-colors duration-300 ${isActive ? "text-blue-900 font-semibold" : "text-white"}`}>
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Wallet Connection Button */}
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>
    </nav>
  );
}
