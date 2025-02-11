import React from 'react';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg p-4 flex justify-between items-center fixed top-0 w-full z-50 h-16">
      {/* Logo */}
      <Link to="/">
        <img src="logo.png" alt="connect" className="h-36 object-contain" />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex space-x-8 text-gray-800 font-semibold text-sm md:text-base">
        <li className="hover:text-blue-600 cursor-pointer transition duration-200 ease-in-out">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition duration-200 ease-in-out">
          <Link to="/connections">Connections</Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition duration-200 ease-in-out">
          <Link to="/chat">Chat</Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer transition duration-200 ease-in-out">
          <Link to="/query">Post Query</Link>
        </li>
      </ul>

      {/* User Info & Logout Button */}
      <div className="flex items-center gap-4">
        <Link to="/profile">
          <img src="user.png" alt="User" className="h-10 w-10 rounded-full object-cover border-2 border-gray-300 cursor-pointer" />
        </Link>

        {/* Logout Button */}
        <button
          className="bg-[#1c3d83] text-white font-medium px-6 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="hidden sm:inline-block">LogOut</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
