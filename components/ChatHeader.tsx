
import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-[#075E54] text-white p-3 flex items-center shadow-md sticky top-0 z-10">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3">
        <span className="text-2xl" role="img" aria-label="roti"> रोटी</span>
      </div>
      <div>
        <h1 className="text-lg font-bold">Mane Rotti</h1>
        <p className="text-sm text-gray-200">online</p>
      </div>
    </div>
  );
};

export default ChatHeader;
