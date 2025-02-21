import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ethers } from "ethers";
import abi from "./abis/TicketMaster.json" // Adjust the path
import Home from "./pages/Home";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Demo from "./pages/Demo";
import ContactUs from "./components/ContactUs";

export default function App() {
  const [account, setAccount] = useState("");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  async function connectWallet() {
    const contractAddress = "0x0065cA9739B41a1D24C43c98B83D9cfbeD1681C0";
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
      setState({ provider, signer, contract });
    } catch (error) {
      console.error("Error connecting to Metamask:", error);
    }
  }


  return (
    <Router>
      <div className={`min-h-screen bg-gray-900 text-white`}>
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center py-4 px-6 shadow-md bg-white dark:bg-gray-800">
          {/* Left Side (Links) */}
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <Link to="/register" className="hover:text-blue-500">Register</Link>
            <Link to="/about" className="hover:text-blue-500">About</Link>
            <Link to="/contactus" className="hover:text-blue-500">Contact Us</Link>
            <Link to="/events" className="hover:text-blue-500">Events</Link>
            <Link to="/demo" className="hover:text-blue-500">Demo</Link>
           
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
          </div>
        </nav>

        {/* Routing Configuration */}
        <Routes>
          <Route path="/" element={<Home state={state} />} />
          <Route path="/register" element={<Register state={state}  account={account}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events state={state}  account={account}/>} />
          <Route path="/demo" element={<Demo state={state}  account={account}/>} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>

        {/* Connected Wallet Display */}
        {/* <div className="flex flex-col justify-center items-center h-screen text-center">
          <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
          {account && (
            <p className="mt-4 text-lg">
              Connected Wallet: <span className="font-semibold text-blue-500">{account.slice(0, 6)}...{account.slice(-4)}</span>
            </p>
          )}
        </div> */}
      </div>
    </Router>
  );
}
