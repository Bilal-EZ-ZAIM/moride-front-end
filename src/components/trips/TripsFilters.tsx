import React from 'react';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';

export function TripsFilters() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un trajet..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Date</h3>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <h3 className="font-medium mb-4">Lieu de départ</h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ville de départ"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Destination</h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ville d'arrivée"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Type de trajet</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-emerald-600" />
                <span>Privé</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-emerald-600" />
                <span>Partagé</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-emerald-600" />
                <span>Premium</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}