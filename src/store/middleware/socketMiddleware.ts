import { Middleware } from "@reduxjs/toolkit";
import { connect, disconnect, messageReceived } from "../features/chat/socketSlice";

const socketMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action:any) => {
    switch (action.type) {
      case "socket/startConnection":
        if (socket) {
          socket.close();
        }
        socket = new WebSocket(action.payload as string);

        socket.onopen = () => {
          console.log("WebSocket Connected!");
          store.dispatch(connect());
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          store.dispatch(messageReceived(data));
        };

        socket.onerror = (error) => {
          console.error("WebSocket Error: ", error);
        };

        socket.onclose = () => {
          console.log("WebSocket Disconnected");
          store.dispatch(disconnect());
        };
        break;

      case "socket/sendMessage":
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(action.payload));
        }
        break;

      case "socket/closeConnection":
        if (socket) {
          socket.close();
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
