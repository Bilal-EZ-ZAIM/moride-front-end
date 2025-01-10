import React, { useState, useRef, useEffect } from 'react';
import { Smile, Paperclip, Image, Send } from 'lucide-react';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (message) {
      setIsTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message]);

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="p-2 sm:p-4 border-t bg-white">
      <div className="flex items-center gap-1 sm:gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full hidden sm:block">
          <Smile className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </button>
        
        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-full focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
            placeholder="Message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          {isTyping && (
            <div className="absolute -top-6 left-4 text-xs text-gray-500">
              En train d'écrire...
            </div>
          )}
        </div>

        <button
          className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-full text-white"
          onClick={handleSend}
        >
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}