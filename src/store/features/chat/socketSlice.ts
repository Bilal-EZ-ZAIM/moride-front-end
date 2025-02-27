import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
    id: string;
    text: string;
}

interface SocketState {
    connected: boolean;
    messages: Message[];
}

const initialState: SocketState = {
    connected: false,
    messages: [],
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        connect: (state) => {
            state.connected = true;
        },
        disconnect: (state) => {
            state.connected = false;
        },
        messageReceived: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
    },
});

export const { connect, disconnect, messageReceived } = socketSlice.actions;
export default socketSlice.reducer;
