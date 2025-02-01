import React from 'react';
import { Link } from 'react-router-dom';

const UnAuth = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-white to-gray-50">
            <div className="bg-white shadow-xl p-12 rounded-3xl max-w-lg text-center">
                <h1 className="text-7xl font-extrabold text-red-500 mb-6 animate-pulse">404</h1>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    It looks like the page you are trying to access doesn't exist. 
                    Please check the URL or head back to our homepage.
                </p>
                <Link to="/">
                    <button className="px-8 py-3 bg-[#1c3d83] text-white font-medium rounded-xl shadow-lg hover:scale-105 transform transition-all cursor-pointer">
                        Go Back Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default UnAuth;
