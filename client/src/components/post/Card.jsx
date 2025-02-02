import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';

const Card = ({ query, description, image, user, date }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <img
        className="w-full h-48 object-cover"
        src={image || ""}
        alt={query}
      />

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
