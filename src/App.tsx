import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { DriversListing } from "./pages/DriversListing";
import { UserProfile } from "./pages/UserProfile";
import { BookTrip } from "./pages/BookTrip";
import { TripOffers } from "./pages/TripOffers";
import { TripDetails } from "./pages/TripDetails";
import { ChangePassword } from "./pages/ChangePassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Payment } from "./pages/Payment";
import Login from "./pages/Login";
import WelcomePage from "./pages/WelcomePage";
import { CreateProfile } from "./pages/CreateProfile";
import { isLogins } from "./store/features/auth/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import Messages from "./pages/Messages";
import CreateDiriverProfile from "./pages/CreateDriverProfile";
import { DriverProfile } from "./pages/DriverProfile";
import { DriverDetails } from "./pages/DriverDetails";
import MyTrips from "./pages/MyTrips";
import ProtectedRoute from "./guard/PrivateRoute";

export function App() {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");

  if (token) {
    useEffect(() => {
      dispatch(isLogins());
    }, []);
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="driver" element={<DriverProfile />} />
            <Route path="/MyTrips" element={<MyTrips />} />
            <Route path="/tripDetails/:id" element={<TripDetails />} />
            <Route path="bookings" element={<TripOffers />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/create/profile" element={<CreateProfile />} />
            <Route path="/create/driver" element={<CreateDiriverProfile />} />
          </Route>
          <Route path="bookTrip" element={<BookTrip />} />
          <Route path="/driver/:id" element={<DriverDetails />} />
          <Route path="drivers" element={<DriversListing />} />
        </Route>
        <Route path="/welcome/page" element={<WelcomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/messages" element={<Messages />} />
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
