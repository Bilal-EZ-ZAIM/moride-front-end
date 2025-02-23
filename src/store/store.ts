import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice";
import DriverSlice from "./features/driver/driverSlice";
import WorkingSlice from "./features/working/workingSlice";
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    driver: DriverSlice,
    working: WorkingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
