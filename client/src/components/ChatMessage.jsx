import React from 'react';

const ChatMessage = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow ${
          isUser
            ? 'bg-indigo-500 text-white rounded-br-none'
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
