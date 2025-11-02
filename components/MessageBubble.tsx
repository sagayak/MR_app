import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  // A simple function to convert markdown-like bold syntax to HTML
  const formatText = (text: string) => {
    // Only format messages from the bot
    if (isUser) {
      return text;
    }
    // Convert *text* to <strong class="font-semibold">text</strong>
    return text.replace(/\*(.*?)\*/g, '<strong class="font-semibold">$1</strong>');
  };


  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-xl px-4 py-2 max-w-xs lg:max-w-md shadow-md ${
          isUser ? 'bg-[#DCF8C6] text-gray-800' : 'bg-white text-gray-800'
        }`}
      >
        <p
          className="text-sm break-words whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
        />
        <p className={`text-xs mt-1 text-right ${isUser ? 'text-gray-500' : 'text-gray-400'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;