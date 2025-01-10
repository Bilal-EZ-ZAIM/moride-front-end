import { Car, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">MoRide</span>
            </div>
            <p className="text-gray-400">
              Your trusted ride-sharing service in Morocco. Safe, reliable, and affordable transportation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-emerald-400">Services</a></li>
              <li><a href="#safety" className="text-gray-400 hover:text-emerald-400">Safety</a></li>
              <li><a href="#drivers" className="text-gray-400 hover:text-emerald-400">Become a Driver</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-emerald-400">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">+212 500-555-0123</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">contact@moride.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} MoRide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}