import React from "react";

interface Message {
  _id: string;
  content: string;
  showAvatar: boolean;
  sender: string;
  profile: string;
  image: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  showAvatar: boolean;
  currentUserId: string;
}

export const MessageBubble = ({
  message,
  showAvatar,
  currentUserId,
}: MessageBubbleProps) => {
  const isOwn = message.sender === currentUserId;

  return (
    <div
      className={`flex ${
        isOwn ? "justify-end" : "justify-start"
      } items-end space-x-2 group`}
    >
      {/* {!isOwn && showAvatar && (
        <img
          src={message.profile}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      )} */}
      <div
        className={`
          relative max-w-[75%] sm:max-w-[65%] px-4 py-2.5 rounded-2xl
          transition-all duration-200
          ${
            isOwn
              ? "bg-indigo-500 text-white rounded-br-none hover:bg-indigo-600"
              : "bg-white text-gray-800 rounded-bl-none shadow-md hover:shadow-lg"
          }
        `}
      >
        <p className="break-words leading-relaxed">{message.content}</p>
        <span
          className={`text-xs ${
            isOwn ? "text-indigo-100" : "text-gray-500"
          } mt-1 block opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      {/* {isOwn && showAvatar && (
        <img
          src={message.profile}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      )} */}
    </div>
  );
};
