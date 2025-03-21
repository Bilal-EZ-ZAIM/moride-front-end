import React, { useState, useRef, useCallback } from "react";
import { Smile, Paperclip, Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const message = formData.get("message") as string;

      if (message?.trim()) {
        onSendMessage(message);
        formRef.current?.reset();
      }
    },
    [onSendMessage]
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="border-t bg-white p-4"
    >
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Smile className="w-5 h-5 text-gray-600" />
        </button>
        <button
          type="button"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex-1 flex items-center space-x-2">
          <input
            name="message"
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
