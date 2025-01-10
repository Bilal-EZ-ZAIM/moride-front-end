import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

interface Message {
  id: string;
  text: string;
  sent: boolean;
  timestamp: Date;
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour, je suis intéressé par votre trajet',
      sent: true,
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'Bien sûr ! Je peux vous donner plus de détails',
      sent: false,
      timestamp: new Date(Date.now() - 3500000),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    setMessages([...messages, {
      id: Date.now().toString(),
      text,
      sent: true,
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80"
            alt="Contact"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">Mohammed Alami</h3>
            <span className="text-sm text-emerald-600">En ligne</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            sent={msg.sent}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}