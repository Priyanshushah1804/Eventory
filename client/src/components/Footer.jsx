import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Newsletter Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">NEWSLETTER!</h2>
          <p className="text-gray-400">Subscribe to stay updated on the latest events.</p>
          <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-transparent outline-none text-white placeholder-gray-400"
            />
            <button className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full">
              Subscribe
            </button>
          </div>
        </div>

        {/* Company Info & Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">About Us</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">FAQ</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p className="text-gray-400">Phone: +91 123 456 7890</p>
          <p className="text-gray-400">Email: support@eventhub.com</p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} EventHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
