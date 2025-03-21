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

  const { user, isLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, counter } = useAppSelector((state) => state.profile);
  const { profileDriver } = useAppSelector((state) => state.driver);

  useEffect(() => {
    if (isLogin) {
      dispatch(getProfile());
    }
  }, [isLogin, dispatch, counter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false);
      }
      if (
        !target.closest(".profile-menu") &&
        !target.closest(".profile-button")
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isAuthPage = ["/login", "/register", "/reset-password"].includes(
    location.pathname
  );

  if (isAuthPage) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isDriver = profileDriver || user?.role === "driver";

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
          path: "/drivers",
          label: "Chauffeurs",
          icon: Users,
          description: "Trouver un chauffeur",
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
    <header className="w-full sticky top-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <Car className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">MoRide</span>
            {isDriver && (
              <span className="hidden sm:inline-block text-xs font-medium text-white bg-emerald-600 px-2 py-1 rounded-full ml-2">
                Espace Chauffeur
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "text-emerald-600 bg-emerald-50 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {/* Chat Icon - Only visible on desktop */}
            {/* {isLogin && (
              <Link
                to="/messages"
                className="relative hidden lg:flex p-2 hover:bg-gray-50 rounded-lg transition-colors"
                title="Messages"
              >
                <MessageSquare className="w-6 h-6 text-gray-600 hover:text-emerald-600" />
              </Link>
            )} */}

            {isLogin && profile && (
              <div className="relative profile-menu">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="profile-button flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <img
                    src={profile?.imageProfile?.url}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-emerald-600"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      to={isDriver ? "/driver" : "/profile"}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      {isDriver ? "Tableau de bord" : "Mon profile"}
                    </Link>
                    <Link
                      to="/change-password"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Lock className="w-4 h-4" />
                      Changer mot de passe
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            )}

            {isLogin && !profile && (
              <Link
                to="/create/profile"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Compléter mon profil
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="menu-button lg:hidden p-2 hover:bg-gray-50 rounded-lg"
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mobile-menu fixed inset-x-0 top-16 bg-white border-t border-gray-100 shadow-lg overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Messages Link for Mobile */}
              {isLogin && (
                <Link
                  to="/messages"
                  className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageSquare className="w-5 h-5 shrink-0 mr-3" />
                  <div>
                    <div className="font-medium">Messages</div>
                    <div className="text-sm text-gray-500">
                      Voir vos conversations
                    </div>
                  </div>
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                </Link>
              )}

              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg ${
                      location.pathname === item.path
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 shrink-0 mr-3" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}

              {isLogin && (
                <div className="border-t border-gray-100 pt-4">
                  <Link
                    to={isDriver ? "/driver" : "/profile"}
                    className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5 shrink-0 mr-3" />
                    <div>
                      <div className="font-medium">
                        {isDriver ? "Tableau de bord" : "Mon profile"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {isDriver
                          ? "Gérer votre compte chauffeur"
                          : "Gérer votre profil"}
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/change-password"
                    className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Lock className="w-5 h-5 shrink-0 mr-3" />
                    <div>
                      <div className="font-medium">Changer mot de passe</div>
                      <div className="text-sm text-gray-500">
                        Modifier votre mot de passe
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-5 h-5 shrink-0 mr-3" />
                    <div>
                      <div className="font-medium">Déconnexion</div>
                      <div className="text-sm text-gray-500">
                        Se déconnecter de votre compte
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {profile && (
                <div className="border-t border-gray-100 pt-4 px-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={profile?.imageProfile?.url}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
