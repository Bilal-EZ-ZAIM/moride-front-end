import { Check, DollarSign, Clock, MapPin, Sparkles } from 'lucide-react';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Value for Your Journey</h2>
          <p className="text-xl text-gray-600">Transparent pricing with no hidden fees</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-400" />
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Standard</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-2">8 MAD/km</div>
              <p className="text-gray-600">Perfect for daily rides</p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Comfortable sedans</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Up to 4 passengers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Cash or card payment</span>
              </li>
            </ul>
            <button className="w-full mt-8 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transition-colors">
              Book Now
            </button>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 transform scale-105 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Sparkles className="h-6 w-6 text-emerald-300" />
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
              <div className="text-4xl font-bold text-white mb-2">12 MAD/km</div>
              <p className="text-emerald-100">Luxury experience</p>
            </div>
            <ul className="space-y-4 text-white">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Luxury vehicles</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Professional drivers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Free WiFi</span>
              </li>
            </ul>
            <button className="w-full mt-8 py-3 px-6 rounded-xl bg-white text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors">
              Book Premium
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-cyan-400" />
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Shared</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-2">5 MAD/km</div>
              <p className="text-gray-600">Save with shared rides</p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Economic option</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Meet new people</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Eco-friendly</span>
              </li>
            </ul>
            <button className="w-full mt-8 py-3 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:from-teal-600 hover:to-cyan-600 transition-colors">
              Find Shared Ride
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}