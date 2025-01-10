import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { CallOverlay } from './CallOverlay';

export function ChatMain() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);

  const handleStartCall = (type: 'audio' | 'video') => {
    setCallType(type);
    setIsCallActive(true);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader onStartCall={handleStartCall} />
      <MessageList />
      <MessageInput />
      
      {isCallActive && callType && (
        <CallOverlay 
          type={callType} 
          onEnd={() => {
            setIsCallActive(false);
            setCallType(null);
          }} 
        />
      )}
    </div>
  );
}