import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "../common/Button";
import { useAppSelector } from "../../hooks";
import { io } from "socket.io-client";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
  driverId: any;
}

export function ContactModal({
  isOpen,
  onClose,
  driverName,
  driverId,
}: ContactModalProps) {
  const [message, setMessage] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      const newSocket = io("http://localhost:3000", {
        extraHeaders: {
          token: localStorage.getItem("token") || "",
        },
      });

      socketRef.current = newSocket;

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !socketRef.current) return;

    const messageData = {
      type: "msg",
      content: message,
      receiver: driverId,
      sender: user._id,
    };

    socketRef.current.emit("send_message", messageData);

    

    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-0">
      <div className="bg-white rounded-xl w-full max-w-md relative mx-auto">
        <div className="p-4 sm:p-6">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 pr-8">
            Envoyer un message à {driverName}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Votre message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 text-base sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Écrivez votre message ici..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto hover:bg-gray-50"
              >
                Annuler
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Envoyer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
