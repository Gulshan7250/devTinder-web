import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);

  /* ================= FETCH OLD MESSAGES ================= */
  useEffect(() => {
    if (!targetUserId) return;

    const fetchChatMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/chat/${targetUserId}`,
          { withCredentials: true }
        );
        setMessages(res.data.messages || []);
      } catch (err) {
        console.log("Fetch chat error:", err);
      }
    };

    fetchChatMessages();
  }, [targetUserId]);

  /* ================= SOCKET SETUP ================= */
  useEffect(() => {
    if (!userId || !targetUserId) return;

    // create socket once
    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }

    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
    });

    const handleMessageReceived = ({ senderId, text }) => {
      setMessages((prev) => [...prev, { senderId, text }]);
    };

    socketRef.current.on("messageReceived", handleMessageReceived);

    return () => {
      socketRef.current.off("messageReceived", handleMessageReceived);
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto h-[80vh] flex flex-col bg-base-200 rounded-xl shadow-xl border border-gray-700">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700 bg-base-300 rounded-t-xl">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" />
          </div>
        </div>
        <div>
          <h2 className="font-semibold">Chat</h2>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === userId;

          return (
            <div
              key={index}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              <div
                className={`chat-bubble ${
                  isMe ? "bg-primary text-white" : "bg-base-300"
                }`}
              >
                {!isMe && (
                  <p className="text-xs text-gray-400 mb-1">Friend</p>
                )}
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-base-300 rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;