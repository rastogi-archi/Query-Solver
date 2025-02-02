import React, { useState } from 'react';
import Navbar from '../../components/homeLayout/Navbar';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { createPost } from '../../store/postSlice';

const initialState = {
  query: '',
  description: '',
  phone: '',
  priority: '',
  file: null
};

const Query = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const action = dispatch(createPost(formData));
      const { payload } = action;

      if (payload?.message) {
        toast.success(payload.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to submit query.');
    }
    setFormData(initialState);
  };

  return (
    <div className="font-sans min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-16">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">Post Your Query Here</h1>
        <form onSubmit={handleSubmit}>
          {/* Query Input */}
          <div className="mb-5">
            <label htmlFor="query" className="block text-lg font-semibold text-gray-700 mb-1">Query</label>
            <input
              id="query"
              name="query"
              type="text"
              placeholder="Enter your query"
              value={formData.query}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c3d83] transition duration-200"
            />
          </div>

          {/* Query Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">Query Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your query in detail"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c3d83] transition duration-200"
              rows="6"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-5">
            <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 mb-1">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c3d83] transition duration-200"
            />
          </div>

          {/* Priority Level */}
          <div className="mb-5">
            <label htmlFor="priority" className="block text-lg font-semibold text-gray-700 mb-1">Priority Level</label>
            <select
              id="priority"
              name="priority"
              required
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c3d83] transition duration-200"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* File Attachment */}
          <div className="mb-6">
            <label htmlFor="file" className="block text-lg font-semibold text-gray-700 mb-2">
              Attach a file
            </label>
            <div className="relative">
              <input
                id="file"
                name="file"
                type="file"
                value={formData.file ? formData.file.name : ""}
                onChange={handleChange}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              <div className="flex justify-center items-center p-4 border-2 border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1c3d83] transition duration-200 hover:border-[#1c3d83]">
                <span className="text-gray-500">Choose a file</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#1c3d83] text-white font-semibold rounded-xl focus:outline-none focus:ring-2 transition duration-200"
          >
            Submit Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default Query;
