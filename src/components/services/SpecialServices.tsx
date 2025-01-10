import React from 'react';
import { Heart, Users, Clock, ShieldCheck } from 'lucide-react';

export function SpecialServices() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Services Spéciaux</h2>
          <p className="text-xl text-gray-600">Des options adaptées à tous les besoins</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <Heart className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Femmes</h3>
                <p className="text-gray-600 mb-6">
                  Service exclusif avec chauffeuses pour les passagères.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span>Chauffeuses certifiées</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>Disponible 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    <span>Femmes et enfants uniquement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <Users className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Voyages de Groupe</h3>
                <p className="text-gray-600 mb-6">
                  Transport partagé sécurisé avec passagers vérifiés.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span>Passagers vérifiés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>Horaires flexibles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    <span>Tarifs avantageux</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}