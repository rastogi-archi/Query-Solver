import React from 'react'
import AuthLeft from '../../components/common/AuthLeft'
import { Link } from 'react-router-dom'

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  }
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
