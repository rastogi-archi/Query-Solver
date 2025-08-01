import React, { useState } from 'react';
import { LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import toast from 'react-hot-toast';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-4 fixed top-0 w-full z-50 h-20 flex items-center justify-between">
      {/* Logo + Text */}
      <Link to="/" className="flex items-center text-xl sm:text-2xl font-bold text-[#1c3d83]">
        <img src="query_logo.png" alt="logo" className="h-20 w-20 object-contain" />
        <span className="hidden lg:inline">QuerySolver</span>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center space-x-6 text-gray-800 font-medium text-sm md:text-base">
        <li><Link to="/" className="hover:text-[#1c3d83] transition">Home</Link></li>
        <li><Link to="/connections" className="hover:text-[#1c3d83] transition">Connections</Link></li>
        <li><Link to="/chat" className="hover:text-[#1c3d83] transition">Chat</Link></li>
        <li><Link to="/query" className="hover:text-[#1c3d83] transition">Post Query</Link></li>
      </ul>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden text-gray-700">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Profile Dropdown - Click based */}
      <div className="hidden md:flex items-center relative ml-4">
        <button onClick={toggleProfileDropdown} className="flex items-center gap-1 focus:outline-none">
          <img
            src="/profile_icon.png"
            alt="User"
            className="h-10 w-10 rounded-full object-cover border border-gray-300"
          />
          <ChevronDown size={18} className="text-gray-600" />
        </button>

        {profileOpen && (
          <div className="absolute top-14 right-0 w-44 bg-white rounded-md shadow-lg z-50">
            <ul className="py-2 text-gray-700 text-sm">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setProfileOpen(false)}
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setProfileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md md:hidden z-40">
          <ul className="flex flex-col items-start p-4 space-y-4 font-medium text-gray-800">
            <li><Link to="/" className="block w-full hover:text-[#1c3d83]" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/connections" className="block w-full hover:text-[#1c3d83]" onClick={toggleMenu}>Connections</Link></li>
            <li><Link to="/chat" className="block w-full hover:text-[#1c3d83]" onClick={toggleMenu}>Chat</Link></li>
            <li><Link to="/query" className="block w-full hover:text-[#1c3d83]" onClick={toggleMenu}>Post Query</Link></li>
            <li><Link to="/profile" className="block w-full hover:text-[#1c3d83]" onClick={toggleMenu}>Profile</Link></li>
            <li>
              <button
                onClick={(e) => {
                  toggleMenu();
                  handleLogout(e);
                }}
                className="flex items-center gap-2 text-red-600 hover:text-red-800 w-full"
              >
                <LogOut size={18} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
