import React from 'react';
import { LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/authSlice';
import toast from 'react-hot-toast'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/login");
  }
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center h-18">
      {/* Logo */}
      <img src="logo.png" alt="Logo" className="h-36" />

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li className="hover:text-blue-600 cursor-pointer">
          <Link to="/">
            Home
          </Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer">
          <Link to="/connections">
            Connections
          </Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer">
          <Link to="/chat">
            Chat
          </Link>
        </li>
        <li className="hover:text-blue-600 cursor-pointer">
          <Link to="/query">
            Post Query
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <button className="bg-[#1c3d83] text-white font-medium px-4 py-2 rounded-lg shadow-md cursor-pointer flex gap-2" onClick={handleLogout}>
        <LogOut className='size-5'/>
        <p className='text-base'>LogOut</p>
      </button>
    </nav>
  );
};

export default Navbar;
