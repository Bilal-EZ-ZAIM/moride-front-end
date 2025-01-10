import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Shield, MessageCircle, Globe } from 'lucide-react';
import { Button } from '../common/Button';

interface DriverCardProps {
  driver: {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    experience: string;
    vehicle: string;
    vehicleType: string;
    languages: string[];
  };
}

export function DriverCard({ driver }: DriverCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 flex-shrink-0">
          <div className="relative">
            <img
              src={driver.image}
              alt={driver.name}
              className="w-full h-48 md:h-40 rounded-lg object-cover"
            />
            <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1.5 rounded-full">
              <Shield className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{driver.name}</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{driver.rating}</span>
                <span className="text-sm">({driver.reviews} avis)</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Contacter
              </Button>
              <Link to={`/driver/${driver.id}`}>
                <Button size="sm">Voir profil</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Véhicule</div>
              <div className="font-medium">{driver.vehicle}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Expérience</div>
              <div className="font-medium">{driver.experience}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <div className="text-sm text-gray-600">
              Langues: {driver.languages.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}