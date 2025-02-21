import React, { useState } from "react";
import axios from "axios";
import {ethers} from "ethers"
const Register = ({state}) => {
    const {contract}= state
  const [name, setName] = useState("");
  const [maxTickets, setMaxTickets] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [vrurl, setVrurl] = useState("");
  


  const uploadToIPFS = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "35cb1bf7be19d2a8fa0d",
            pinata_secret_api_key:
              "2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50",
            "Content-Type": "multipart/form-data",
          },
        });

        const resData = res.data;
        setVrurl(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.list(
        name,
        ethers.parseEther(cost),
        maxTickets,
        date,
        time,
        location,
        vrurl
      );
      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">List an Occasion</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        {/* Event Name */}
        <div>
          <label className="block font-semibold text-lg">Event Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-md text-black"
            placeholder="Enter event name"
          />
        </div>

        {/* Cost */}
        <div>
          <label className="block font-semibold text-lg">Cost (ETH)</label>
          <input
            type="number"
            name="cost"
            step="any"
            onChange={(e) => setCost(e.target.value)}
            required
            className="w-full p-3 border rounded-md text-black"
            placeholder="Enter cost"
          />
        </div>

        {/* Max Tickets */}
        <div>
          <label className="block font-semibold text-lg">Max Tickets</label>
          <input
            type="number"
            name="maxTickets"
            onChange={(e) => setMaxTickets(e.target.value)}
            required
            className="w-full p-3 border rounded-md text-black"
            placeholder="Enter max tickets"
          />
        </div>

        {/* Date & Time (Side by Side) */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold text-lg">Date</label>
            <input
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-3 border rounded-md text-black"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg">Time</label>
            <input
              type="time"
              name="time"
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full p-3 border rounded-md text-black"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold text-lg">Location</label>
          <input
            type="text"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full p-3 border rounded-md text-black"
            placeholder="Enter event location"
          />
        </div>

        {/* VR Video Upload */}
        <div>
          <label className="block font-semibold text-lg">Upload VR Video</label>
          <div className="border border-dashed border-gray-400 p-4 rounded-md flex items-center justify-center">
            <input
              type="file"
              accept="video/*"
              onChange={uploadToIPFS}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
            >
              Choose File
            </label>
          </div>
          {vrurl && (
            <p className="text-sm text-green-400 mt-2">File uploaded successfully!</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-md hover:opacity-90 transition-all"
        >
          List Occasion
        </button>
      </form>
    </div>
  );
};

export default Register;
