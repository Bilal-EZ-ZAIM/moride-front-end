import React, { useState, useRef, useCallback } from "react";
import { Smile, Paperclip, Send, Mic, Square } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<number>();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message = formData.get('message') as string;

    if (message?.trim()) {
      onSendMessage(message);
      formRef.current?.reset();
    }
  }, [onSendMessage]);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = window.setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="border-t bg-white p-4">
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
          {!isRecording && (
            <input
              name="message"
              type="text"
              placeholder="Message..."
              className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          )}

          {isRecording && (
            <div className="flex-1 flex items-center space-x-2 p-2 bg-red-50 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 font-medium">
                {formatTime(recordingTime)}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>

          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            className={`p-2 rounded-full transition-colors ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-500 hover:bg-emerald-600"
            } text-white`}
          >
            {isRecording ? (
              <Square className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatInput;