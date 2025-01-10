import React from 'react';
import { Car, Bike, Users, Heart } from 'lucide-react';

export function VehicleOptions() {
  const vehicles = [
    {
      icon: Car,
      name: "Confort",
      description: "Berlines spacieuses pour la ville",
      price: "À partir de 10 MAD/km",
      features: ["Climatisation", "4 passagers", "Espace bagages"]
    },
    {
      icon: Car,
      name: "Premium",
      description: "Véhicules luxueux",
      price: "À partir de 15 MAD/km",
      features: ["Intérieur premium", "4 passagers", "Confort supérieur"]
    },
    {
      icon: Users,
      name: "Van",
      description: "Idéal pour les groupes",
      price: "À partir de 20 MAD/km",
      features: ["Jusqu'à 7 passagers", "Grand espace", "Tarif groupe"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choisissez Votre Véhicule</h2>
          <p className="text-xl text-gray-600">Une flotte diversifiée pour tous vos besoins</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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