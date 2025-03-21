import React, { useState } from "react";
import {
  Phone,
  Video,
  MoreVertical,
  X,
  Mic,
  MicOff,
  Camera,
  CameraOff,
} from "lucide-react";

export function ChatHeader({ user }: any) {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  console.log(user);

  const handleVoiceCall = () => {
    setIsInCall((prev) => !prev);
    setIsVideoCall(false);
  };

  const handleVideoCall = () => {
    setIsInCall((prev) => !prev);
    setIsVideoCall(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user.imageProfile}
              alt={user.imageProfile}
              className="w-10 h-10 rounded-full object-cover"
            />
            {user.isOnline === "online" && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{user.username}</h2>
            <p className="text-sm text-green-500">
              {user.isOnline === "online" ? "En ligne" : "Hors ligne"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={handleVoiceCall}
            className={`p-2 rounded-full transition-colors ${
              isInCall && !isVideoCall
                ? "bg-red-500 text-white"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={handleVideoCall}
            className={`p-2 rounded-full transition-colors ${
              isInCall && isVideoCall
                ? "bg-red-500 text-white"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {isInCall && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
          <span className="text-sm font-medium text-gray-700">
            {isVideoCall ? "Appel vidéo en cours" : "Appel vocal en cours"}
          </span>
          <div className="flex items-center space-x-2">
            {isVideoCall && (
              <button
                onClick={() => setIsCameraOff((prev) => !prev)}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                {isCameraOff ? (
                  <CameraOff className="w-4 h-4 text-gray-600" />
                ) : (
                  <Camera className="w-4 h-4 text-gray-600" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              {isMuted ? (
                <MicOff className="w-4 h-4 text-gray-600" />
              ) : (
                <Mic className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => {
                setIsInCall(false);
                setIsVideoCall(false);
                setIsMuted(false);
                setIsCameraOff(false);
              }}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
