import { Car, Bike, Users, Heart } from 'lucide-react';

const vehicles = [
  {
    icon: Car,
    name: "Comfort Car",
    description: "Spacious sedans perfect for city travel",
    price: "Starting at 10 MAD/km",
    features: ["Air conditioning", "4 passengers", "Luggage space"]
  },
  {
    icon: Car,
    name: "Premium Car",
    description: "Luxury vehicles for premium experience",
    price: "Starting at 15 MAD/km",
    features: ["Premium interior", "4 passengers", "Extra comfort"]
  },
  {
    icon: Bike,
    name: "Scooter",
    description: "Quick & affordable for short trips",
    price: "Starting at 5 MAD/km",
    features: ["Fast in traffic", "1 passenger", "Eco-friendly"]
  },
  {
    icon: Users,
    name: "Van",
    description: "Perfect for group travel",
    price: "Starting at 20 MAD/km",
    features: ["Up to 7 passengers", "Large luggage space", "Group pricing"]
  }
];

export default function VehicleOptions() {
  return (
    <section id="vehicles" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Ride</h2>
          <p className="text-xl text-gray-600">Select from our diverse fleet of vehicles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 bg-emerald-50">
                <vehicle.icon className="h-12 w-12 text-emerald-600 mx-auto" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-gray-600 mb-4">{vehicle.description}</p>
                <p className="text-emerald-600 font-semibold mb-4">{vehicle.price}</p>
                <ul className="space-y-2">
                  {vehicle.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}