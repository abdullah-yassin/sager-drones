// services/socketService.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  socket = io("http://localhost:9013");
};

export const subscribeToMessages = (callback: (data: any) => void) => {
  if (!socket) {
    console.error("Socket is not connected.");
    return;
  }

  socket.on("message", callback);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
