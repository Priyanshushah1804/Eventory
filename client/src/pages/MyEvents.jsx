import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyEvents = ({ state, account }) => {
    const { contract } = state;
    const [myEvents, setMyEvents] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [vrUrl, setVrUrl] = useState("");

    useEffect(()=>{
        getMyEvents();
    },[state])

    const getMyEvents = async () => {
        try {
            const eventIds = await contract.getEventsCreatedBy(account);

            const eventsData = await Promise.all(
                eventIds.map(async (eventId) => {
                    const eventDetails = await contract.occasions(eventId);
                    return {
                        id: eventDetails.id.toString(),
                        name: eventDetails.name,
                        cost: eventDetails.cost.toString(),
                        tickets: eventDetails.tickets.toString(),
                        maxTickets: eventDetails.maxTickets.toString(),
                        date: eventDetails.date,
                        time: eventDetails.time,
                        location: eventDetails.location,
                        bannerImage: eventDetails.bannerImage,
                        vrVideo: eventDetails.vrVideo,
                        creator: eventDetails.creator,
                    };
                })
            );
            setMyEvents(eventsData);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

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
                        pinata_secret_api_key: "2c2e9e43bca7a619154cb48e8b060c5643ea6220d0b7c9deb565fa491b3b3a50",
                        "Content-Type": "multipart/form-data",
                    },
                });

                const resData = res.data;
                setVrUrl(`https://ipfs.io/ipfs/${resData.IpfsHash}`);
                console.log("Uploaded VR Video URL:", `https://ipfs.io/ipfs/${resData.IpfsHash}`);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const uploadVRVideo = async (id) => {
        try {
            const tx = await contract.setVRVideo(id, vrUrl);
            await tx.wait();
            console.log("VR Video updated on blockchain:", tx);
        } catch (error) {
            console.error("Error updating VR video:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">My Events</h2>
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={getMyEvents}>Get My Events</button> */}
            
                {myEvents.length > 0 ? (
                    myEvents.map((event) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div key={event.id} className="border rounded-lg shadow-md p-4 relative">
                            <h3 className="text-lg font-semibold">{event.name}</h3>
                            <p>Cost: {event.cost} ETH</p>
                            <p>Tickets: {event.tickets}/{event.maxTickets}</p>
                            <p>Date: {event.date}</p>
                            <p>Time: {event.time}</p>
                            <p>Location: {event.location}</p>
                            <img src={event.bannerImage} alt={event.name} className="w-full h-48 object-cover rounded-md mt-2" />
                            {event.vrVideo && (
                                <div className="relative group mt-2">
                                    <p className="text-blue-500 cursor-pointer">VR Video Available</p>
                                    <video src={event.vrVideo} className="hidden group-hover:block absolute top-0 left-0 w-full h-40 rounded-md" controls/>
                                </div>
                            )}
                            <input type="file" accept="video/*" className="mt-2" onChange={handleFileChange} />
                            <button className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md" onClick={() => uploadVRVideo(event.id)}>Upload VR Video</button>
                        </div>
            </div>
                    ))
                ) : (
                    <p className="text-center">No events found</p>
                )}
        </div>
    );
};

export default MyEvents;
