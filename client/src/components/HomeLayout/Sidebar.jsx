import React from 'react';
import { Tag, ArrowDownUp, History } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="hidden md:block bg-white min-h-screen w-64 p-5 mt-20">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        Sort By
        <ArrowDownUp className="size-5 text-gray-600" />
      </h2>

      <ul className="space-y-4">
        <li className="flex items-center p-3 bg-gray-50 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition">
          <History className="mr-3 text-[#1c3d83]" size={20} />
          <span className="text-sm font-medium text-gray-800">Recent</span>
        </li>
        <li className="flex items-center p-3 bg-gray-50 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition">
          <Tag className="mr-3 text-[#1c3d83]" size={20} />
          <span className="text-sm font-medium text-gray-800">Top</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
