// src/socket.ts
import { io, Socket } from 'socket.io-client';

const URL: string | any = process.env.VITE_SOKCET_URL;

export const socket: Socket = io(URL);
