"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import abi from "../lib/abis/De_Ticket.json"; // Adjust the path

const Navbar = () => {
  const [account, setAccount] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false); // Track if component has mounted
  const [contract, setContract] = useState(null); // Store contract instance

  // Initialize dark mode, account, and contract from cookies
  useEffect(() => {
    setMounted(true); // Set mounted to true after component mounts

    // Retrieve dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    // Retrieve account and contract from cookies
    const savedAccount = localStorage.getItem("account");
    const savedContract = localStorage.getItem("contract");

    if (savedAccount) {
      setAccount(savedAccount);
    }

    if (savedContract) {
      setContract(JSON.parse(savedContract));
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("darkMode", darkMode);
    }
  }, [darkMode, mounted]);

  // Save account and contract to cookies
  useEffect(() => {
    if (mounted && account) {
      // Cookies.set("account", account, { expires: 7 }); // Expires in 7 days
      localStorage.setItem("account", account)
    }
  }, [account, mounted]);

  useEffect(() => {
    if (mounted && contract) {
      // Cookies.set("contract", JSON.stringify(contract), { expires: 7 }); // Expires in 7 days
      localStorage.setItem("contract", JSON.stringify(contract))
    }
  }, [contract, mounted]);

  async function connectWallet() {
    const contractAddress = "0xD98D9F17a42580368AA2E938D2b574f407f23C39";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Metamask is not installed");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      if (accounts.length === 0) {
        alert("No account found");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address); // Update state with wallet address

      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract); // Update state with contract instance
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }
  }

  // Only render the UI after the component has mounted
  if (!mounted) {
    return null;
  }

  return (
    <nav className={`flex justify-between items-center py-4 px-6 shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      {/* Left Side (Links) */}
      <div className="flex space-x-6">
        <Link href="/home" className="hover:text-blue-500">Home</Link>
        <Link href="/register" className="hover:text-blue-500">Register</Link>
        <Link href="/about" className="hover:text-blue-500">About</Link>
        <Link href="/contact" className="hover:text-blue-500">Contact</Link>
      </div>

      {/* Right Side (Buttons) */}
      <div className="flex space-x-4">
        {/* Wallet Connection Button */}
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 border rounded-lg"
        >
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;