import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Post from '../../components/post/Post';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - hidden on small screens */}
        <div className="w-full md:w-64 border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4">
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Home;
