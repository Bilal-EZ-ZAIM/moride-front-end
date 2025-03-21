import { useEffect, useState, useCallback, useRef } from "react";
import { Menu } from "lucide-react";
import { ContactsList } from "../components/chat/ContactsList";
import { ChatHeader } from "../components/chat/ChatHeader";
import { ChatInput } from "../components/chat/ChatInput";
import { io } from "socket.io-client";
import { useAppSelector } from "../hooks";
import { MessageBubble } from "../components/chat/MessageBubble";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const formatMessage = useCallback(
    (msg: any, prevMsg?: any) => ({
      _id: msg._id,
      image: msg.imageProfile,
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

  // Function to leave current room
  const leaveCurrentRoom = useCallback(() => {
    const socket = socketRef.current;
    if (socket && roomName) {
      console.log(`Leaving room: ${roomName}`);
      socket.emit("leave_room", { roomname: roomName });
    }
  }, [roomName]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      extraHeaders: {
        token: localStorage.getItem("token") || "",
      },
    });

    socketRef.current = newSocket;
    newSocket.emit("getContacts", currentUserId);

    newSocket.on("contactsList", (contacts) => {
      console.log("Contacts received:", contacts);
      setListContacts(contacts);
    });

    return () => {
      if (roomName) {
        newSocket.emit("leave_room", { roomname: roomName });
      }
      newSocket.disconnect();
    };
  }, [roomName]);

  useEffect(() => {
    const socket = socketRef.current;

    if (socket && roomName) {
      socket.emit("join_room", { roomname: roomName });
      socket.emit("getmessage", { roomname: roomName });

      socket.on("sendMessageRoom", (msgs: any) => {
        console.log("Received message list:", msgs);
        const formattedMessages = msgs.map((msg: any, index: number) => {
          console.log(msg);
          return formatMessage(msg, index > 0 ? msgs[index - 1] : null);
        });
        setMessages(formattedMessages);
      });

      socket.on("receive_message", (newMsg: any) => {
        setMessages((prevMessages) => {
          const formattedNewMessage = formatMessage(
            newMsg.newMsg,
            prevMessages.length > 0
              ? prevMessages[prevMessages.length - 1]
              : null
          );
          return [...prevMessages, formattedNewMessage];
        });
      });
    }

    return () => {
      if (socket) {
        if (roomName) {
          socket.emit("leave_room", { roomname: roomName });
          console.log(`Left room on cleanup: ${roomName}`);
        }
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
        console.log(`Left room: ${roomName}`);
      }

      const newRoomName = contact.roomName;
      console.log(`Joining new room: ${newRoomName}`);

      setRoomName(newRoomName);
      setSelectedContact(contact);
      setShowContacts(false);
      setReceiver(contact._id);
    },
    [roomName]
  );

  // Function to scroll to the bottom of the message container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(
    (content: string) => {
      const socket = socketRef.current;

      if (!receiver || !socket) return;

      const newMessage = {
        type: "msg",
        content,
        receiver,
        sender: currentUserId,
      };

      console.log("Sending new message:", newMessage);
      socket.emit("send_message", newMessage);
    },
    [receiver, currentUserId]
  );

  // Handle user logout - make sure to leave room
  const handleLogout = useCallback(() => {
    leaveCurrentRoom();
    // Additional logout logic here
    // e.g., clearing local storage, redirecting, etc.
  }, [leaveCurrentRoom]);

  console.log(messages);
  return (
    <div className="h-screen flex bg-gray-100">
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
              <div ref={messagesEndRef} />
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
