import { Menu, X, Car, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getProfile } from "../store/features/profile/profileSlice";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">MoRide</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-gray-600 hover:text-emerald-600"
            >
              Services
            </a>
            <a href="#safety" className="text-gray-600 hover:text-emerald-600">
              Safety
            </a>
            <a href="#drivers" className="text-gray-600 hover:text-emerald-600">
              Drivers
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-emerald-600"
            >
              Testimonials
            </a>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition">
              Download App
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
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
              Safety
            </a>
            <a
              href="#drivers"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Drivers
            </a>
            <a
              href="#testimonials"
              className="block text-gray-600 hover:text-emerald-600"
            >
              Testimonials
            </a>
            <button className="w-full bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition">
              Download App
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
