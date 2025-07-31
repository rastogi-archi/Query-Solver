import React from 'react';
import { Heart, MessageSquare, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/postSlice';
import toast from "react-hot-toast";

const Card = ({ id, query, description, file}) => {
  const dispatch = useDispatch();
  const {user}= useSelector((state) => state.auth)

  const handleOnDelete = async () => {
    try {
      const response = await dispatch(deletePost(id));
      if (response?.payload?.success) {
        toast.success("Post deleted successfully");
      } else {
        toast.error("Post not deleted");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-40 sm:h-44 flex items-center justify-center ">
        <img
          src={file || "no-image.png"}
          alt={query}
          className="max-h-full max-w-full"
        />
        <button
          className="absolute top-2 right-2 p-1.5 bg-white border rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
          onClick={handleOnDelete}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span className="font-medium truncate max-w-[60%]">{user?.fullName || "Anonymous"}</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <h2 className="text-base font-semibold text-gray-800 line-clamp-2">{query}</h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{description}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 mt-auto border-t">
          <button className="flex items-center gap-1 hover:text-red-500 transition">
            <Heart size={16} />
            Like
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500 transition">
            <MessageSquare size={16} />
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
