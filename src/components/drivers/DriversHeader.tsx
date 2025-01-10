import React from 'react';
import { MapPin, Users } from 'lucide-react';

export function DriversHeader() {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Nos Chauffeurs Professionnels</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>150+ chauffeurs vérifiés</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>Disponible dans tout le Maroc</span>
          </div>
        </div>
      </div>
    </div>
  );
}