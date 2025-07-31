import React, { useState, useEffect } from "react";
import { Camera, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editUserProfile, getUserProfile } from "../../store/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user || {});

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  // Fetch user profile on mount
  useEffect(() => {
    if (user?._id) {
      dispatch(getUserProfile(user._id));
    }
  }, [dispatch, user?._id]);

  // Prefill form when user data is available
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
      setPhone(user.phone || "");
      setBio(user.bio || "");
      setImage(user.image || "profile_icon.png");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!user?._id) return;

    const updatedData = {
      id: user._id,
      email,
      username,
      phone,
      bio,
      image, // Send image field as expected by backend
    };

    dispatch(editUserProfile(updatedData))
      .then(() => {
        toast.success("Profile updated successfully!");
        dispatch(getUserProfile(user._id)); // Refresh user after update
      })
      .catch(() => toast.error("Failed to update profile"));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-4">
      <Link to="/">
        <button className="bg-[#1c3d83] p-2 text-white rounded-2xl w-20 mb-4 flex items-center cursor-pointer">
          <ChevronLeft className="size-4" />Back
        </button>
      </Link>
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Manage Your Profile</h1>

      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative group">
          <img
            src={image || "https://via.placeholder.com/150"}
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
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us a little about yourself..."
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
