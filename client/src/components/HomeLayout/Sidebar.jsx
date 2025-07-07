import React, { useState } from 'react';
import { Tag, ArrowDownUp, History, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Toggle Button (visible on small screens) */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 bg-white shadow-md p-2 rounded-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`bg-white shadow-lg h-screen p-5 mt-20 fixed top-0 transition-transform duration-300 ease-in-out z-40
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        w-64 hidden lg:block lg:translate-x-0 lg:static lg:h-[calc(100vh-80px)]`}
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          Sort By
          <ArrowDownUp className="size-5 text-gray-600" />
        </h2>

        <ul className="space-y-4">
          {/* Recent */}
          <li className="flex items-center p-3 bg-gray-50 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition">
            <History className="mr-3 text-[#1c3d83]" size={20} />
            <span className="text-sm font-medium text-gray-800">Recent</span>
          </li>

          {/* Top */}
          <li className="flex items-center p-3 bg-gray-50 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition">
            <Tag className="mr-3 text-[#1c3d83]" size={20} />
            <span className="text-sm font-medium text-gray-800">Top</span>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
