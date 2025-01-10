import React from 'react';
import { Check, X } from 'lucide-react';

export function PendingDrivers() {
  const drivers = [
    {
      name: "Karim B.",
      vehicle: "Mercedes-Benz Classe E",
      status: "En attente",
      date: "Il y a 1h",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    {
      name: "Ahmed T.",
      vehicle: "BMW Série 5",
      status: "En attente",
      date: "Il y a 2h",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Chauffeurs en Attente</h2>
      
      <div className="space-y-4">
        {drivers.map((driver, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={driver.image}
                alt={driver.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">{driver.name}</h3>
                <p className="text-sm text-gray-600">{driver.vehicle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200">
                <Check className="w-5 h-5" />
              </button>
              <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}