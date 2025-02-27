import React from "react";

// Types for our props and message structure
interface Message {
  _id: string;
  content: string;
  showAvatar: boolean;
  sender: string;
  profile: string;
  image: string;
}

interface MessageBubbleProps {
  message: Message;
  showAvatar: boolean;
  currentUserId: string;
}

const MessageBubble = ({
  message,
  showAvatar,
  currentUserId,
}: MessageBubbleProps) => {
  const isOwn = message.sender === currentUserId;
console.log(currentUserId)
  return (
    <div
      className={`flex ${
        isOwn ? "justify-end" : "justify-start"
      } items-end space-x-2`}
    >
      {!isOwn && showAvatar && (
        <img
          src={message.image}
          alt="User Avatar"
          className="w-6 h-6 rounded-full"
        />
      )}
      {!isOwn && !showAvatar && <div className="w-6" />}
      <div
        className={`
          max-w-[75%] sm:max-w-[65%] px-4 py-2 rounded-2xl
          ${
            isOwn
              ? "bg-emerald-500 text-white rounded-br-none"
              : "bg-white text-gray-800 rounded-bl-none shadow-sm"
          }
        `}
      >
        <p className="break-words">{message.content}</p>
        <span
          className={`text-xs ${
            isOwn ? "text-emerald-50" : "text-gray-500"
          } mt-1 block`}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;