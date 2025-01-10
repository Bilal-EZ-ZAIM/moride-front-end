import React from 'react';
import { Mail, Phone, MapPin, Car } from 'lucide-react';
import { Button } from '../common/Button';

interface UserInfoProps {
  onBecomeDriver: () => void;
}

export function UserInfo({ onBecomeDriver }: UserInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Informations Personnelles</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onBecomeDriver}
        >
          <Car className="w-4 h-4" />
          Devenir Chauffeur
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="text-sm text-gray-600">Email</div>
            <div className="font-medium">ahmed.benjelloun@example.com</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="text-sm text-gray-600">Téléphone</div>
            <div className="font-medium">+212 6XX-XXXXXX</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="text-sm text-gray-600">Localisation</div>
            <div className="font-medium">Rabat, Maroc</div>
          </div>
        </div>
      </div>
    </div>
  );
}