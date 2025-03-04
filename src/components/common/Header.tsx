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
  Users,
  PlusCircle,
  Search,
  History,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProfile } from "../../store/features/profile/profileSlice";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock data - replace with actual data from your state management
  const { user, isLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, counter } = useAppSelector((state) => state.profile);
  const { profileDriver } = useAppSelector((state) => state.driver);
  console.log(profile);

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfile());
    }
  }, [isLogin, dispatch, counter]);

  const isAuthPage = ["/login", "/register", "/reset-password"].includes(
    location.pathname
  );

  if (isAuthPage) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isDriver = profileDriver || user?.role === "driver";

  console.log(user);

  // Navigation items with clearer labels and better organization
  const getNavItems = () => {
    if (!isLogin) {
      return [
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
          path: "/drivers",
          label: "Chauffeurs",
          icon: Users,
          description: "Trouver un chauffeur",
        },
        {
          path: "/login",
          label: "Se connecter",
          icon: LogIn,
          description: "Se connecter à votre compte",
        },
        {
          path: "/register",
          label: "S'inscrire",
          icon: UserPlus,
          description: "Créer un compte",
        },
      ];
    }

    if (isDriver) {
      return [
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
          path: "/myTrips",
          label: "Mes trajets",
          icon: History,
          description: "Historique des courses",
        },
        {
          path: "/bookTrip",
          label: "Réserver",
          icon: PlusCircle,
          description: "Réserver un trajet",
        },
      ];
    }

    return [
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
    ];
  };

  const mainNavItems = getNavItems();

  return (
    <header className="w-full sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm py-2">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Responsive on all screens */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <Car className="h-8 w-8 text-emerald-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              MoRide
            </span>
            {isDriver && (
              <span className="hidden sm:inline-block text-xs font-medium text-white bg-emerald-600 px-2 py-1 rounded-full ml-2">
                Espace Chauffeur
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-48 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {item.description}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Desktop Notifications and Profile */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {/* <Link
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
            </Link> */}

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
                    <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </div>
                ) : (
                  isLogin && (
                    <Link
                      to="/create/profile"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Compléter mon profil
                    </Link>
                  )
                )}
                {isLogin && (
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {profile && isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50">
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
                    {isDriver ? "Tableau de bord" : "Mon profile"}
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-3 pb-4 border-t border-gray-100 pt-4 animate-fadeIn overflow-scroll h-screen">
            {/* Mobile Navigation Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      location.pathname === item.path
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-600 hover:bg-gray-50"
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-gray-500">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Notifications Section */}
            {/* <div className="border-t border-gray-100 pt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                to="/messages"
                className="flex items-center p-2 rounded-lg space-x-3 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="w-5 h-5 shrink-0" />
                <span className="font-medium">Messages</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                  3
                </span>
              </Link>
              <Link
                to="/notifications"
                className="flex items-center p-2 rounded-lg space-x-3 text-gray-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bell className="w-5 h-5 shrink-0" />
                <span className="font-medium">Notifications</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-auto">
                  2
                </span>
              </Link>
            </div> */}

            {/* Mobile Profile Section */}
            <div className="border-t border-gray-100 pt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {isDriver ||
                (profile && (
                  <Link
                    to={isDriver ? "/driver" : "/profile"}
                    className="flex items-center p-2 rounded-lg space-x-3 text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {isDriver ||
                      (profile && <Settings className="w-5 h-5 shrink-0" />)}
                    <span className="font-medium">
                      {isDriver ? "Tableau de bord" : null}
                      {profile ? "Mon profile" : null}
                    </span>
                  </Link>
                ))}
              {isLogin && (
                <>
                  {" "}
                  <Link
                    to="/change-password"
                    className="flex items-center p-2 rounded-lg space-x-3 text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Lock className="w-5 h-5 shrink-0" />
                    <span className="font-medium">Changer mot de passe</span>
                  </Link>
                  <button
                    className="flex items-center p-2 rounded-lg space-x-3 text-red-600 hover:bg-red-50 w-full text-left col-span-full"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span className="font-medium">Déconnexion</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile User Info */}

            {profile ? (
              <div className="flex items-center gap-2">
                <img
                  src={profile?.imageProfile?.url}
                  alt={user?.name || "User"}
                  className="w-8 h-8 rounded-full object-cover border-2 border-emerald-600"
                />
                <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </div>
            ) : (
              isLogin && (
                <Link
                  to="/create/profile"
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Compléter mon profil
                </Link>
              )
            )}
            {isLogin && (
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
