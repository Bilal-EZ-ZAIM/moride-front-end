import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../common/Button';

export function ContactSection() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Contact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="text-sm text-gray-600">Email</div>
            <div className="font-medium">mohammed.alami@example.com</div>
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
            <div className="font-medium">Casablanca, Maroc</div>
          </div>
        </div>
      </div>

      <Button className="w-full">Contacter</Button>
    </div>
  );
}