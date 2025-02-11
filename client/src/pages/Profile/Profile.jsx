import React, { useState } from "react";
import { Camera, ChevronLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [username, setUsername] = useState("johndoe123");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [bio, setBio] = useState("A passionate developer.");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!name || !email || !username || !phone) {
      toast.error("Please fill out all required fields.");
      return;
    }
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-4">
      <Link to="/">
        <button className="bg-[#1c3d83] p-2 text-white rounded-2xl w-20 mb-4 flex items-center cursor-pointer"><ChevronLeft className="size-4" />Back</button>
      </Link>
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Manage Your Profile</h1>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative group">
          <img
            src={profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md border-2 border-gray-200"
          />
          <label className="absolute bottom-0 right-0 bg-[#1c3d83] p-2 rounded-full cursor-pointer group-hover:opacity-90 transition-opacity">
            <Camera className="text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="johndoe123"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="A little about yourself..."
            rows={4}
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-[#1c3d83] text-white py-3 px-6 rounded-lg font-medium transition-all shadow-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
