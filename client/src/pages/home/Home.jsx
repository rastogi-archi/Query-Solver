import React from 'react';
import Navbar from '../../components/homeLayout/Navbar';
import Sidebar from '../../components/homeLayout/Sidebar';
// import Adds from '../../components/homeLayout/Adds';
import Post from '../../components/post/Post';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-3">
          <Post />
        </div>

        <div className="w-64">
          {/* <Adds/> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
