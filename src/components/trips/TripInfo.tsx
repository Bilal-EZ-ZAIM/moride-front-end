import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, DollarSign } from 'lucide-react';
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
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Détails du Trajet</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-sm text-gray-600">Départ</div>
                <div className="font-medium">Casablanca, Maârif</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-medium">20 Mars 2024</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-sm text-gray-600">Arrivée</div>
                <div className="font-medium">Rabat, Agdal</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-sm text-gray-600">Heure</div>
                <div className="font-medium">14:00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span>2 passagers</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold">400-500 MAD</span>
            </div>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            Proposer mes services
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