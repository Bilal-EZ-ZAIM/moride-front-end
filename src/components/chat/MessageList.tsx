import React, { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Image, FileText, Check } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sent: boolean;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  file?: {
    type: 'image' | 'document';
    url: string;
    name?: string;
  };
}

export function MessageList() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour! Je suis intéressé par votre service.',
      sent: false,
      timestamp: new Date(),
      status: 'read',
    },
    {
      id: '2',
      text: 'Voici une photo de mon véhicule',
      sent: true,
      timestamp: new Date(),
      status: 'delivered',
      file: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80',
      },
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-2 sm:p-4">
      <div className="space-y-2 sm:space-y-4 max-w-3xl mx-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 ${
                message.sent
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              {message.file && (
                <div className="mb-2">
                  {message.file.type === 'image' ? (
                    <img
                      src={message.file.url}
                      alt="Shared image"
                      className="rounded-lg max-h-48 sm:max-h-60 w-auto"
                    />
                  ) : (
                    <div className="flex items-center gap-2 bg-white/10 p-2 rounded">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base truncate">
                        {message.file.name}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <p className="break-words text-sm sm:text-base">{message.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] sm:text-xs opacity-70">
                  {format(message.timestamp, 'HH:mm')}
                </span>
                {message.sent && (
                  <Check
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      message.status === 'read' ? 'text-blue-400' : 'opacity-70'
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}