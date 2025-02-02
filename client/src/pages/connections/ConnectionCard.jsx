import React from 'react';
import { UserPlus } from 'lucide-react';

const ConnectionCard = ({ name, username, avatarUrl, onFollow, email }) => {
    return (
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-full max-w-xs space-y-4 hover:shadow-xl transition-shadow duration-300">
            {/* User Avatar */}
            <img
                src={avatarUrl || 'user.png'}
                alt={`${name}`}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#1c3d83] mb-4"
            />

            {/* User Info */}
            <div className="text-center space-y-1">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-600">{username}</p>
                <p className="text-sm text-gray-400">{email}</p>
            </div>

            {/* Follow Button */}
            <button
                onClick={onFollow}
                className="bg-[#1c3d83] text-white px-6 py-2 rounded-full shadow-md flex items-center justify-center gap-2 text-sm transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                <UserPlus size={16} />
                Follow
            </button>
        </div>
    );
};

export default ConnectionCard;
