import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, DollarSign, Car, Shield, Route, Info } from 'lucide-react';
import { Button } from '../common/Button';
import { DriverApplicationModal } from './DriverApplicationModal';

export function TripInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplicationSubmit = (data: {
    price: number;
    time: string;
    message: string;
  }) => {
    console.log('Application submitted:', data);
    // Here you would typically send this data to your backend
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Détails du Trajet</h2>
          <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
            Trajet Disponible
          </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200 z-0"></div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-100 rounded-lg shadow-sm">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Départ</div>
                  <div className="font-semibold text-gray-900 text-lg">Casablanca, Maârif</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      20 Mars 2024
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      14:00
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-100 rounded-lg shadow-sm">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Arrivée</div>
                  <div className="font-semibold text-gray-900 text-lg">Rabat, Agdal</div>
                  <div className="flex items-center gap-2 mt-2">
                    <Route className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Distance estimée: 87 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-blue-600 font-medium">Passagers</div>
              <div className="text-lg font-semibold text-blue-700">2 personnes</div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Car className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-purple-600 font-medium">Type de véhicule</div>
              <div className="text-lg font-semibold text-purple-700">Berline ou SUV</div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-emerald-600 font-medium">Budget client</div>
              <div className="text-lg font-semibold text-emerald-700">400-500 MAD</div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Info className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="text-sm text-amber-600 font-medium mb-1">Information importante</div>
            <div className="text-sm text-amber-700">
              En tant que chauffeur, vous devez avoir une voiture confortable et propre, 
              être ponctuel et professionnel. Votre véhicule doit être climatisé et en parfait état.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-600">
              Course sécurisée et vérifiée
            </span>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 text-base flex items-center gap-2 hover:bg-emerald-700 transition-colors duration-300"
          >
            Proposer mes services
            <Car className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <DriverApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleApplicationSubmit}
      />
    </>
  );
}