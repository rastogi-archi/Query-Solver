import { useEffect, useState } from "react";
import Navbar from "../../components/homeLayout/Navbar";
import NoUserSelected from "./NoUserSelected";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/userSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { userList, isLoading } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
      [selectedUser._id]: [
        ...prev[selectedUser._id],
        { sender: "user", text: input },
      ],
    }));
    setInput("");
  };

  const filteredUsers = userList.filter((u) => u._id !== user?._id);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 mt-16 overflow-hidden">
        {/* Sidebar for desktop only */}
        <div className="hidden md:block w-1/4 bg-gray-900 text-white p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <ul className="space-y-2">
              {filteredUsers.map((u) => (
                <li
                  key={u._id}
                  onClick={() => handleUserSelect(u)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedUser?._id === u._id
                      ? "bg-blue-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {u.username}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chat Section */}
        <div className="flex flex-col flex-1 bg-white">
          {/* Dropdown for small screens */}
          <div className="md:hidden bg-gray-800 text-white p-4">
            <select
              onChange={(e) =>
                handleUserSelect(
                  filteredUsers.find((u) => u._id === e.target.value)
                )
              }
              className="w-full p-2 rounded text-white outline-none"
              value={selectedUser?._id || ""}
            >
              <option value="" disabled>
                Select a user to chat
              </option>
              {filteredUsers.map((u) => (
                <option key={u._id} value={u._id} className="text-black">
                  {u.username}
                </option>
              ))}
            </select>
          </div>

          {/* Chat Header */}
          {selectedUser && (
            <div className="flex items-center gap-3 px-4 pt-4">
              <img
                src="profile_icon.png"
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedUser.username}
              </h2>
            </div>
          )}

          <hr className="my-2 mx-4 border-gray-300" />

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedUser ? (
              <div className="space-y-4">
                {messages[selectedUser._id]?.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 max-w-xs rounded-lg text-sm ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoUserSelected />
            )}
          </div>

          {/* Input area */}
          {selectedUser && (
            <div className="p-4 bg-gray-100 border-t">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={sendMessage}
                  className="px-5 py-3 bg-[#1c3d83] text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
