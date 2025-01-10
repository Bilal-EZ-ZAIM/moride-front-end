import { Car, Users, Clock, MapPin } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Choose the perfect ride for your journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Car className="h-12 w-12 text-emerald-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Private Rides</h3>
            <p className="text-gray-600">
              Travel in comfort with your personal driver. Perfect for business or leisure.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Users className="h-12 w-12 text-emerald-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Shared Rides</h3>
            <p className="text-gray-600">
              Share your journey and split the cost with others heading the same way.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <Clock className="h-12 w-12 text-emerald-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">Schedule Rides</h3>
            <p className="text-gray-600">
              Plan ahead by scheduling your ride for later. We'll be there on time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <MapPin className="h-12 w-12 text-emerald-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">City Tours</h3>
            <p className="text-gray-600">
              Explore Morocco's beautiful cities with our experienced local drivers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}