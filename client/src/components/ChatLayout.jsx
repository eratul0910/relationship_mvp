import React from 'react';

const ChatLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <div className="w-full max-w-3xl mx-auto p-4 space-y-4">{children}</div>
    </div>
  );
};

export default ChatLayout;
