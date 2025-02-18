import React from 'react';
import {useDispatch} from "react-redux"
import { UserPlus, X } from 'lucide-react';
import { deleteUser } from '../../store/userSlice';
import toast from 'react-hot-toast';

const ConnectionCard = ({id, name, username, avatarUrl, onFollow, email }) => {
    const dispatch = useDispatch();

    const handleOnDelete = () => {
        try {
          // Dispatch the delete action and wait for the result
          const response = dispatch(deleteUser(id));
    
          // Check if the delete operation was successful
          if (response?.payload?.success) {
            toast.success("User deleted successfully");
          } else {
            toast.error("User not found");
          }
        } catch (error) {
            console.log(error)
          toast.error("An error occurred while deleting the user");
        }
      };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-full max-w-xs space-y-4 hover:shadow-xl transition-shadow duration-300 relative">
      {/* Close Button */}
      <button
        onClick={handleOnDelete}
        className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
      >
        <X size={20} />
      </button>

      {/* User Avatar */}
      <img
        src={avatarUrl || 'user.png'}
        alt={`${name}`}
        className="h-16 rounded-full object-cover border-3 border-[#1c3d83] mb-4"
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
        className="bg-[#1c3d83] text-white px-6 py-2 rounded-full shadow-md flex items-center justify-center gap-2 text-sm transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
      >
        <UserPlus size={16} />
        Follow
      </button>
    </div>
  );
};

export default ConnectionCard;
