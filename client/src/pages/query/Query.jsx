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
    image: null
  }

  const Query = () => {
    const [formData, setFormData] = useState(initialState);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const data = new FormData();
        data.append('query', formData.query);
        data.append('description', formData.description);
        data.append('phone', formData.phone);
        data.append('priority', formData.priority);
    
        if (file) {
          data.append('image', file);
        }
    
        // Await the dispatched action
        const response = await dispatch(createPost(data));
    
        console.log(response);
        console.log(formData);
    
        if (response?.payload?.success) {
          toast.success("Query posted successfully!");
          setFormData(initialState);
          setFile(null);
        } else {
          toast.error(response?.payload?.message || "Failed to submit query.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while submitting.");
      }
    };
    



    return (
      <div className="font-sans min-h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-16">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">Post Your Query Here</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c3d83] transition duration-200"
              />
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
