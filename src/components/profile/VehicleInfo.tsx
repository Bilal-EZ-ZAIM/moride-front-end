import React from 'react';
import { Car, Calendar, Settings, Users } from 'lucide-react';

export function VehicleInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Véhicule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80"
            alt="Vehicle"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="font-semibold">Mercedes-Benz Classe E</div>
              <div className="text-sm text-gray-600">Premium Sedan</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="font-semibold">2022</div>
              <div className="text-sm text-gray-600">Année du véhicule</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="font-semibold">Automatique</div>
              <div className="text-sm text-gray-600">Transmission</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="font-semibold">4 passagers</div>
              <div className="text-sm text-gray-600">Capacité maximale</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}