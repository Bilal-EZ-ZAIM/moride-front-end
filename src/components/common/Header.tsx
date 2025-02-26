import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  Home,
  Calendar,
  CreditCard,
  Users,
  PlusCircle,
  LayoutDashboard,
  MapPin,
  Search,
  Clock,
  History,
  Wallet,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProfile } from "../../store/features/profile/profileSlice";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { profile, counter } = useAppSelector((state) => state.profile);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProfile());
  }, [counter, dispatch]);

  const isAuthPage = ["/login", "/register", "/reset-password"].includes(
    location.pathname
  );

  if (isAuthPage) return null;

  const handleLogout = () => {
    console.log("Logout");
    navigate("/login");
  };

  const isDriver = user?.role === "driver";

  // Improved navigation items with clearer labels and better organization
  const mainNavItems = isDriver
    ? [
        {
          path: "/",
          label: "Accueil",
          icon: Home,
          description: "Page d'accueil",
        },
        {
          path: "/bookings",
          label: "Trajets disponibles",
          icon: Search,
          description: "Trouver des passagers",
        },
        {
          path: "/driver/trips",
          label: "Mes trajets",
          icon: History,
          description: "Historique des courses",
        },
        {
          path: "/driver/earnings",
          label: "Mes revenus",
          icon: Wallet,
          description: "Gérer vos gains",
        },
      ]
    : [
        {
          path: "/",
          label: "Accueil",
          icon: Home,
          description: "Page d'accueil",
        },
        {
          path: "/bookTrip",
          label: "Réserver",
          icon: PlusCircle,
          description: "Réserver un trajet",
        },
        {
          path: "/myTrips",
          label: "Mes réservations",
          icon: Calendar,
          description: "Gérer vos réservations",
        },
        {
          path: "/drivers",
          label: "Chauffeurs",
          icon: Users,
          description: "Trouver un chauffeur",
        },
        {
          path: "/payments",
          label: "Paiements",
          icon: CreditCard,
          description: "Gérer vos paiements",
        },
      ];

  return (
    <header className="w-full sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm py-2">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">MoRide</span>
            {isDriver && (
              <span className="text-xs font-medium text-white bg-emerald-600 px-2 py-1 rounded-full ml-2">
                Espace Chauffeur
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 group relative ${
                    location.pathname === item.path
                      ? "text-emerald-600 font-medium"
                      : "text-gray-600 hover:text-emerald-600"
                  } transition-colors`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {/* Tooltip */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-48 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {item.description}
                  </div>
                </Link>
              );
            })}

            <div className="flex items-center gap-6">
              <Link
                to="/messages"
                className={`relative group ${
                  location.pathname === "/messages"
                    ? "text-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                <MessageSquare className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  3
                </span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Messages
                </span>
              </Link>

              <Link
                to="/notifications"
                className={`relative group ${
                  location.pathname === "/notifications"
                    ? "text-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  2
                </span>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Notifications
                </span>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                  {profile ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={profile?.imageProfile?.url}
                        alt={user?.name || "User"}
                        className="w-8 h-8 rounded-full object-cover border-2 border-emerald-600"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {user?.name}
                      </span>
                    </div>
                  ) : (
                    <Link
                      to="/create/profile"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Compléter mon profil
                    </Link>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {profile && isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                      {isDriver && (
                        <span className="inline-block mt-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          Chauffeur professionnel
                        </span>
                      )}
                    </div>
                    <Link
                      to={isDriver ? "/driver" : "/profile"}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      {isDriver ? "Tableau de bord" : "Mon profil"}
                    </Link>
                    <Link
                      to="/change-password"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Lock className="w-4 h-4" />
                      Changer mot de passe
                    </Link>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-50 transition-colors w-full text-left"
                      onClick={handleLogout}
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
          <div className="md:hidden mt-4 space-y-4 pb-4 border-t border-gray-100 pt-4">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 ${
                    location.pathname === item.path
                      ? "text-emerald-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {item.description}
                  </span>
                </Link>
              );
            })}
            <div className="border-t border-gray-100 pt-4">
              <Link
                to="/messages"
                className="flex items-center space-x-2 text-gray-600 mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                  3
                </span>
              </Link>
              <Link
                to="/notifications"
                className="flex items-center space-x-2 text-gray-600 mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                  2
                </span>
              </Link>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <Link
                to={isDriver ? "/driver" : "/profile"}
                className="flex items-center space-x-2 text-gray-600 mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span>{isDriver ? "Tableau de bord" : "Mon profil"}</span>
              </Link>
              <Link
                to="/change-password"
                className="flex items-center space-x-2 text-gray-600 mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock className="w-5 h-5" />
                <span>Changer mot de passe</span>
              </Link>
              <button
                className="flex items-center space-x-2 text-red-600 w-full"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
