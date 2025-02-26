import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice";
import DriverSlice from "./features/driver/driverSlice";
import WorkingSlice from "./features/working/workingSlice";
import carSlice from "./features/car/carSlice";
import bookingSlice from "./features/booking/bookingSlice";
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    driver: DriverSlice,
    working: WorkingSlice,
    car: carSlice,
    booking: bookingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
