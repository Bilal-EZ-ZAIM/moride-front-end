import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { DriverProfile } from "./pages/DriverProfile";
import { DriversListing } from "./pages/DriversListing";
import { UserProfile } from "./pages/UserProfile";
import { DriverDashboard } from "./pages/DriverDashboard";
import { BookTrip } from "./pages/BookTrip";
import { TripOffers } from "./pages/TripOffers";
import { TripDetails } from "./pages/TripDetails";
import { Messages } from "./pages/Messages";
import { SuperAdminDashboard } from "./pages/SuperAdminDashboard";
import { AdminUsers } from "./pages/AdminUsers";
import { ChangePassword } from "./pages/ChangePassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Payment } from "./pages/Payment";
import Login from "./pages/Login";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="drivers" element={<DriversListing />} />
          <Route path="tripDetails" element={<TripDetails />} />
          <Route path="tripOffers" element={<TripOffers />} />
          <Route path="bookTrip" element={<BookTrip />} />
          <Route path="driver/:id" element={<DriverProfile />} />
          <Route path="driver/dashboard" element={<DriverDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<SuperAdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
