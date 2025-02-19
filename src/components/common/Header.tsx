import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Car,
  Bell,
  MessageSquare,
  ChevronDown,
  Settings,
  LogOut,
  Lock,
} from "lucide-react";
import { Button } from "./Button";
import { getProfile } from "../../store/features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { profile, counter } = useAppSelector((state) => state.profile);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [counter]);
  const location = useLocation();
  const isAuthPage = ["/login", "/register", "/reset-password"].includes(
    location.pathname
  );

  if (isAuthPage) return null;

  const users = {
    name: "Ahmed Benjelloun",
    email: "ahmed@example.com",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80",
  };

  return (
    <header className="w-full sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm py-2">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">MoRide</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="#services"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Services
            </Link>
            <Link
              to="#safety"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Sécurité
            </Link>
            <Link
              to="drivers"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Chauffeurs
            </Link>

            <div className="flex items-center gap-6">
              <Link to="/messages" className="relative">
                <MessageSquare className="w-6 h-6 text-gray-600 hover:text-emerald-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
              </Link>

              <Link to="/notifications" className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-emerald-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  2
                </span>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
                >
                  {profile ? (
                    <img
                      src={profile && profile?.imageProfile?.url}
                      alt={(profile && user?.name) || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <Link to="create/profile">Create Profile</Link>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {profile && isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4" />
                      Mon profil
                    </Link>
                    <Link
                      to="/change-password"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Lock className="w-4 h-4" />
                      Changer mot de passe
                    </Link>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                      onClick={() => console.log("Logout")}
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <a
              href="#services"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Services
            </a>
            <a
              href="#safety"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Sécurité
            </a>
            <a
              href="#drivers"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Chauffeurs
            </a>
            <Link
              to="/messages"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Messages
            </Link>
            <Link
              to="/notifications"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Notifications
            </Link>
            <Link
              to="/profile"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Mon profil
            </Link>
            <button
              className="text-red-600 hover:text-red-700 block w-full text-left"
              onClick={() => console.log("Logout")}
            >
              Déconnexion
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
