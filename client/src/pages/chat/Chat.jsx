import React, { useEffect, useState } from "react";
import Navbar from "../../components/homeLayout/Navbar";
import NoUserSelected from "./NoUserSelected";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { userList, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages((prev) => ({
      ...prev,
      [user._id]: prev[user._id] || [],
    }));
  };

  const sendMessage = () => {
    if (input.trim() === "" || !selectedUser) return;

    setMessages((prev) => ({
      ...prev,
      [selectedUser._id]: [...prev[selectedUser._id], { sender: "user", text: input }],
    }));
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar />
      {/* User List */}
      <div className="w-1/4 bg-gray-900 text-white mt-16 p-6">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <ul className="space-y-2">
            {userList.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className={`p-3 cursor-pointer rounded-lg transition-colors duration-200 ${
                  selectedUser?._id === user._id
                    ? "bg-[#1C3D83]"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chat Box */}
      <div className="flex flex-col w-3/4 bg-white mt-14">
        <div className="flex-grow p-6 overflow-y-auto">
          {selectedUser ? (
            <>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {selectedUser.name}
              </h2>
              <div className="space-y-4">
                {messages[selectedUser._id]?.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 max-w-xs rounded-lg text-sm ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <NoUserSelected />
          )}
        </div>

        {/* Input Area */}
        {selectedUser && (
          <div className="p-4 bg-gray-100 border-t">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 bg-white"
              />
              <button
                onClick={sendMessage}
                className="px-6 py-3 text-white bg-[#1c3d83] rounded-lg cursor-pointer transition-all"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
