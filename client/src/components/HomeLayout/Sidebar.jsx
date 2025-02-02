import React from 'react';
import {Tag, ArrowDownUp, History } from 'lucide-react'; // Import icons from lucide-react

const Sidebar = () => {
  return (
    <div className="w-full lg:w-64 p-5 bg-white shadow-lg h-screen overflow-y-auto mt-16 fixed">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex gap-2"><p>Sort By</p> <ArrowDownUp className='size-5 mt-2'/></h2>

      <ul className="space-y-5">
        {/* Price Range Filter */}
        <li className="flex items-center p-4 bg-gray-50 rounded-md shadow-md cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition duration-300 ease-in-out">
          <History className="mr-3 text-[#1c3d83]" />
          Recent
        </li>

        {/* Category Filter */}
        <li className="flex items-center p-4 bg-gray-50 rounded-md shadow-md cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition duration-300 ease-in-out">
          <Tag className="mr-3 text-[#1c3d83]" />
          Top
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
