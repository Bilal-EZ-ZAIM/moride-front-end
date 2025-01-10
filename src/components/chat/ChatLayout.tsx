import React, { useState } from 'react';
import { ChatSidebar } from './ChatSidebar';
import { ChatMain } from './ChatMain';
import { ArrowLeft } from 'lucide-react';

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="h-screen bg-gray-100">
      <div className="h-full flex">
        <div className={`${
          selectedChat ? 'hidden md:block' : 'block'
        } w-full md:w-80 border-r`}>
          <ChatSidebar onChatSelect={(id) => setSelectedChat(id)} />
        </div>
        
        <div className={`${
          selectedChat ? 'block' : 'hidden md:block'
        } flex-1 flex flex-col`}>
          {selectedChat ? (
            <>
              <button 
                className="md:hidden p-2 absolute top-2 left-2 z-10"
                onClick={() => setSelectedChat(null)}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <ChatMain chatId={selectedChat} />
            </>
          ) : (
            <div className="hidden md:flex items-center justify-center h-full text-gray-500">
              Sélectionnez une conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}