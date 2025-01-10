import React from 'react';
import { Check, Shield, Clock, MapPin } from 'lucide-react';
import { Button } from '../common/Button';

export function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tarifs Transparents</h2>
          <p className="text-xl text-gray-600">Des prix clairs, sans surprises</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Standard</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-2">8 MAD/km</div>
              <p className="text-gray-600">Pour vos trajets quotidiens</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Berlines confortables</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Jusqu'à 4 passagers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Paiement flexible</span>
              </li>
            </ul>
            <Button variant="primary" className="w-full">
              Réserver
            </Button>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 transform scale-105">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
              <div className="text-4xl font-bold text-white mb-2">12 MAD/km</div>
              <p className="text-emerald-100">Expérience luxueuse</p>
            </div>
            <ul className="space-y-4 mb-8 text-white">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Véhicules haut de gamme</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>Chauffeurs professionnels</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>WiFi gratuit</span>
              </li>
            </ul>
            <Button variant="secondary" className="w-full">
              Réserver Premium
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Partagé</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-2">5 MAD/km</div>
              <p className="text-gray-600">Économique et écologique</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Option économique</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Rencontrez des gens</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Écologique</span>
              </li>
            </ul>
            <Button variant="primary" className="w-full">
              Trouver un Trajet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}