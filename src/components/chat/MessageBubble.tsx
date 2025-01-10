import React from 'react';
import { format } from 'date-fns';

interface MessageBubbleProps {
  text: string;
  sent: boolean;
  timestamp: Date;
}

export function MessageBubble({ text, sent, timestamp }: MessageBubbleProps) {
  return (
    <div className={`flex ${sent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          sent
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="break-words">{text}</p>
        <span className="text-xs opacity-70 block mt-1">
          {format(timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  );
}