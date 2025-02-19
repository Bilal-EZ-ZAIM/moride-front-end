import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice";
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
