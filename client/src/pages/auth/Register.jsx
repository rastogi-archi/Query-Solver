import React, { useState } from 'react';
import AuthLeft from '../../components/common/AuthLeft';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { registerUser } from '../../store/authSlice';
import toast from 'react-hot-toast';


const initialState = {
    username: '',
    email: '',
    password: ''
}

const Register = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            toast.error("All fields are required.");
            return;
        }

        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                console.log(data);
                toast.success(data?.payload?.message);
                navigate("/login");
            }
            else {
                console.log(data);
                toast.error(data?.payload?.message);
            }
        })
    }
    return (
        <div className="flex h-screen flex-col sm:flex-row">
            {/* Left Side Auth Image/Section */}
            <div className="w-1/2 bg-gray-100">
                <AuthLeft />
            </div>

            {/* Right Side Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <form className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
                    <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
                        Create New Account
                    </h1>
                    <p className="mt-2 text-center text-gray-600">
                        Already have an account?
                        <Link
                            className="font-medium ml-2 text-blue-600 hover:underline"
                            to="/login"
                        >
                            Login
                        </Link>
                    </p>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register; 