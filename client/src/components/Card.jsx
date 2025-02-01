import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';

const Card = ({ title, content, imageUrl, author, date }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />

      {/* Post Content */}
      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-4">
          {content.length > 80 ? `${content.slice(0, 80)}...` : content}
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
