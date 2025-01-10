import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ChatPreview {
  id: string;
  user: {
    name: string;
    image: string;
    online: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    unread: boolean;
  };
}

export function ChatList() {
  const chats: ChatPreview[] = [
    {
      id: '1',
      user: {
        name: 'Mohammed Alami',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80',
        online: true,
      },
      lastMessage: {
        text: 'Je serai là dans 10 minutes',
        timestamp: new Date(),
        unread: true,
      },
    },
    {
      id: '2',
      user: {
        name: 'Sarah L.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
        online: false,
      },
      lastMessage: {
        text: 'Merci pour le trajet !',
        timestamp: new Date(Date.now() - 3600000),
        unread: false,
      },
    },
  ];

  return (
    <div className="divide-y">
      {chats.map((chat) => (
        <div key={chat.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer">
          <div className="relative">
            <img
              src={chat.user.image}
              alt={chat.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {chat.user.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold truncate">{chat.user.name}</h3>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(chat.lastMessage.timestamp, { 
                  addSuffix: true,
                  locale: fr 
                })}
              </span>
            </div>
            <p className={`text-sm truncate ${chat.lastMessage.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
              {chat.lastMessage.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}