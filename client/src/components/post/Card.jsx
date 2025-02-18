import React from 'react';
import { Heart, MessageSquare, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../store/postSlice';
import toast from "react-hot-toast"

const Card = ({ id, query, description, file, user, date }) => {

  const dispatch = useDispatch();
  const handleOnDelete = async () => {
    try {
      // Dispatch the delete action and wait for the result
      const response = await dispatch(deletePost(id));

      // Check if the delete operation was successful
      if (response?.payload?.success) {
        toast.success("Post deleted successfully");
      } else {
        toast.error("Post not deleted");
      }
    } catch (error) {
      // Handle any potential errors
      console.error("Error deleting post:", error);
      toast.error("An error occurred while deleting the post");
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          className="w-full h-56 object-contain rounded-t-2xl"
          src={file || "noimage.jpg"}
          alt={query}
        />
        <button
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors duration-300"
          onClick={handleOnDelete}>
          <X className="size-4" />
        </button>
      </div>

      {/* Post Content */}
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-semibold">{user || "Anonymous"}</span>
          <span>{date || "N/A"}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">{query}</h2>
        <p className="text-gray-600 mb-5 text-sm leading-relaxed">{description}</p>

        {/* Actions Section */}
        <div className="flex items-center justify-between mt-4 text-gray-600">
          <button
            className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition-colors duration-300">
            <Heart size={20} />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition-colors duration-300">
            <MessageSquare size={20} />
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
