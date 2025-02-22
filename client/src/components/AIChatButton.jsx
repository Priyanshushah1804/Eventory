import React, { useState, useEffect } from "react";
import { Button, Modal, Avatar } from "antd";
import { RobotOutlined, UserOutlined } from "@ant-design/icons";
import { resolveQuery } from "../components/chat";
import SeatSelectionModal from "./SeatSelectionModal";

const AIChatButton = ({ account, state }) => {
  const { contract } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [occasions, setOccasions] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(null);


  const handleBuyTicket = (occasion) => {
    setSelectedOccasion(occasion);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOccasion(null);
  };


  const showModal = () => {
    setIsModalOpen(true);
  };
  const findEvent = (id) => {
    return occasions.find((occasion) => occasion.id === id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          remainingTickets: Number(occasion[3]),
          maxTickets: Number(occasion[4]),
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

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    const response = await resolveQuery(inputValue, occasions);
    const rep = JSON.parse(response);
    console.log(rep);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, sender: "user" },
      { text: rep.reply, sender: "ai", id: rep.id },
    ]);
    setInputValue("");
  };

  useEffect(() => {
    fetchAllEvents();
  }, [contract]);

  return (
    <>
      <div className="fixed bottom-20 right-10 z-20">
        <Button
          shape="circle"
          type="primary"
          icon={<RobotOutlined />}
          size="large"
          onClick={showModal}
          style={{ height: "50px", width: "50px" }}
        />
      </div>

      <Modal
        title="AI Chatbot"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={500}
        style={{
          top: "auto",
          bottom: 60,
          right: 120,
          left: "auto",
          position: "fixed",
        }}
      >
        <div
          style={{ height: "400px", display: "flex", flexDirection: "column" }}
        >
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            {messages.map((message, index) => {
              const event = message.id ? findEvent(message.id) : null;
              console.log(event)
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                    justifyContent:
                      message.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {message.sender === "ai" && (
                    <Avatar
                      icon={<RobotOutlined />}
                      style={{ backgroundColor: "#87d068", marginRight: "8px" }}
                    />
                  )}
                  <div
                    style={{
                      background:
                        message.sender === "ai" ? "#f0f0f0" : "#1890ff",
                      color: message.sender === "ai" ? "#000" : "#fff",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      maxWidth: "70%",
                      display:"flex",
                      flexDirection:"column"
                    }}
                  >
                    <div>
                    {message.text}
                    </div>
                    <div>{event && (
                    <div className="w-full p-6 bg-gray-800 rounded-lg shadow-xl transition-all">
                        {/* VR Video Preview */}
                        <div className="relative w-full h-48 overflow-hidden rounded-lg">
                          <video
                            src={event.vrUrl}
                            className="w-full h-full object-cover"
                            controls
                          />
                        </div>

                        {/* Event Details */}
                        <h3 className="text-xl font-bold mt-4">{event.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {event.location}
                        </p>

                        <div className="mt-3 flex justify-between text-sm">
                          <span className="bg-green-500 px-3 py-1 rounded-md">
                            {event.cost} ETH
                          </span>
                          <span className="bg-blue-500 px-3 py-1 rounded-md">
                            {event.remainingTickets}/{event.maxTickets} Tickets
                            Left
                          </span>
                        </div>

                        <div className="mt-3 text-sm">
                          📅 {event.date} ⏰ {event.time}
                        </div>

                        {/* Purchase Button */}
                        <button
                          className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md transition"
                          onClick={() => handleBuyTicket(event)}
                        >
                          Buy Ticket
                        </button>
                    </div>
                  )}</div>
                  </div>
                  {message.sender === "user" && (
                    <Avatar
                      icon={<UserOutlined />}
                      style={{ backgroundColor: "#1890ff", marginLeft: "8px" }}
                    />
                  )}
                  
                </div>
              );
            })}
          </div>

          <div style={{ padding: "16px", borderTop: "1px solid #f0f0f0" }}>
            <div
              style={{ display: "flex", gap: "8px" }}
              className="flex align-center justify-center"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                }}
              />
              <Button type="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </Modal>

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
    </>
  );
};

export default AIChatButton;
