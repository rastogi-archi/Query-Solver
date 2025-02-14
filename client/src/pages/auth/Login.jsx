import React, { useState } from 'react'
import AuthLeft from '../../components/common/AuthLeft'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/authSlice'
import toast from 'react-hot-toast'


const initialState = {
  email: '',
  password: ''
}
const Login = () => {
  const[formData, setFormData] = useState(initialState); 
  const dispatch = useDispatch();
  const navigate =  useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await dispatch(loginUser(formData)).unwrap(); // Use `unwrap` for cleaner promise handling
    try {
      if (data?.success) {
        toast.success(data?.message);
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <div className='flex h-screen flex-col sm:flex-row'>
      <div className='w-1/2 bg-gray-100'>
        <AuthLeft />
      </div>
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50'>
        <form className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
          Sign in to your account
          </h1>
          <p className="mt-2 text-center text-gray-600">
          Don't have an account
            <Link
              className="font-medium ml-2 text-blue-600 hover:underline"
              to="/register"
            >
              Register
            </Link>
          </p>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
