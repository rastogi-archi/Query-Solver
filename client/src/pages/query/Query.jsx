import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { createPost } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  user: '',
  query: '',
  phone: '',
  description: '',
  priority: '',
  image: null
};

const Query = () => {
  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('user', formData.user);
      data.append('query', formData.query);
      data.append('description', formData.description);
      data.append('phone', formData.phone);
      data.append('priority', formData.priority);
      if (file) data.append('image', file);

      const response = await dispatch(createPost(data));
      if (response?.payload?.success) {
        toast.success("Query posted successfully!");
        setFormData(initialState);
        setFile(null);
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(response?.payload?.message || "Failed to submit query.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-md">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#1c3d83] mb-8">
            Post Your Query
          </h1>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* Query Title */}
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
                Query Title
              </label>
              <input
                id="query"
                name="query"
                type="text"
                placeholder="Enter your query"
                value={formData.query}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1c3d83] focus:outline-none transition"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Query Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your query in detail"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1c3d83] focus:outline-none transition resize-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1c3d83] focus:outline-none transition"
              />
            </div>

            {/* Priority Level */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1c3d83] focus:outline-none transition bg-white"
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Attach a file (optional)
              </label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1c3d83] focus:outline-none transition bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#1c3d83] file:text-white hover:file:bg-[#16306b]"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#1c3d83] text-white py-2 mt-3 rounded-xl font-semibold hover:bg-[#16306b] transition-all duration-200"
              >
                Submit Query
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Query;
