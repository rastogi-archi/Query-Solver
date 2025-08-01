import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, getSocket } from "../../utils/socket";
import { fetchMessages, addMessageRealTime, saveMessage } from "../../store/messageSlice";
import { getAllUsers } from "../../store/userSlice";
import Navbar from "../../components/common/HomeLayout/Navbar";
import NoUserSelected from "./NoUserSelected";

const Chat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userList, isLoading } = useSelector((state) => state.user);

  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");

  // Get all users on mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Connect socket on login
  useEffect(() => {
    if (user?._id) {
      const socket = connectSocket(user._id);

      socket.on("receive-message", ({ senderId, text }) => {
        const newMsg = { sender: "other", text };

        dispatch(addMessageRealTime(newMsg));

        if (selectedUser?._id === senderId) {
          setChatMessages((prev) => [...prev, newMsg]);
        }
      });

      return () => socket.off("receive-message");
    }
  }, [user, selectedUser, dispatch]);

  // Load messages when user selected
  const handleUserSelect = async (otherUser) => {
    setSelectedUser(otherUser);
    const res = await dispatch(
      fetchMessages({ senderId: user._id, receiverId: otherUser._id })
    );
    setChatMessages(res.payload || []);
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;

    const socket = getSocket();
    const message = {
      senderId: user._id,
      receiverId: selectedUser._id,
      text: input,
    };

    socket.emit("send-message", message);

    dispatch(saveMessage(message));

    const newMsg = { sender: "user", text: input };
    dispatch(addMessageRealTime(newMsg));
    setChatMessages((prev) => [...prev, newMsg]);
    setInput("");
  };


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 mt-18 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block w-1/4 bg-gray-900 text-white p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <ul className="space-y-2">
              {userList
                .filter((u) => u._id !== user._id)
                .map((u) => (
                  <li
                    key={u._id}
                    onClick={() => handleUserSelect(u)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${selectedUser?._id === u._id
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

        {/* Main Chat */}
        <div className="flex flex-col flex-1 bg-white">
          {/* Mobile user select */}
          <div className="md:hidden bg-gray-800 text-white p-4">
            <select
              onChange={(e) =>
                handleUserSelect(
                  userList.find((u) => u._id === e.target.value)
                )
              }
              className="w-full p-2 rounded text-white outline-none"
              value={selectedUser?._id || ""}
            >
              <option value="" disabled>
                Select a user to chat
              </option>
              {userList
                .filter((u) => u._id !== user._id)
                .map((u) => (
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
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex mb-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 max-w-[75%] text-sm break-words shadow-md
                        ${msg.sender === "user"
                          ? "bg-[#dcf8c6] text-black rounded-2xl rounded-bl-none"  // Green bubble on right
                          : "bg-[#e5e5ea] text-black rounded-2xl rounded-br-none"  // Gray bubble on left
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

          {/* Input */}
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
