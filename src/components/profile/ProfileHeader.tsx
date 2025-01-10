import React from 'react';
import { Star, Shield, Award, MessageCircle } from 'lucide-react';
import { Button } from '../common/Button';

export function ProfileHeader() {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80"
              alt="Driver profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-2xl font-bold">Mohammed Alami</h1>
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">4.9</span>
              <span className="text-sm">(520 courses)</span>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Chauffeur professionnel depuis 5 ans, spécialisé dans les trajets longue distance et le service premium.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Contacter
            </Button>
            <Button>Réserver</Button>
          </div>
        </div>
      </div>
    </div>
  );
}