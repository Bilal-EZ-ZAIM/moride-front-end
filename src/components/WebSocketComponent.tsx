import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  sender: string;
  content: string;
  roomName?: string;
  receiver?: string;
}

interface ChatProps {
  token: string;
  receiver?: string;
  roomname?: string;
}

const WebSocketComponent: React.FC<ChatProps> = ({ token, receiver, roomname }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io('http://localhost:3000', {
      extraHeaders: {
        token: token
      }
    });

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);

      if (receiver) {
        socketInstance.emit('join_room', { receiver });
      } else if (roomname) {
        socketInstance.emit('join_room', { roomname });
      }
    });

    socketInstance.on('receive_message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    socketInstance.on('sendMessageRoom', (roomMessages) => {
      setMessages(roomMessages);
    });

    socketInstance.on('errorMessage', (error) => {
      console.error('WebSocket Error:', error);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token, receiver, roomname]);

  useEffect(() => {
    if (socket && isConnected && roomname) {
      socket.emit('getmessage', { roomname, page: 1 });
    }
  }, [socket, isConnected, roomname]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !newMessage.trim()) return;

    const messageData = {
      content: newMessage,
      receiver: receiver,
      roomName: roomname
    };

    socket.emit('send_message', messageData);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === socket?.id ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
          >
            <p className="text-sm text-gray-600">{msg.sender}</p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder="اكتب رسالتك هنا..."
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          إرسال
        </button>
      </form>
    </div>
  );
};

export default WebSocketComponent;