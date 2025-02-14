import React from 'react';
import { Heart, MessageSquare, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../store/postSlice';
import toast from "react-hot-toast"

const Card = ({id, query, description, file, user, date }) => {
  const dispatch = useDispatch();
  const handleOnDelete = () => {
    console.log(id);
    dispatch(deletePost(id));
    if (response?.payload?.success) {
      toast.success("Post deleted successfully");
    } else {
      toast.error("Failed to delete post");
    }
  }

  // console.log(file)
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <div className='flex items-start'>
        <img
          className="w-full h-48 object-cover"
          src={file || ""}
          alt={query}
        />
        <button className='p-2 cursor-pointer' onClick={handleOnDelete}><X className='size-4' /></button>
      </div>

      {/* Post Content */}
      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{user || "Anonymous"}</span>
          <span>{date || "N/A"}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{query}</h2>
        <p className="text-gray-600 mb-4">
          {description}
        </p>

        {/* Actions Section */}
        <div className="flex items-center justify-between mt-4">
          <button className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <Heart size={20} />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <MessageSquare size={20} />
            <span>Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
