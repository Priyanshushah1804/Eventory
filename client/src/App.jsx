import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import abi from "./abis/TicketMaster.json"; // Adjust the path
import Home from "./pages/Home";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Demo from "./pages/Demo";
import ContactUs from "./components/ContactUs";
import Resale from "./pages/Resale";
import MyTickets from "./pages/MyTickets";
import Navbar from "./components/Navbar"; // New Navbar Component
import AIChatButton from "./components/AIChatButton";

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
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar account={account} connectWallet={connectWallet} state={state}/>
        <AIChatButton account={account}  state={state}/>
        {/* Routing Configuration */}
        <Routes>
          <Route path="/" element={<Home state={state} />} />
          <Route path="/register" element={<Register state={state} account={account} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events state={state} account={account} />} />
          <Route path="/demo" element={<Demo state={state} account={account} />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/resale" element={<Resale state={state} account={account} />} />
          <Route path="/myTickets" element={<MyTickets state={state} account={account} />} />
          <Route path="/myEvents" element={<MyEvents state={state} account={account} />} />
        </Routes>
      </div>
    </Router>
  );
}
