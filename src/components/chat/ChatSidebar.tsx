import React from 'react';
import { Search } from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  online: boolean;
}

export function ChatSidebar() {
  const contacts: ChatContact[] = [
    {
      id: '1',
      name: 'Mohammed Alami',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80',
      lastMessage: 'Je peux vous offrir un bon prix pour le trajet',
      timestamp: '12:30',
      unread: true,
      online: true
    },
    {
      id: '2',
      name: 'Sarah L.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      lastMessage: 'Merci pour le service !',
      timestamp: '10:45',
      unread: false,
      online: false
    }
  ];

  return (
    <div className="w-80 border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une conversation..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map(contact => (
          <div
            key={contact.id}
            className="p-4 hover:bg-gray-50 cursor-pointer border-b"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold truncate">{contact.name}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {contact.timestamp}
                  </span>
                </div>
                <p className={`text-sm truncate ${contact.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}