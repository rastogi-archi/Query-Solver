import React, { useEffect } from 'react';
import Navbar from '../../components/homeLayout/Navbar';
import ConnectionCard from './ConnectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/userSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleFollow = (username) => {
    console.log(`Followed user: ${username}`);
  };

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
        {userList && userList.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userList.map((user) => (
              <ConnectionCard
                key={user._id} // Assuming 'id' is a unique key for each user
                name={user.name}
                username={user.username}
                avatarUrl={user.avatarUrl}
                email={user.email}
                id = {user._id}
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
