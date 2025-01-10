import React from 'react';
import { Phone, Video, MoreVertical, Star, Clock } from 'lucide-react';

interface ChatHeaderProps {
  user: {
    name: string;
    image: string;
    rating: number;
    lastSeen?: string;
    online?: boolean;
  };
}

export function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{user.name}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{user.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${user.online ? 'bg-emerald-500' : 'bg-gray-400'}`} />
              <span className="text-gray-600">
                {user.online ? 'En ligne' : `Vu ${user.lastSeen}`}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Clock className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}