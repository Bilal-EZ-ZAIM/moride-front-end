import { useEffect, useState, useCallback, useRef } from "react";
import { Menu } from "lucide-react";
import { ContactsList } from "../components/chat/ContactsList";
import { ChatHeader } from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import { ChatInput } from "../components/chat/ChatInput";
import { io } from "socket.io-client";
import { useAppSelector } from "../hooks";

function Messages() {
  const { user } = useAppSelector((state) => state.auth);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [listContacts, setListContacts] = useState<any[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [showContacts, setShowContacts] = useState(true);
  const socketRef = useRef<any>(null); 
  const currentUserId = user?._id;
  const [receiver, setReceiver] = useState<any>(null);

  const formatMessage = useCallback(
    (msg: any, prevMsg?: any) => ({
      _id: msg._id,
      image: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
      profile: msg.sender.username,
      typeMessage: msg.type,
      sender: msg.sender._id,
      receiver: msg.receiver._id,
      content: msg.content,
      date: new Date(msg.createdAt).toLocaleString(),
      showAvatar:
        !prevMsg ||
        prevMsg.sender._id !== msg.sender._id ||
        new Date(msg.createdAt).getTime() -
          new Date(prevMsg.createdAt).getTime() >
          300000,
    }),
    []
  );

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      extraHeaders: {
        token: localStorage.getItem("token") || "",
      },
    });

    socketRef.current = newSocket; 
    newSocket.emit("getContacts", {});

    newSocket.on("contactsList", (contacts) => {
      console.log("Contacts received:", contacts);
      setListContacts(contacts);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    if (socket && roomName) {
      socket.emit("join_room", { roomname: roomName });
      socket.emit("getmessage", { roomname: roomName });

      socket.on("sendMessageRoom", (msgs: any) => {
        console.log("Received message list:", msgs);
        const formattedMessages = msgs.map((msg: any, index: number) =>
          formatMessage(msg, index > 0 ? msgs[index - 1] : null)
        );
        setMessages(formattedMessages);
      });

      socket.on("receive_message", (newMsg: any) => {
        console.log("Received new message:", newMsg);
        setMessages((prevMessages) => {
          const formattedNewMessage = formatMessage(
            newMsg.newMsg,
            prevMessages[prevMessages.length - 1]
          );
          return [...prevMessages, formattedNewMessage];
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("sendMessageRoom");
        socket.off("receive_message");
      }
    };
  }, [roomName, formatMessage]);

  const handleSelectContact = useCallback(
    (contact: any) => {
      const socket = socketRef.current;

      if (roomName) {
        socket.emit("leave_room", { roomname: roomName });
      }
      setRoomName(contact.roomName);
      setSelectedContact(contact);
      setShowContacts(false);
      setReceiver(contact._id);
    },
    [roomName]
  );

  const handleSendMessage = useCallback(
    (content: string) => {
      const socket = socketRef.current;

      if (!receiver || !socket) return;

      const newMessage = {
        type: "msg",
        content,
        receiver,
      };

      console.log("Sending new message:", newMessage);
      socket.emit("send_message", newMessage);
    },
    [receiver]
  );

  return (
    <div className="h-screen flex bg-gray-100">
      <h1>{receiver}</h1>
      <div
        className={`fixed md:relative w-full md:w-80 h-full bg-white z-10 transition-transform duration-300 ${
          showContacts ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <ContactsList
          contacts={listContacts}
          selectedContact={selectedContact}
          onSelectContact={handleSelectContact}
        />
      </div>

      {selectedContact ? (
        <div className="flex-1 flex flex-col w-full">
          <div className="flex items-center bg-white shadow-sm">
            <button
              onClick={() => setShowContacts(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full mx-2"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <ChatHeader user={selectedContact} />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages?.map((message) => (
                <MessageBubble
                  key={message._id}
                  message={message}
                  showAvatar={message.showAvatar}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            Sélectionnez une conversation pour commencer
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
