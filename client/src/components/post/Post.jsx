import React, { useEffect } from 'react';
import Card from "../post/Card";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPost } from '../../store/postSlice';

const Post = () => {
  const dispatch = useDispatch();
  const { postList, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchAllPost());
  }, [dispatch]);

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-lg animate-pulse">Loading posts...</p>
        </div>
      ) : postList && postList.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {postList.map((postItem) =>
            postItem ? (
              <Card
                key={postItem._id}
                query={postItem.query}
                description={postItem.description}
                file={postItem.file}
                id={postItem._id}
              />
            ) : null
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-lg">No posts available.</p>
        </div>
      )}
    </div>
  );
};

export default Post;
