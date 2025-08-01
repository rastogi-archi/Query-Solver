import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ConnectionCard from './ConnectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, checkAuth } from '../../store/userSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log(user)

  const handleFollow = (username) => {
    console.log(`Followed user: ${username}`);
  };

  console.log("user._id:", user?._id);
  console.log("userList IDs:", userList?.map(u => u._id));


  const filteredUsers = user && userList
    ? userList.filter(u => u?._id && user._id && u._id.toString() !== user._id.toString())
    : [];



  return (
    <div>
      <Navbar />
      <div className="p-8 bg-gray-50 min-h-screen mt-16">
        {/* Heading Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Connections</h2>
          <p className="text-lg text-gray-600">Explore and connect with users.</p>
        </div>

        {/* Users Grid Section */}
        {filteredUsers && filteredUsers.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.map((user) => (
              <ConnectionCard
                key={user._id}
                name={user.name}
                username={user.username}
                avatarUrl={user.avatarUrl}
                email={user.email}
                id={user._id}
                onFollow={() => handleFollow(user.username)}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full mt-10">
            <p className="text-gray-500 text-lg">No users available. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
