import React from "react";
import { MessageSquare } from "lucide-react";

const NoUserSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <MessageSquare className="w-16 h-16 mb-4 text-blue-500" />
      <h2 className="text-2xl font-semibold">No User Selected</h2>
      <p className="text-lg mt-2">Select a user from the left to start chatting.</p>
    </div>
  );
};

export default NoUserSelected;
