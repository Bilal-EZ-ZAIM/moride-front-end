import React from 'react';
import { MapPin, Home, Building, Navigation } from 'lucide-react';

export function UserLocation() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Adresses Enregistrées</h2>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Home className="w-5 h-5 text-emerald-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Domicile</h3>
            <p className="text-gray-600">123 Rue Hassan II, Quartier Maârif</p>
            <p className="text-gray-600">Casablanca, Maroc</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Building className="w-5 h-5 text-emerald-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Bureau</h3>
            <p className="text-gray-600">Twin Center, Tour Ouest</p>
            <p className="text-gray-600">Casablanca, Maroc</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Navigation className="w-5 h-5 text-emerald-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">Destinations Fréquentes</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Aéroport Mohammed V</li>
              <li>• Morocco Mall</li>
              <li>• Ain Diab Corniche</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}